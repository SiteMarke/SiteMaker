/* sitemaker — слой данных.
   Цены, работы, тексты, заявки и вход в админку хранятся на сервере sites-api (Cloudflare Worker + D1).
   Если сервер недоступен, сайт берёт данные из последней сохранённой копии или из data/site.json.
*/
window.Store = (function () {
  'use strict';

  var API = 'https://sites-api.tamerlankajrolla2.workers.dev', SITE = 'sitemaker';
  var LS_DATA = 'sitemaker_data', LS_TOK = 'sitemaker_token';

  function ls(k, v) {
    try {
      if (v === undefined) { var r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }
      if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, JSON.stringify(v));
      return v;
    } catch (e) { return null; }
  }
  var token = ls(LS_TOK) || null;
  function authed() { return !!(token && token.token && token.exp > Date.now()); }
  var onExpire = null;

  function req(path, opt) {
    opt = opt || {};
    var h = {};
    if (opt.type !== false) h['Content-Type'] = opt.type || 'application/json';
    if (opt.auth && authed()) h.Authorization = 'Bearer ' + token.token;
    var body = opt.body;
    if (body !== undefined && typeof body !== 'string' && !(body instanceof Blob)) body = JSON.stringify(body);
    return fetch(API + path + (path.indexOf('?') < 0 ? '?' : '&') + 'site=' + SITE, {
      method: opt.method || 'GET', headers: h, cache: 'no-store', body: body
    }).then(function (r) {
      return r.text().then(function (t) {
        var d = null; try { d = t ? JSON.parse(t) : null; } catch (e) { d = t; }
        if (!r.ok) {
          var msg = (d && d.error) || ('HTTP ' + r.status);
          if (r.status === 401 && opt.auth) { logout(); msg = 'вход истёк — войдите снова'; if (onExpire) onExpire(); }
          if (r.status === 401 && !opt.auth) msg = 'Неверный пароль';
          if (r.status === 413) msg = 'слишком большой файл';
          var e2 = new Error(msg); e2.status = r.status; throw e2;
        }
        return d;
      });
    });
  }

  function img(id) { return id ? (/^(https?:|data:|blob:|img\/)/.test(String(id)) ? String(id) : API + '/img?site=' + SITE + '&id=' + id) : ''; }

  function fromFile() {
    var p = location.pathname.replace(/[^/]*$/, '');
    return fetch(p + 'data/site.json?v=' + Date.now()).then(function (r) {
      if (!r.ok) throw new Error('site.json не найден');
      return r.json();
    });
  }

  function arr(x) { return Array.isArray(x) ? x : []; }
  function str(x, d) { return x == null || x === '' ? (d || '') : String(x); }
  var PRESS_DEF = {"on": true, "title": "отзывы и реклама", "items": [{"id": "p-chef-talk", "type": "video", "src": "img/press/chef-talk.mp4", "poster": "img/press/chef-talk.webp", "tag": "видео-отзыв", "name": "Қайыржан · @petro.povar", "who": "Выездной шеф-повар · 40 тыс. подписчиков", "text": "«Делает очень красиво, креативно, всё доступно и понятно. Мне очень понравилось — всем советую. Такие сайты делает, которые даже некоторые компании не делают»", "url": "https://tamerlankajrolla2-a11y.github.io/RETRO-POVAR/", "hide": false}, {"id": "p-chef-story", "type": "video", "src": "img/press/chef-story.mp4", "poster": "img/press/chef-story.webp", "tag": "сторис", "name": "@petro.povar", "who": "Показал в сторис сайт ресторана Emirat", "text": "«@sitemarkertam разработал сайт для @restoran.emirat и многих других бизнесов. Если вы владелец бизнеса — однозначно рекомендую создать свой сайт»", "url": "https://emirat-restaunrant.github.io/Emirat/", "hide": false}, {"id": "p-zhanara", "type": "img", "src": "img/press/zhanara.webp", "poster": "", "tag": "сторис", "name": "Жанара", "who": "Магазин корейской косметики", "text": "«Чтобы онлайн-продаж было больше, я заказала сайт 😍 Всё чётко, оперативно, и цена очень приятная!»", "url": "https://tamerlankajrolla2-a11y.github.io/Pro-yxod/", "hide": false}, {"id": "p-ag", "type": "img", "src": "img/press/agproject.webp", "poster": "", "tag": "сторис", "name": "AG проект · @ag_project.kz", "who": "Проектирование и узаконение, Петропавловск", "text": "«Обращайтесь @sitemarkertam — быстро, красиво, по доступным ценам 🤝»", "url": "https://tamerlankajrolla2-a11y.github.io/AG-project/", "hide": false}, {"id": "p-kaspi", "type": "img", "src": "img/press/kaspi.webp", "poster": "", "tag": "реклама", "name": "Каспи находки", "who": "WhatsApp-канал · 100 тыс. подписчиков", "text": "Рассказали о sitemaker в статусе канала.", "url": "", "hide": false}]};
  function normalize(d) {
    d = d || {};
    var s = d.settings = d.settings || {};
    s.wa = str(s.wa, '77476128411').replace(/\D/g, '');
    s.tg = str(s.tg, 'Gg124255').replace(/^@/, '');
    s.phone = str(s.phone, '+7 747 612 84 11');
    s.offer = s.offer || {}; s.offer.on = s.offer.on !== false; s.offer.text = str(s.offer.text); s.offer.short = str(s.offer.short);
    s.heroSub = str(s.heroSub);
    var c = d.calc = d.calc || {};
    c.admin = +c.admin || 0; c.pagePrice = +c.pagePrice || 0; c.pagesFree = +c.pagesFree || 10;
    c.terms = arr(c.terms).map(function (t) { return { k: +t.k || 1, name: str(t.name), tag: str(t.tag) }; });
    if (!c.terms.length) c.terms = [{ k: 1, name: 'стандарт', tag: 'по сроку тарифа' }];
    c.adminWhy = c.adminWhy || {}; c.adminWhy.q = str(c.adminWhy.q, 'Зачем нужна админка?'); c.adminWhy.why = arr(c.adminWhy.why); c.adminWhy.fit = arr(c.adminWhy.fit);
    d.types = arr(d.types).map(function (t, i) {
      t.id = str(t.id, 't' + Date.now().toString(36) + i); t.name = str(t.name, 'тариф'); t.price = +t.price || 0;
      t.days = str(t.days); t.desc = str(t.desc); t.q = str(t.q, 'Зачем это бизнесу?'); t.why = arr(t.why); t.fit = arr(t.fit);
      return t;
    });
    d.promo = arr(d.promo).map(function (p) { return { code: str(p.code).toUpperCase().replace(/[^A-Z0-9А-ЯЁ]/g, ''), pct: Math.max(0, Math.min(100, +p.pct || 0)) }; }).filter(function (p) { return p.code; });
    d.cats = arr(d.cats).map(function (c2, i) {
      c2.id = str(c2.id, 'c' + i); c2.title = str(c2.title); c2.desc = str(c2.desc);
      c2.works = arr(c2.works).map(function (w, j) { w.id = str(w.id, 'w' + Date.now().toString(36) + j); w.name = str(w.name); w.tags = arr(w.tags); w.url = str(w.url); return w; });
      return c2;
    });
    d.steps = arr(d.steps); d.faq = arr(d.faq);
    d.review = d.review || {}; d.review.on = d.review.on !== false;
    if (!d.press || !Array.isArray(d.press.items)) d.press = JSON.parse(JSON.stringify(PRESS_DEF));
    d.press.on = d.press.on !== false; d.press.title = str(d.press.title, 'отзывы и реклама');
    d.press.items = arr(d.press.items).map(function (x, i) {
      return { id: str(x.id, 'p' + Date.now().toString(36) + i), type: x.type === 'video' ? 'video' : 'img', src: str(x.src), poster: str(x.poster),
        tag: str(x.tag), name: str(x.name), who: str(x.who), text: str(x.text), url: str(x.url), hide: !!x.hide };
    });
    d.cats.forEach(function (c3) { c3.works.forEach(function (w) { if (w.url === 'https://tamerlankajrolla2-a11y.github.io/Sezim/') w.url = 'https://sezim-restaurant.github.io/Sezim/'; }); });
    // цены 14.11: кафе 10 000, премиум 30 000 «всё включено», бизнес-сайт без админки
    if ((+d.pv || 0) < 1) {
      d.types.forEach(function (x) {
        if (x.id === 'cafe' && x.price === 5000) x.price = 10000;
        if (x.id === 'prem') { if (x.price === 35000) x.price = 30000; if (x.desc === 'Индивидуальный дизайн, интеграции и CRM, чат-бот, приоритетная поддержка.') x.desc = 'Всё включено: индивидуальный дизайн, админ-панель, заказы и брони в Telegram-бот, интеграция с Frontpad, промокоды, SEO для Google.'; if (x.why.indexOf('Всё уже в цене: админ-панель, заказы и брони в Telegram-бот, интеграция с Frontpad для учёта заказов, промокоды и настройка для Google — без доплат.') < 0) x.why.unshift('Всё уже в цене: админ-панель, заказы и брони в Telegram-бот, интеграция с Frontpad для учёта заказов, промокоды и настройка для Google — без доплат.'); }
        if (x.id === 'biz' && x.desc === 'До 10 страниц, продающие тексты, форма заявки, базовое SEO, галерея.') x.desc = 'Попроще: до 10 страниц, продающие тексты, форма заявки, галерея, базовое SEO. Без админ-панели — правки вношу я.';
      });
      d.settings.heroSub = d.settings.heroSub.replace('От 5 000 ₸', 'От 6 000 ₸');
      d.pv = 1;
    }
    // 14.11: новая работа — Pinocchio (один раз для данных, уже сохранённых на сервере)
    if ((+d.pv || 0) < 2) {
      var fc = d.cats.filter(function (c4) { return c4.id === 'food'; })[0];
      if (fc && !d.cats.some(function (c5) { return c5.works.some(function (w) { return w.id === 'pinocchio'; }); })) {
        var at = 0; fc.works.forEach(function (w, i) { if (w.id === 'sezim') at = i + 1; });
        fc.works.splice(at, 0, {"id":"pinocchio","name":"Pinocchio","city":"Астана · lounge & resto bar","desc":"Меню и бизнес-ланч с сетами, статус «открыто сейчас», бронь стола в WhatsApp с выбором блюд, карта.","tags":["Бронь","Меню","Бизнес-ланч"],"url":"https://tamerlankajrolla2-a11y.github.io/Pinocchio-Restobar/","m":"img/w/pinocchio-m.webp","d":"img/w/pinocchio-d.webp","fan":false});
      }
      d.pv = 2;
    }
    // 14.11: новая работа — Самал, выездной шеф-повар
    if ((+d.pv || 0) < 3) {
      var fc2 = d.cats.filter(function (c6) { return c6.id === 'food'; })[0];
      if (fc2 && !d.cats.some(function (c7) { return c7.works.some(function (w) { return w.id === 'samal'; }); })) fc2.works.push({"id":"samal","name":"Самал","city":"Астана · выездной шеф-повар","desc":"Банкеты и фуршеты под ключ: услуги, меню, работы, отзывы и заявка на мероприятие прямо в WhatsApp.","tags":["Заявка","Услуги","WhatsApp"],"url":"https://tamerlankajrolla2-a11y.github.io/samal-chef-astana/","m":"img/w/samal-m.webp","d":"img/w/samal-d.webp","fan":false});
      d.pv = 3;
    }
    d.rev = +d.rev || 1;
    return d;
  }

  var cache = null;
  function load(force) {
    if (cache && !force) return Promise.resolve(cache);
    return req('/menu').then(function (r) {
      var d = r && r.data;
      if (d && d.settings) { ls(LS_DATA, d); return normalize(d); }
      return fromFile().then(normalize);
    }).catch(function () {
      var local = ls(LS_DATA);
      return local && local.settings ? normalize(local) : fromFile().then(normalize);
    }).then(function (d) { cache = d; return d; });
  }
  function save(d) {
    d = normalize(d); d.rev = (+d.rev || 1) + 1;
    return req('/menu', { method: 'PUT', auth: true, body: JSON.stringify(d) }).then(function () { cache = d; ls(LS_DATA, d); return d; });
  }
  function reset() { return fromFile().then(normalize).then(function (d) { return save(d); }); }

  function createOrder(o) { return req('/order', { method: 'POST', body: o }).then(function (r) { return r || true; }).catch(function () { return false; }); }
  function listOrders(limit) { return req('/orders?limit=' + (limit || 500), { auth: true }); }
  function setStatus(id, status) { return req('/order?id=' + encodeURIComponent(id), { method: 'PATCH', auth: true, body: { status: status } }); }
  function tgInfo() { return req('/tg', { auth: true }); }
  function tgLink() { return req('/tg/link', { method: 'POST', auth: true, body: {} }); }
  function tgOff() { return req('/tg', { method: 'DELETE', auth: true }); }

  function upload(blob) { return req('/img', { method: 'POST', auth: true, type: blob.type || 'image/jpeg', body: blob }).then(function (r) { return r.id; }); }
  function removeImg(id) { return req('/img?id=' + encodeURIComponent(id), { method: 'DELETE', auth: true }); }

  function login(pass) {
    return req('/login', { method: 'POST', body: { password: pass } }).then(function (d) {
      token = { token: d.token, exp: d.exp }; ls(LS_TOK, token); return token;
    });
  }
  function logout() { token = null; ls(LS_TOK, null); }
  function expires() { return token ? token.exp : 0; }
  function changePassword(pw) { return req('/password', { method: 'POST', auth: true, body: { password: pw } }); }

  return {
    load: load, save: save, reset: reset, fromFile: fromFile, normalize: normalize, img: img,
    createOrder: createOrder, listOrders: listOrders, setStatus: setStatus, tgInfo: tgInfo, tgLink: tgLink, tgOff: tgOff,
    upload: upload, removeImg: removeImg,
    login: login, logout: logout, authed: authed, expires: expires, changePassword: changePassword,
    onExpire: function (f) { onExpire = f; }, api: API, site: SITE
  };
})();
