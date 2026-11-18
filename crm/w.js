/* SiteMaker CRM — сервер.
   Cloudflare Worker + база D1 (привязка с именем DB).
   Отдельный сервер только для CRM: общий sites-api и его база не трогаются.

   Адреса:
     POST /login            {password}                → {token, exp}
     POST /password         {old, new}         (вход) → {token, exp}
     GET  /all                                 (вход) → {leads, payments, templates, today}
     POST /lead             {...}              (вход) → лид
     PATCH /lead?id=        {...}              (вход) → лид
     DELETE /lead?id=                          (вход)
     GET  /events?lead=                        (вход) → история лида
     POST /note             {lead_id, text}    (вход)
     POST /payment          {lead_id, amount, kind, date, months, note} (вход) → {payment, lead}
     DELETE /payment?id=                       (вход) → {lead}
     PUT  /templates        {items}            (вход)
     POST /import           {leads}            (вход) → {added, skipped}
     POST /site-lead        {name, phone, ...}  (без входа, с сайта sitemakerkz.com)
*/
const ADMIN_INIT = '__PASS_HASH__'; // sha256("crm:" + пароль). Пароль меняется в CRM → «Настройки».

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
  'Access-Control-Max-Age': '86400'
};
const enc = new TextEncoder();
const J = (d, s = 200) => new Response(JSON.stringify(d), { status: s, headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });
const E = (m, s = 400) => J({ error: m }, s);
const hex = b => [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('');
const sha = async t => hex(await crypto.subtle.digest('SHA-256', enc.encode(t)));
async function hmac(key, msg) {
  const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(msg)));
}
function same(a, b) { if (a.length !== b.length) return false; let r = 0; for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i); return r === 0; }
class HttpErr extends Error { constructor(m, s = 400) { super(m); this.http = s; } }

/* ---------- время Казахстана (UTC+5) ---------- */
const kzNow = () => new Date(Date.now() + 5 * 3600e3).toISOString().slice(0, 19).replace('T', ' ');
const kzToday = () => kzNow().slice(0, 10);
const isDate = s => typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s + 'T00:00:00Z')) && new Date(s + 'T00:00:00Z').toISOString().slice(0, 10) === s;
function addMonths(d, n) {
  const [y, m, dd] = d.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  t.setUTCDate(Math.min(dd, last));
  return t.toISOString().slice(0, 10);
}
const ruDate = d => d ? d.slice(8, 10) + '.' + d.slice(5, 7) + '.' + d.slice(0, 4) : '';
const money = n => String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';

