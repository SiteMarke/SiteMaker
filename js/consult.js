/* sitemaker — консультант (виджет в углу экрана).
   Сейчас работает на готовых сценариях: подбор типа сайта, цены из калькулятора, сроки, админка, домен, оплата.
   Это не нейросеть и он так и представляется клиенту.

   ▶ Подключение настоящего AI (по желанию, нужен платный API):
     1. На Cloudflare Worker сделайте маршрут POST /consult, который принимает {messages:[{role,text}], lang, page}
        и возвращает {reply:"текст"}. Ключ API храните в секретах Worker (wrangler secret put ...), НЕ в этом файле.
     2. Впишите адрес маршрута в CFG.api ниже. Если сервер не ответит — консультант вернётся к сценариям. */
(function () {
  'use strict';
  if (window.__smConsult) return; window.__smConsult = 1;
  var CFG = { api: '', wa: '77476128411', tg: 'Gg124255', dataApi: 'https://sites-api.tamerlankajrolla2.workers.dev/menu?site=sitemaker' };
  var KK = /^kk/.test(document.documentElement.lang || '');
  function L(ru, kk) { return KK ? kk : ru; }
  var HOME = KK ? '/kz/' : '/';
  var onMain = function () { return !!(window.SM && document.getElementById('calc')); };
  function money(n) { return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function track(n, p) { try { if (window.smTrack) window.smTrack(n, p || {}); } catch (e) {} }

  /* ---------- данные: цены берём те же, что в калькуляторе ---------- */
  var DATA = null;
  function getData() {
    if (window.SM && window.SM.data) return Promise.resolve(window.SM.data());
    if (DATA) return Promise.resolve(DATA);
    return fetch(CFG.dataApi, { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) { if (!j || !j.data || !j.data.types) throw 0; return (DATA = j.data); })
      .catch(function () { return fetch('/data/site.json').then(function (r) { return r.json(); }).then(function (d) { return (DATA = d); }); })
      .catch(function () { return (DATA = { types: [] }); });
  }
  function tr(s) { return window.SM && window.SM.tr ? window.SM.tr(s) : (KK && window.SM_KK && window.SM_KK.dict && window.SM_KK.dict[String(s).trim()]) || s; }
  function type(d, id) { return (d.types || []).filter(function (t) { return t.id === id && !t.hide; })[0]; }
  function priceOf(d, id) { var t = type(d, id); return t ? (t.from ? L('от ', '') : L('от ', '')) + money(t.price) + (KK ? '-ден' : '') : ''; }
  function calcLink(id, extra) { return HOME + '?type=' + encodeURIComponent(id) + (extra || '') + '#calc'; }

  /* ---------- интерфейс ---------- */
  var css = '.smc-b{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:60;width:58px;height:58px;border-radius:50%;background:#f2ebdf;color:#0b0b0e;border:0;cursor:pointer;box-shadow:0 16px 36px -10px rgba(0,0,0,.75),0 0 0 6px rgba(242,235,223,.08);display:grid;place-items:center;transition:transform .2s,bottom .3s}' +
    '.smc-b:hover{transform:scale(1.06)}.smc-b svg{width:26px;height:26px}.smc-b i{position:absolute;top:4px;right:4px;width:12px;height:12px;border-radius:50%;background:#25d366;border:2px solid #f2ebdf}' +
    'body.cbar-on .smc-b{bottom:calc(76px + env(safe-area-inset-bottom))}' +
    '.smc{position:fixed;right:16px;bottom:calc(86px + env(safe-area-inset-bottom));z-index:61;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));height:min(560px,calc(100dvh - 120px));display:flex;flex-direction:column;background:#0f0f14;color:#f2ebdf;border:1px solid rgba(255,255,255,.14);border-radius:24px;box-shadow:0 30px 70px -20px rgba(0,0,0,.9);font:400 14.5px/1.5 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;overflow:hidden;transform-origin:100% 100%;animation:smcIn .25s cubic-bezier(.2,.8,.2,1)}' +
    '@keyframes smcIn{from{opacity:0;transform:translateY(12px) scale(.97)}}@media(prefers-reduced-motion:reduce){.smc{animation:none}}' +
    '@media(max-width:520px){.smc{right:8px;left:8px;width:auto;bottom:calc(8px + env(safe-area-inset-bottom));height:calc(100dvh - 80px)}}' +
    '.smc-h{display:flex;align-items:center;gap:10px;padding:14px 14px 12px 16px;border-bottom:1px solid rgba(255,255,255,.08)}.smc-h b{display:block;font:700 14px Unbounded,system-ui,sans-serif;letter-spacing:-.01em}.smc-h small{display:block;color:#8d8b93;font-size:12px}' +
    '.smc-h .av{flex:none;width:34px;height:34px;border-radius:10px;background:#16161d;display:grid;place-items:center}.smc-h .av img{width:22px;height:22px;border-radius:6px}' +
    '.smc-x{margin-left:auto;width:34px;height:34px;border-radius:50%;border:1px solid rgba(255,255,255,.14);background:none;color:#f2ebdf;font-size:18px;cursor:pointer}' +
    '.smc-m{flex:1;overflow-y:auto;padding:14px 14px 6px;display:flex;flex-direction:column;gap:8px;overscroll-behavior:contain}' +
    '.smc-m .b{max-width:88%;padding:10px 13px;border-radius:16px 16px 16px 6px;background:#16161d;border:1px solid rgba(255,255,255,.06);white-space:pre-line}' +
    '.smc-m .b.u{align-self:flex-end;background:#f2ebdf;color:#0b0b0e;border-radius:16px 16px 6px 16px;border:0}.smc-m .b a{color:#f2ebdf;text-decoration:underline;text-underline-offset:2px}' +
    '.smc-m .b .row{display:flex;justify-content:space-between;gap:10px;padding:3px 0;border-bottom:1px dashed rgba(255,255,255,.08)}.smc-m .b .row:last-child{border:0}.smc-m .b .row span:last-child{font-weight:700;white-space:nowrap}' +
    '.smc-q{display:flex;flex-wrap:wrap;gap:6px;padding:4px 14px 10px}.smc-q button,.smc-q a{border:1px solid rgba(255,255,255,.16);background:none;color:#e9e3d9;border-radius:99px;padding:7px 12px;font:600 12.5px Manrope,system-ui,sans-serif;cursor:pointer;text-decoration:none;line-height:1.2}' +
    '.smc-q button:hover,.smc-q a:hover{border-color:#f2ebdf;color:#fff}.smc-q .p{background:#f2ebdf;color:#0b0b0e;border-color:#f2ebdf}.smc-q .w{background:#25d366;border-color:#25d366;color:#04230f}' +
    '.smc-f{display:flex;gap:8px;padding:10px 12px calc(12px + env(safe-area-inset-bottom));border-top:1px solid rgba(255,255,255,.08)}.smc-f input{flex:1;min-width:0;height:44px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.03);color:#f2ebdf;padding:0 14px;font:inherit;font-size:16px}' +
    '.smc-f input:focus{outline:0;border-color:#f2ebdf}.smc-f button{flex:none;width:44px;height:44px;border-radius:14px;border:0;background:#f2ebdf;color:#0b0b0e;cursor:pointer;display:grid;place-items:center}.smc-f button svg{width:18px;height:18px}' +
    '.smc-t{display:inline-flex;gap:4px}.smc-t i{width:6px;height:6px;border-radius:50%;background:#8d8b93;animation:smcT 1s infinite}.smc-t i:nth-child(2){animation-delay:.15s}.smc-t i:nth-child(3){animation-delay:.3s}@keyframes smcT{50%{opacity:.3}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var btn = document.createElement('button');
  btn.className = 'smc-b'; btn.type = 'button'; btn.setAttribute('aria-label', L('Консультант sitemaker: подобрать сайт и цену', 'sitemaker кеңесшісі: сайт пен бағаны таңдау'));
  btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg><i></i>';
  var box = null, msgs, quick, input, history = [], ctx = {};

  function open() {
    if (box) { box.hidden = false; input.focus({ preventScroll: true }); return; }
    box = document.createElement('div'); box.className = 'smc'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', L('Консультант sitemaker', 'sitemaker кеңесшісі'));
    box.innerHTML = '<div class="smc-h"><span class="av"><img src="/favicon.svg" alt="" width="22" height="22"></span><div><b>' + L('Помощник sitemaker', 'sitemaker көмекшісі') + '</b><small>' + L('автоответы · живой ответ — в WhatsApp', 'автожауаптар · тірі жауап — WhatsApp-та') + '</small></div><button class="smc-x" type="button" aria-label="' + L('Закрыть', 'Жабу') + '">×</button></div>' +
      '<div class="smc-m" aria-live="polite"></div><div class="smc-q"></div>' +
      '<form class="smc-f"><input maxlength="300" autocomplete="off" placeholder="' + L('Напишите вопрос…', 'Сұрағыңызды жазыңыз…') + '" aria-label="' + L('Ваш вопрос', 'Сіздің сұрағыңыз') + '"><button type="submit" aria-label="' + L('Отправить', 'Жіберу') + '"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></form>';
    document.body.appendChild(box);
    msgs = box.querySelector('.smc-m'); quick = box.querySelector('.smc-q'); input = box.querySelector('input');
    box.querySelector('.smc-x').onclick = close;
    box.querySelector('form').onsubmit = function (e) { e.preventDefault(); var v = input.value.trim(); if (!v) return; input.value = ''; user(v); answerText(v); };
    quick.addEventListener('click', function (e) { var b = e.target.closest('button[data-a]'); if (!b) return; user(b.textContent); go(b.dataset.a, b.dataset.v); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && box && !box.hidden) close(); });
    go('start');
    track('consult_open', { page: location.pathname });
  }
  function close() { if (box) box.hidden = true; btn.focus(); }
  btn.onclick = function () { box && !box.hidden ? close() : open(); };
  function mount() { document.body.appendChild(btn); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

  function scroll() { msgs.scrollTop = msgs.scrollHeight; }
  function user(t) { history.push({ role: 'user', text: t }); var d = document.createElement('div'); d.className = 'b u'; d.textContent = t; msgs.appendChild(d); scroll(); }
  function bot(html, chips) {
    var d = document.createElement('div'); d.className = 'b'; d.innerHTML = '<span class="smc-t"><i></i><i></i><i></i></span>'; msgs.appendChild(d); scroll(); quick.innerHTML = '';
    setTimeout(function () { d.innerHTML = html; history.push({ role: 'bot', text: d.textContent }); setChips(chips); scroll(); }, 380);
  }
  function setChips(list) {
    quick.innerHTML = (list || []).map(function (c) {
      if (c.href) return '<a href="' + esc(c.href) + '"' + (c.ext ? ' target="_blank" rel="noopener"' : '') + (c.cls ? ' class="' + c.cls + '"' : '') + (c.onclick ? ' data-pick="' + esc(c.onclick) + '"' : '') + '>' + esc(c.t) + '</a>';
      return '<button type="button" data-a="' + esc(c.a) + '"' + (c.v ? ' data-v="' + esc(c.v) + '"' : '') + (c.cls ? ' class="' + c.cls + '"' : '') + '>' + esc(c.t) + '</button>';
    }).join('');
    quick.querySelectorAll('a[data-pick]').forEach(function (a) {
      a.addEventListener('click', function (e) { if (!onMain()) return; e.preventDefault(); var p = a.dataset.pick.split('|'); window.SM.pick(p[0], p[1] === 'admin' ? { admin: true } : null); close(); });
    });
    quick.querySelectorAll('a.w').forEach(function (a) { a.addEventListener('click', function () { track('consult_lead', { via: 'whatsapp' }); }); });
  }
  function waLink(extra) {
    var t = L('Здравствуйте! Пишу с сайта sitemaker.', 'Сәлеметсіз бе! sitemaker сайтынан жазып отырмын.') + (extra ? '\n' + extra : '');
    return 'https://wa.me/' + CFG.wa + '?text=' + encodeURIComponent(t);
  }
  var MENU = function () { return [
    { a: 'pick', t: L('Подобрать тип сайта', 'Сайт түрін таңдау') }, { a: 'price', t: L('Сколько стоит?', 'Қанша тұрады?') }, { a: 'time', t: L('Сроки', 'Мерзімдер') },
    { a: 'admin', t: L('Что такое админка?', 'Әкімшілік панель деген не?') }, { a: 'domain', t: L('Домен и хостинг', 'Домен және хостинг') }, { a: 'pay', t: L('Как оплатить?', 'Қалай төлеймін?') }, { a: 'lead', t: L('Оставить заявку', 'Өтінім қалдыру'), cls: 'p' }
  ]; };

  /* ---------- сценарии ---------- */
  var BIZ = [
    ['food', L('Кафе, ресторан', 'Кафе, мейрамхана')], ['shop', L('Доставка или магазин', 'Жеткізу не дүкен')], ['beauty', L('Салон, студия, мастер', 'Салон, студия, шебер')],
    ['hotel', L('Отель, хостел', 'Қонақүй, хостел')], ['clinic', L('Клиника, медцентр', 'Клиника, медорталық')], ['serv', L('Услуги, стройка, B2B', 'Қызметтер, құрылыс, B2B')], ['other', L('Другое', 'Басқа')]
  ];
  var GOAL = [
    ['leads', L('Получать заявки и звонки', 'Өтінімдер мен қоңыраулар алу')], ['sell', L('Продавать товары с корзиной', 'Себетпен тауар сату')], ['show', L('Показать меню, услуги, цены', 'Мәзір, қызмет, бағаны көрсету')], ['book', L('Бронь столов или номеров', 'Үстел не бөлме брондау')]
  ];
  function recommend(d) {
    var b = ctx.biz, g = ctx.goal, id = 'land', why = '', admin = false;
    if (g === 'sell') { id = type(d, 'shop') ? 'shop' : 'cat'; why = L('Корзина, оплата Kaspi или картой и админ-панель для товаров — уже в тарифе.', 'Себет, Kaspi не картамен төлеу және тауарларға арналған әкімшілік панель тарифке кіреді.'); }
    else if (b === 'food' && (g === 'show' || g === 'book')) { id = 'cafe'; admin = true; why = L('Онлайн-меню и QR-меню, бронь столиков, карта 2GIS и заказ в WhatsApp. С админкой будете сами менять меню и цены.', 'Онлайн-мәзір мен QR-мәзір, үстел брондау, 2GIS картасы және WhatsApp арқылы тапсырыс. Әкімшілік панельмен мәзір мен бағаны өзіңіз өзгертесіз.'); }
    else if (b === 'shop') { id = g === 'show' ? 'cat' : 'shop'; why = id === 'cat' ? L('Каталог с фильтрами и поиском, заказ через WhatsApp — без сложной корзины.', 'Сүзгісі мен іздеуі бар каталог, WhatsApp арқылы тапсырыс — күрделі себетсіз.') : L('Корзина, акции и заказы с админ-панелью.', 'Себет, акциялар және әкімшілік панельмен тапсырыстар.'); }
    else if (b === 'hotel' || g === 'book') { id = 'biz'; admin = true; why = L('Номера и цены, расчёт брони и заявки в мессенджеры. Если нужен календарь броней и личный кабинет — смотрите «премиум».', 'Бөлмелер мен бағалар, брондау есебі және мессенджерге өтінімдер. Брондау күнтізбесі мен жеке кабинет керек болса — «премиумды» қараңыз.'); }
    else if (b === 'clinic' || b === 'serv') { id = 'biz'; why = L('Несколько страниц под услуги и врачей/специалистов, продающие тексты, форма заявки и базовое SEO.', 'Қызметтер мен мамандарға бірнеше бет, сататын мәтіндер, өтінім формасы және базалық SEO.'); }
    else { id = 'land'; why = L('Одна страница: кто вы, услуги и цены, отзывы, кнопки WhatsApp и Telegram. Быстро и недорого — хороший старт.', 'Бір бет: сіз кімсіз, қызметтер мен бағалар, пікірлер, WhatsApp пен Telegram батырмалары. Жылдам әрі арзан — жақсы бастама.'); }
    var t = type(d, id) || (d.types || [])[0]; if (!t) return go('lead');
    bot(L('Советую: <b>', 'Ұсынысым: <b>') + esc(tr(t.name)) + '</b> — ' + esc(priceOf(d, t.id)) + (t.days ? L(', срок ', ', мерзімі ') + esc(tr(t.days)) : '') + '.\n' + esc(why) +
      (admin && !t.adminIn ? L('\n\nСоветую добавить админ-панель (+', '\n\nӘкімшілік панель қосуды ұсынамын (+') + money((d.calc && d.calc.admin) || 5000) + ').' : ''),
      [{ href: calcLink(t.id, admin ? '&admin=1' : ''), onclick: t.id + (admin ? '|admin' : ''), t: L('Рассчитать в калькуляторе', 'Калькуляторда есептеу'), cls: 'p' },
       { href: waLink(L('Подходит ли мне «', 'Маған «') + tr(t.name) + L('»? Мой бизнес: ', '» сай ма? Бизнесім: ') + (BIZ.filter(function (x) { return x[0] === ctx.biz; })[0] || ['', ''])[1]), ext: 1, t: L('Обсудить в WhatsApp', 'WhatsApp-та талқылау'), cls: 'w' },
       { href: (KK ? '/kz' : '') + '/portfolio/', t: L('Примеры работ', 'Жұмыс үлгілері') }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
  }
  function go(a, v) {
    getData().then(function (d) {
      if (a === 'start') return bot(L('Здравствуйте! Я помощник sitemaker — отвечаю автоматически, но по делу 🙂\nПодберу тип сайта, подскажу цену и сроки. Что вас интересует?', 'Сәлеметсіз бе! Мен sitemaker көмекшісімін — автоматты түрде, бірақ нақты жауап беремін 🙂\nСайт түрін таңдап, бағасы мен мерзімін айтамын. Сізді не қызықтырады?'), MENU());
      if (a === 'menu') return bot(L('Что ещё подсказать?', 'Тағы не айтайын?'), MENU());
      if (a === 'pick') { ctx = {}; return bot(L('Чем занимается ваш бизнес?', 'Бизнесіңіз немен айналысады?'), BIZ.map(function (x) { return { a: 'biz', v: x[0], t: x[1] }; })); }
      if (a === 'biz') { ctx.biz = v; return bot(L('Что сайт должен делать в первую очередь?', 'Сайт ең алдымен не істеуі керек?'), GOAL.map(function (x) { return { a: 'goal', v: x[0], t: x[1] }; })); }
      if (a === 'goal') { ctx.goal = v; return recommend(d); }
      if (a === 'price') {
        var rows = (d.types || []).filter(function (t) { return !t.hide; }).map(function (t) { return '<div class="row"><span>' + esc(tr(t.name)) + '</span><span>' + esc(priceOf(d, t.id)) + '</span></div>'; }).join('');
        return bot(L('Цены «от» — разовая оплата, без абонплаты:', 'Бағалар «бастап» — бір реттік төлем, абоненттік ақысыз:') + '<div style="margin-top:6px">' + rows + '</div>' +
          L('\nДо 10 страниц и доп. опции — без доплаты. Точную сумму с вашими опциями покажет калькулятор, его можно скачать как коммерческое предложение в PDF.', '\n10 бетке дейін және қосымша опциялар — қосымша ақысыз. Нақты соманы калькулятор көрсетеді, оны PDF коммерциялық ұсыныс ретінде жүктеуге болады.'),
          [{ href: HOME + '#calc', onclick: '', t: L('Открыть калькулятор', 'Калькуляторды ашу'), cls: 'p' }, { a: 'pick', t: L('Подобрать тип сайта', 'Сайт түрін таңдау') }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      }
      if (a === 'time') return bot(L('Срок зависит от тарифа: лендинг — 1–2 дня, интернет-магазин — 4–5 дней. Срочно — от 10 часов (+30%), а если не спешите, 4–5 дней — скидка 30%.\nСрок считается с момента, когда у меня есть ваши тексты, цены и фото.', 'Мерзім тарифке байланысты: лендинг — 1–2 күн, интернет-дүкен — 4–5 күн. Шұғыл — 10 сағаттан бастап (+30%), ал асықпасаңыз, 4–5 күн — 30% жеңілдік.\nМерзім мәтіндер, бағалар мен суреттер менде болған сәттен бастап есептеледі.'), [{ a: 'price', t: L('Сколько стоит?', 'Қанша тұрады?') }, { a: 'lead', t: L('Оставить заявку', 'Өтінім қалдыру'), cls: 'p' }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      if (a === 'admin') return bot(L('Админ-панель — это ваш личный кабинет сайта: меняете цены, меню, фото и тексты с телефона, видите заявки со статусами, скачиваете отчёт в Excel и получаете уведомления в Telegram.\nСтоит +', 'Әкімшілік панель — сайттың жеке кабинеті: бағаны, мәзірді, суреттер мен мәтіндерді телефоннан өзгертесіз, өтінімдерді мәртебесімен көресіз, Excel есебін жүктейсіз және Telegram-ға хабарлама аласыз.\nБағасы +') + money((d.calc && d.calc.admin) || 5000) + L('; в интернет-магазине и премиуме уже входит.', '; интернет-дүкен мен премиумға кіреді.'), [{ href: calcLink((d.types || [{ id: 'cafe' }])[0].id, '&admin=1'), onclick: ((d.types || [{ id: 'cafe' }])[0].id) + '|admin', t: L('Добавить в расчёт', 'Есептеуге қосу'), cls: 'p' }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      if (a === 'domain') return bot(L('Можно начать с бесплатного адреса вида имя.github.io, а потом подключить свой домен.\n• .com — помогу купить и подключу.\n• .kz — по правилам зоны сайт должен быть на сервере в Казахстане, подберу казахстанский хостинг.\n• Хостинг sitemaker: 3 месяца в подарок, дальше — от ', 'Алдымен атауы.github.io түріндегі тегін мекенжайдан бастап, кейін өз доменіңізді қосуға болады.\n• .com — сатып алуға көмектесіп, қосып беремін.\n• .kz — аймақ ережесі бойынша сайт Қазақстандағы серверде болуы керек, қазақстандық хостинг таңдап беремін.\n• sitemaker хостингі: 3 ай сыйлыққа, кейін — ') + money(1000) + L('/мес.', '/айдан бастап.'), [{ href: (KK ? '/kz' : '') + (KK ? '/#calc' : '/blog/kak-vybrat-domen-dlya-sayta/'), t: KK ? 'Калькулятор' : 'Статья: как выбрать домен' }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      if (a === 'pay') return bot(L('Предоплата — на Kaspi, остаток — после запуска сайта. Предоплата не возвращается (это резерв времени и начало работ). До 5 правок бесплатно, поддержка 30 дней.', 'Алдын ала төлем — Kaspi арқылы, қалғаны — сайт іске қосылғаннан кейін. Алдын ала төлем қайтарылмайды (бұл уақытты брондау және жұмыстың басталуы). 5 түзетуге дейін тегін, 30 күн қолдау.'), [{ a: 'lead', t: L('Оставить заявку', 'Өтінім қалдыру'), cls: 'p' }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      if (a === 'lang') return bot(L('Да, сайт может быть на русском и казахском — без доплаты, с переключателем языка.', 'Иә, сайт орыс және қазақ тілдерінде болуы мүмкін — қосымша ақысыз, тіл ауыстырғышымен.'), MENU());
      if (a === 'seo') return bot(L('Да: делаю базовое SEO — заголовки, описания, карту сайта, подключение к Google и Яндексу. Позиции в поиске растут постепенно, и никто честно не гарантирует «топ-1 за неделю».', 'Иә: базалық SEO жасаймын — тақырыптар, сипаттамалар, сайт картасы, Google мен Яндекске қосу. Іздеудегі орын біртіндеп өседі, «бір аптада топ-1» деп ешкім адал кепілдік бере алмайды.'), MENU());
      if (a === 'works') return bot(L('Вот портфолио: рестораны, доставка, отели, услуги — каждый сайт открывается и работает.', 'Міне портфолио: мейрамханалар, жеткізу, қонақүйлер, қызметтер — әр сайт ашылады және жұмыс істейді.'), [{ href: (KK ? '/kz' : '') + '/portfolio/', t: L('Открыть портфолио', 'Портфолионы ашу'), cls: 'p' }, { a: 'menu', t: L('Другой вопрос', 'Басқа сұрақ') }]);
      if (a === 'lead') {
        var summary = history.filter(function (h) { return h.role === 'user'; }).slice(-4).map(function (h) { return '— ' + h.text; }).join('\n');
        return bot(L('Отлично! Напишите в WhatsApp — отвечу лично в течение 15 минут. Или оставьте имя и телефон в форме под калькулятором.', 'Тамаша! WhatsApp-қа жазыңыз — 15 минут ішінде өзім жауап беремін. Немесе калькулятордың астындағы формаға атыңыз бен телефоныңызды қалдырыңыз.'),
          [{ href: waLink(summary ? L('Мои вопросы помощнику:\n', 'Көмекшіге сұрақтарым:\n') + summary : ''), ext: 1, t: 'WhatsApp', cls: 'w' }, { href: 'https://t.me/' + CFG.tg, ext: 1, t: 'Telegram' }, { href: HOME + '#lead', t: L('Форма заявки', 'Өтінім формасы') }]);
      }
      return bot(L('Хороший вопрос! Я автоматический помощник и могу не знать точного ответа. Напишите его в WhatsApp — ответ придёт лично от разработчика.', 'Жақсы сұрақ! Мен автоматты көмекшімін, нақты жауапты білмеуім мүмкін. Оны WhatsApp-қа жазыңыз — жауапты әзірлеушінің өзі береді.'),
        [{ href: waLink(history.length ? history[history.length - 1].text : ''), ext: 1, t: L('Спросить в WhatsApp', 'WhatsApp-та сұрау'), cls: 'w' }].concat(MENU().slice(0, 4)));
    });
  }
  var INTENTS = [
    ['price', /цен|стои|сколько|прайс|дорог|дешев|бюджет|баға|қанша|тұрады|ақша|price|cost/i], ['time', /срок|когда|быстр|долго|дней|час|мерзім|қашан|уақыт|күн/i],
    ['admin', /админ|панел|сам.*мен|изменять|редакт|әкімші|өзім/i], ['domain', /домен|хостинг|\.kz|\.com|адрес сайта|domain|host/i], ['pay', /оплат|kaspi|каспи|предопл|рассроч|төле/i],
    ['lang', /казах|қазақ|язык|тіл|kz версия/i], ['seo', /seo|сео|google|гугл|яндекс|поиск|топ|іздеу/i], ['works', /пример|портфолио|работ[ыа]|кейс|жұмыс|үлгі/i],
    ['lead', /заказ|заявк|связ|позвон|созвон|менеджер|тапсырыс|өтінім|хабарлас/i], ['pick', /какой сайт|что выбрать|лендинг или|магазин или|подобрать|посовет|не знаю|қандай сайт|таңда/i]
  ];
  function answerText(v) {
    if (CFG.api) {
      fetch(CFG.api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: history.slice(-12), lang: KK ? 'kk' : 'ru', page: location.pathname }) })
        .then(function (r) { return r.json(); }).then(function (j) { if (!j || !j.reply) throw 0; bot(esc(j.reply), MENU()); }).catch(function () { local(v); });
      return;
    }
    local(v);
  }
  function local(v) {
    var digits = v.replace(/\D/g, '');
    if (digits.length >= 10 && digits.length <= 12) return go('lead');
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][1].test(v)) return go(INTENTS[i][0]);
    if (/кафе|ресторан|мейрам|доставк|магазин|салон|отел|хостел|клиник|стомат|дүкен|қонақ/i.test(v)) { ctx = {}; ctx.biz = /кафе|ресторан|мейрам/i.test(v) ? 'food' : /доставк|магазин|дүкен/i.test(v) ? 'shop' : /салон/i.test(v) ? 'beauty' : /отел|хостел|қонақ/i.test(v) ? 'hotel' : 'clinic'; return go('biz', ctx.biz); }
    go('unknown');
  }
})();