/* ---------- очистка полей ---------- */
const clip = (v, n) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim().slice(0, n);
const normIg = v => clip(v, 200).replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').split(/[/?#\s]/)[0].replace(/[^A-Za-z0-9._]/g, '').slice(0, 30);
function normPhone(v) {
  let d = String(v == null ? '' : v).replace(/\D/g, '');
  if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
  if (d.length === 10) d = '7' + d;
  return d.slice(0, 15);
}
function normUrl(v) {
  let s = clip(v, 300); if (!s) return '';
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  try { const u = new URL(s); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch (e) { return ''; }
}
function toInt(v, max = 100000000) {
  const n = Math.round(Number(String(v == null ? '' : v).replace(/\s/g, '').replace(',', '.')));
  return Number.isFinite(n) && n > 0 ? Math.min(n, max) : 0;
}

const STATUSES = ['found', 'sent', 'replied', 'demo', 'thinking', 'work', 'client', 'lost'];
const ST_RU = { found: 'Нашёл', sent: 'Написал', replied: 'Ответил', demo: 'Делаю пример', thinking: 'Пример отправлен', work: 'В работе', client: 'Клиент', lost: 'Отказ' };
const SOURCES = ['instagram', 'whatsapp', 'site', '2gis', 'referral', 'other'];
const PKINDS = ['prepay', 'final', 'hosting', 'other'];
const PK_RU = { prepay: 'Предоплата', final: 'Доплата', hosting: 'Хостинг', other: 'Другое' };
const EARLY = ['found', 'sent', 'replied', 'demo', 'thinking'];
const LEAD_COLS = ['name', 'person', 'niche', 'city', 'instagram', 'phone', 'source', 'status', 'price', 'site_url', 'hosting_fee', 'hosting_until', 'next_date', 'next_note', 'notes'];

const DEFAULT_TEMPLATES = [
  { id: 't1', title: 'Первое сообщение', text: 'Здравствуйте, {имя}! Посмотрел ваш Instagram, у вас классно.\n\nЗаметил, что сайта у вас нет. Многие сейчас сначала ищут в Google, и если там пусто, уходят к тем, у кого видно цены и фото.\n\nЯ делаю сайты для бизнеса: клиент сразу видит цены и фото и оставляет заявку, она приходит вам в WhatsApp. Меньше переписки, и выглядит солидно.\n\nМогу бесплатно сделать пример на ваших фото и ценах. Посмотрите, и если понравится, договоримся. Интересно?' },
  { id: 't2', title: 'Ответили «да»', text: 'Отлично! Скиньте, пожалуйста, пару фото, прайс и что важно показать клиентам. Сделаю пример и пришлю ссылку. Это бесплатно и ни к чему не обязывает.' },
  { id: 't3', title: 'Цена и условия', text: 'Сайт под ключ с админ-панелью: 20 000 ₸ один раз. В админке сами меняете цены, фото и услуги.\nХостинг, чтобы сайт работал: 1 000 ₸ в месяц.\nПредоплата 50%, остальное после готовности, когда всё понравится.' },
  { id: 't4', title: 'Напомнить о себе', text: 'Здравствуйте, {имя}! Напомню о себе: могу бесплатно сделать пример сайта для {бизнес}. Если неактуально, просто напишите, больше не побеспокою 🙂' },
  { id: 't5', title: 'Сайт готов', text: 'Сайт готов! Вот ссылка: {сайт}\n\nПосмотрите, если нужно что-то поправить, напишите. Если всё нравится, остаток оплаты {остаток}.' },
  { id: 't6', title: 'Оплата хостинга', text: 'Здравствуйте, {имя}! Напоминаю: подошла оплата хостинга сайта, 1 000 ₸ за месяц. Спасибо!' }
];

function parseLead(b, partial) {
  const o = {};
  for (const k of LEAD_COLS) {
    if (!(k in b)) continue;
    const v = b[k];
    switch (k) {
      case 'name': o.name = clip(v, 120); break;
      case 'person': o.person = clip(v, 80); break;
      case 'niche': o.niche = clip(v, 60); break;
      case 'city': o.city = clip(v, 60); break;
      case 'instagram': o.instagram = normIg(v); break;
      case 'phone': o.phone = normPhone(v); break;
      case 'source': if (!SOURCES.includes(v)) throw new HttpErr('неизвестный источник'); o.source = v; break;
      case 'status': if (!STATUSES.includes(v)) throw new HttpErr('неизвестный статус'); o.status = v; break;
      case 'price': o.price = toInt(v); break;
      case 'hosting_fee': o.hosting_fee = toInt(v, 1000000); break;
      case 'site_url': o.site_url = normUrl(v); break;
      case 'hosting_until': case 'next_date':
        if (v == null || v === '') o[k] = null; else if (isDate(v)) o[k] = v; else throw new HttpErr('неверная дата'); break;
      case 'next_note': o.next_note = clip(v, 200); break;
      case 'notes': o.notes = clip(v, 4000); break;
    }
  }
  if ((!partial || 'name' in o) && !o.name) throw new HttpErr('Напишите название бизнеса');
  return o;
}

/* ---------- база ---------- */
let ready = false;
async function init(env) {
  if (ready) return;
  await env.DB.batch([
    env.DB.prepare('CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)'),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, status_at TEXT NOT NULL,
      name TEXT NOT NULL, person TEXT NOT NULL DEFAULT '', niche TEXT NOT NULL DEFAULT '', city TEXT NOT NULL DEFAULT '',
      instagram TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL DEFAULT '', source TEXT NOT NULL DEFAULT 'instagram',
      status TEXT NOT NULL DEFAULT 'found', price INTEGER NOT NULL DEFAULT 0, site_url TEXT NOT NULL DEFAULT '',
      hosting_fee INTEGER NOT NULL DEFAULT 1000, hosting_until TEXT, next_date TEXT, next_note TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '')`),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, lead_id INTEGER NOT NULL, at TEXT NOT NULL, kind TEXT NOT NULL, text TEXT NOT NULL)'),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS events_lead_idx ON events (lead_id, id)'),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT, lead_id INTEGER NOT NULL, date TEXT NOT NULL, amount INTEGER NOT NULL,
      kind TEXT NOT NULL, months INTEGER NOT NULL DEFAULT 0, note TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL)`),
    env.DB.prepare('CREATE INDEX IF NOT EXISTS payments_lead_idx ON payments (lead_id)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL)'),
    env.DB.prepare('CREATE TABLE IF NOT EXISTS rl (k TEXT NOT NULL, t INTEGER NOT NULL)')
  ]);
  ready = true;
}
async function metaGet(env, k) { const r = await env.DB.prepare('SELECT value FROM meta WHERE key=?').bind(k).first(); return r ? r.value : null; }
async function metaSet(env, k, v) { await env.DB.prepare('INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(k, v).run(); }
async function secret(env) {
  let s = await metaGet(env, 'secret');
  if (s) return s;
  await env.DB.prepare("INSERT OR IGNORE INTO meta(key,value) VALUES('secret',?)").bind(crypto.randomUUID() + crypto.randomUUID()).run();
  return metaGet(env, 'secret');
}
async function passHash(env) { return (await metaGet(env, 'pass_hash')) || ADMIN_INIT; }
const TOKEN_DAYS = 30;
async function makeToken(env) {
  const exp = Date.now() + TOKEN_DAYS * 864e5;
  return { token: exp + '.' + await hmac((await secret(env)) + (await passHash(env)), String(exp)), exp };
}
async function authed(env, req) {
  const h = req.headers.get('Authorization') || '';
  const m = h.match(/^Bearer (\d+)\.([a-f0-9]{64})$/);
  if (!m || Number(m[1]) < Date.now()) return false;
  return same(m[2], await hmac((await secret(env)) + (await passHash(env)), m[1]));
}

/* ограничение частоты: не больше max попыток за win секунд */
async function limited(env, key, max, win) {
  const now = Math.floor(Date.now() / 1000);
  const r = await env.DB.prepare('SELECT COUNT(*) AS n FROM rl WHERE k=? AND t>?').bind(key, now - win).first();
  return (r ? r.n : 0) >= max;
}
async function hit(env, key) {
  const now = Math.floor(Date.now() / 1000);
  await env.DB.prepare('INSERT INTO rl(k,t) VALUES(?,?)').bind(key, now).run();
  if (Math.random() < 0.05) await env.DB.prepare('DELETE FROM rl WHERE t<?').bind(now - 86400).run();
}

const getLead = (env, id) => env.DB.prepare('SELECT * FROM leads WHERE id=?').bind(id).first();
async function addEvent(env, leadId, kind, text) {
  await env.DB.prepare('INSERT INTO events(lead_id,at,kind,text) VALUES(?,?,?,?)').bind(leadId, kzNow(), kind, clip(text, 2000)).run();
}

async function createLead(env, b, evKind, evText) {
  const o = parseLead(b, false);
  const now = kzNow();
  const r = {
    name: o.name, person: o.person || '', niche: o.niche || '', city: o.city || '', instagram: o.instagram || '', phone: o.phone || '',
    source: o.source || 'instagram', status: o.status || 'found', price: o.price || 0, site_url: o.site_url || '',
    hosting_fee: 'hosting_fee' in o ? o.hosting_fee : 1000, hosting_until: o.hosting_until || null,
    next_date: o.next_date || null, next_note: o.next_note || '', notes: o.notes || ''
  };
  const res = await env.DB.prepare(`INSERT INTO leads (created_at,updated_at,status_at,name,person,niche,city,instagram,phone,source,status,price,site_url,hosting_fee,hosting_until,next_date,next_note,notes)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(now, now, now, r.name, r.person, r.niche, r.city, r.instagram, r.phone, r.source, r.status, r.price, r.site_url, r.hosting_fee, r.hosting_until, r.next_date, r.next_note, r.notes).run();
  const id = res.meta.last_row_id;
  await addEvent(env, id, evKind || 'created', evText || ('Добавлен · ' + ST_RU[r.status]));
  return id;
}

async function updateLead(env, id, b) {
  const cur = await getLead(env, id);
  if (!cur) throw new HttpErr('Не найдено', 404);
  const o = parseLead(b, true);
  const keys = Object.keys(o).filter(k => o[k] !== cur[k]);
  if (!keys.length) return cur;
  const now = kzNow();
  const sets = keys.map(k => k + '=?'), vals = keys.map(k => o[k]);
  sets.push('updated_at=?'); vals.push(now);
  if (keys.includes('status')) { sets.push('status_at=?'); vals.push(now); }
  await env.DB.prepare(`UPDATE leads SET ${sets.join(',')} WHERE id=?`).bind(...vals, id).run();
  if (keys.includes('status')) await addEvent(env, id, 'status', ST_RU[cur.status] + ' → ' + ST_RU[o.status]);
  if (keys.includes('price') && o.price) await addEvent(env, id, 'note', 'Цена: ' + money(o.price));
  return getLead(env, id);
}

async function addPayment(env, b) {
  const lead = await getLead(env, Number(b.lead_id));
  if (!lead) throw new HttpErr('Клиент не найден', 404);
  const amount = toInt(b.amount);
  if (!amount) throw new HttpErr('Введите сумму');
  const kind = PKINDS.includes(b.kind) ? b.kind : 'other';
  const date = isDate(b.date) ? b.date : kzToday();
  const months = kind === 'hosting' ? Math.min(Math.max(toInt(b.months) || 1, 1), 36) : 0;
  const note = clip(b.note, 200);
  const now = kzNow();
  const res = await env.DB.prepare('INSERT INTO payments(lead_id,date,amount,kind,months,note,created_at) VALUES(?,?,?,?,?,?,?)')
    .bind(lead.id, date, amount, kind, months, note, now).run();
  const sets = ['updated_at=?'], vals = [now];
  let txt = '+' + money(amount) + ' · ' + PK_RU[kind];
  if (kind === 'hosting') {
    const until = addMonths(lead.hosting_until || date, months);
    sets.push('hosting_until=?'); vals.push(until);
    txt += ' · ' + months + ' мес., оплачено до ' + ruDate(until);
  }
  let newStatus = null;
  if (kind === 'prepay' && EARLY.includes(lead.status)) newStatus = 'work';
  if (kind === 'final' && (EARLY.includes(lead.status) || lead.status === 'work')) newStatus = 'client';
  if (newStatus) { sets.push('status=?', 'status_at=?'); vals.push(newStatus, now); }
  await env.DB.prepare(`UPDATE leads SET ${sets.join(',')} WHERE id=?`).bind(...vals, lead.id).run();
  await addEvent(env, lead.id, 'payment', txt + (note ? ' · ' + note : ''));
  if (newStatus) await addEvent(env, lead.id, 'status', ST_RU[lead.status] + ' → ' + ST_RU[newStatus]);
  const payment = await env.DB.prepare('SELECT * FROM payments WHERE id=?').bind(res.meta.last_row_id).first();
  return { payment, lead: await getLead(env, lead.id) };
}

async function delPayment(env, id) {
  const p = await env.DB.prepare('SELECT * FROM payments WHERE id=?').bind(id).first();
  if (!p) throw new HttpErr('Платёж не найден', 404);
  const lead = await getLead(env, p.lead_id);
  await env.DB.prepare('DELETE FROM payments WHERE id=?').bind(id).run();
  if (lead) {
    const sets = ['updated_at=?'], vals = [kzNow()];
    if (p.kind === 'hosting' && lead.hosting_until && p.months) { sets.push('hosting_until=?'); vals.push(addMonths(lead.hosting_until, -p.months)); }
    await env.DB.prepare(`UPDATE leads SET ${sets.join(',')} WHERE id=?`).bind(...vals, lead.id).run();
    await addEvent(env, lead.id, 'payment', 'Удалён платёж ' + money(p.amount) + ' · ' + PK_RU[p.kind] + ' от ' + ruDate(p.date));
  }
  return { lead: lead ? await getLead(env, lead.id) : null };
}

async function getTemplates(env) {
  const r = await env.DB.prepare("SELECT value FROM settings WHERE key='templates'").first();
  if (!r) return DEFAULT_TEMPLATES;
  try { return JSON.parse(r.value); } catch (e) { return DEFAULT_TEMPLATES; }
}
async function putTemplates(env, items) {
  if (!Array.isArray(items) || items.length > 40) throw new HttpErr('неверные шаблоны');
  const clean = items.map((t, i) => ({ id: clip(t && t.id, 20) || ('t' + Date.now() + i), title: clip(t && t.title, 80) || 'Шаблон', text: clip(t && t.text, 4000) }))
    .filter(t => t.text);
  await env.DB.prepare('INSERT INTO settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at')
    .bind('templates', JSON.stringify(clean), kzNow()).run();
  return clean;
}

async function importLeads(env, list) {
  if (!Array.isArray(list) || list.length > 500) throw new HttpErr('неверный список');
  const existing = (await env.DB.prepare('SELECT name, instagram FROM leads').all()).results;
  const igs = new Set(existing.map(x => x.instagram.toLowerCase()).filter(Boolean));
  const names = new Set(existing.map(x => x.name.toLowerCase()));
  let added = 0, skipped = [];
  for (const it of list) {
    if (!it || typeof it !== 'object') continue;
    const ig = normIg(it.instagram || '').toLowerCase(), nm = clip(it.name, 120).toLowerCase();
    if ((ig && igs.has(ig)) || (nm && names.has(nm))) { skipped.push(it.name); continue; }
    const id = await createLead(env, it, 'created', 'Внесён в CRM · ' + ST_RU[STATUSES.includes(it.status) ? it.status : 'found']);
    if (it.note) await addEvent(env, id, 'note', clip(it.note, 2000));
    for (const p of Array.isArray(it.payments) ? it.payments : []) await addPayment(env, { ...p, lead_id: id });
    if (ig) igs.add(ig); if (nm) names.add(nm);
    added++;
  }
  return { added, skipped };
}

/* заявка с сайта sitemakerkz.com → новый лид */
async function siteLead(env, req, b) {
  if (clip(b.website, 100)) return J({ ok: true });            // ловушка для ботов
  const ip = req.headers.get('CF-Connecting-IP') || 'x';
  if (await limited(env, 'site:' + ip, 6, 3600)) return E('Слишком много заявок, попробуйте позже', 429);
  const person = clip(b.name, 80), phone = normPhone(b.phone);
  if (!person && phone.length < 11) return E('Нужно имя или телефон');
  await hit(env, 'site:' + ip);
  const plan = b.plan && typeof b.plan === 'object' ? b.plan : {};
  const id = await createLead(env, {
    name: person ? 'Заявка с сайта: ' + person : 'Заявка с сайта', person, phone, source: 'site', status: 'replied',
    niche: clip(plan.name, 60), price: toInt(b.total), next_date: kzToday(), next_note: 'Новая заявка с сайта, свяжись',
    notes: clip(b.comment, 4000)
  }, 'site', 'Заявка с сайта sitemakerkz.com');
  return J({ ok: true, id });
}

export default {
  async fetch(req, env) {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
    const url = new URL(req.url), path = url.pathname.replace(/\/+$/, '') || '/', M = req.method;
    try {
      if (path === '/' && M === 'GET') return J({ ok: true, app: 'sitemaker-crm' });
      await init(env);
      let body = {};
      if (M === 'POST' || M === 'PUT' || M === 'PATCH') {
        const t = await req.text();
        if (t.length > 300000) return E('Слишком большой запрос', 413);
        try { body = t ? JSON.parse(t) : {}; } catch (e) { return E('неверный JSON'); }
        if (!body || typeof body !== 'object') body = {};
      }

      if (path === '/site-lead' && M === 'POST') return siteLead(env, req, body);

      if (path === '/login' && M === 'POST') {
        const ip = req.headers.get('CF-Connecting-IP') || 'x';
        if (await limited(env, 'login:' + ip, 8, 900)) return E('Много попыток. Подождите 15 минут', 429);
        const ok = same(await sha('crm:' + String(body.password || '')), await passHash(env));
        if (!ok) { await hit(env, 'login:' + ip); return E('Неверный пароль', 401); }
        return J(await makeToken(env));
      }

      if (!(await authed(env, req))) return E('Нужно войти', 401);

      if (path === '/password' && M === 'POST') {
        if (!same(await sha('crm:' + String(body.old || '')), await passHash(env))) return E('Старый пароль неверный', 403);
        const n = String(body.new || '');
        if (n.length < 6 || n.length > 100) return E('Новый пароль: от 6 символов');
        await metaSet(env, 'pass_hash', await sha('crm:' + n));
        return J(await makeToken(env));
      }
      if (path === '/all' && M === 'GET') {
        const leads = (await env.DB.prepare('SELECT * FROM leads ORDER BY updated_at DESC, id DESC').all()).results;
        const payments = (await env.DB.prepare('SELECT * FROM payments ORDER BY date DESC, id DESC').all()).results;
        return J({ leads, payments, templates: await getTemplates(env), today: kzToday() });
      }
      const id = Number(url.searchParams.get('id')) || 0;
      if (path === '/lead') {
        if (M === 'POST') return J(await getLead(env, await createLead(env, body)));
        if (!id) return E('нет id');
        if (M === 'PATCH') return J(await updateLead(env, id, body));
        if (M === 'DELETE') {
          await env.DB.batch([
            env.DB.prepare('DELETE FROM payments WHERE lead_id=?').bind(id),
            env.DB.prepare('DELETE FROM events WHERE lead_id=?').bind(id),
            env.DB.prepare('DELETE FROM leads WHERE id=?').bind(id)
          ]);
          return J({ ok: true });
        }
      }
      if (path === '/events' && M === 'GET') {
        const lid = Number(url.searchParams.get('lead')) || 0;
        return J((await env.DB.prepare('SELECT * FROM events WHERE lead_id=? ORDER BY id DESC LIMIT 300').bind(lid).all()).results);
      }
      if (path === '/note' && M === 'POST') {
        const lead = await getLead(env, Number(body.lead_id));
        if (!lead) return E('Не найдено', 404);
        const text = clip(body.text, 2000);
        if (!text) return E('Пустая заметка');
        await addEvent(env, lead.id, 'note', text);
        await env.DB.prepare('UPDATE leads SET updated_at=? WHERE id=?').bind(kzNow(), lead.id).run();
        return J({ ok: true });
      }
      if (path === '/payment' && M === 'POST') return J(await addPayment(env, body));
      if (path === '/payment' && M === 'DELETE') return J(await delPayment(env, id));
      if (path === '/templates' && M === 'PUT') return J(await putTemplates(env, body.items));
      if (path === '/import' && M === 'POST') return J(await importLeads(env, body.leads));
      return E('Не найдено', 404);
    } catch (e) {
      if (e instanceof HttpErr) return E(e.message, e.http);
      return E('Ошибка сервера: ' + (e && e.message || e), 500);
    }
  }
};
