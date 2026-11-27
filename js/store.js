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
    return fetch('/data/site.json?v=' + Date.now()).then(function (r) { // абсолютный путь: работает и на /kz/
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
    // 14.11: новая работа — TURAN-EL, ресторан тюркских народов (Караганда)
    if ((+d.pv || 0) < 4) {
      var fc3 = d.cats.filter(function (c8) { return c8.id === 'food'; })[0];
      if (fc3 && !d.cats.some(function (c9) { return c9.works.some(function (w) { return w.id === 'turan'; }); })) fc3.works.push({"id":"turan","name":"TURAN-EL","city":"Караганда · ресторан тюркских народов","desc":"Меню с фото и ценами, галерея залов, отзывы гостей и бронь стола прямо в WhatsApp.","tags":["Меню","Галерея","WhatsApp"],"url":"https://tamerlankajrolla2-a11y.github.io/Turan-El/","m":"img/w/turan-m.webp","d":"img/w/turan-d.webp","fan":false});
      d.pv = 4;
    }
    // 17.11: новая работа — Big Sushi (доставка суши и пиццы, Петропавловск)
    if ((+d.pv || 0) < 5) {
      var sc = d.cats.filter(function (c10) { return c10.id === 'shop'; })[0];
      if (sc && !d.cats.some(function (c11) { return c11.works.some(function (w) { return w.id === 'bigsushi'; }); })) {
        var at2 = 0; sc.works.forEach(function (w, i) { if (w.id === 'sushi') at2 = i + 1; });
        sc.works.splice(at2, 0, {"id": "bigsushi", "name": "Big Sushi", "city": "Петропавловск · доставка суши и пиццы", "desc": "Свой дизайн в стиле бренда: сеты до 100 роллов, роллы, пиццы и крылышки; корзина и заказ в WhatsApp, админка, заказы в Telegram-бот.", "tags": ["Корзина", "Админка", "Telegram"], "url": "https://tamerlankajrolla2-a11y.github.io/BigSushi/", "m": "img/w/bigsushi-m.webp", "d": "img/w/bigsushi-d.webp", "fan": true});
      }
      d.pv = 5;
    }
    // 17.11: новые работы — Тұлпар, Kinder Land, WOMAN (услуги)
    if ((+d.pv || 0) < 6) {
      var vc = d.cats.filter(function (c12) { return c12.id === 'serv'; })[0];
      if (vc) {
        var add6 = [{"id": "tulpar", "name": "Тұлпар", "city": "Петропавловск · автошкола", "desc": "Категории A и B, программа обучения, преподаватели, отзывы, запись в группу через WhatsApp.", "tags": ["Запись", "Отзывы", "WhatsApp"], "url": "https://sitemakerkz.com/demo/tulpar/", "m": "img/w/tulpar-m.webp", "d": "img/w/tulpar-d.webp", "fan": false}, {"id": "kinderland", "name": "Kinder Land", "city": "Петропавловск · детский центр", "desc": "Зоны и цены, комната именинника, новогодняя программа, отзывы, заявка на праздник в WhatsApp.", "tags": ["Цены", "Праздники", "WhatsApp"], "url": "https://sitemakerkz.com/demo/kinderland/", "m": "img/w/kinderland-m.webp", "d": "img/w/kinderland-d.webp", "fan": false}, {"id": "woman", "name": "WOMAN beauty space", "city": "Петропавловск · салон красоты", "desc": "Услуги и цены, мастера, работы, онлайн-запись в WhatsApp и админка для салона.", "tags": ["Запись", "Админка", "WhatsApp"], "url": "https://sitemakerkz.com/demo/woman/", "m": "img/w/woman-m.webp", "d": "img/w/woman-d.webp", "fan": false}];
        add6.forEach(function (nw) {
          if (!d.cats.some(function (c13) { return c13.works.some(function (w) { return w.id === nw.id; }); })) vc.works.push(nw);
        });
      }
      d.pv = 6;
    }
    // 25.11: новый отзыв — Mini Kids (один раз для данных, уже сохранённых на сервере)
    if ((+d.pv || 0) < 7) {
      if (!d.press.items.some(function (x) { return x.id === 'p-minikids'; })) d.press.items.splice(Math.min(2, d.press.items.length), 0, {"id": "p-minikids", "type": "img", "src": "img/press/minikids.webp", "poster": "", "tag": "отзыв", "name": "Mini Kids", "who": "Детская одежда ручного пошива", "text": "«Выполнили всё чётко и в срок. Понравилось, что понимают клиента: сразу поняли мой запрос и сделали так, как я хотела, даже лучше. Очень довольна результатом и рекомендую!»", "url": "https://tamerlankajrolla2-a11y.github.io/Mini-Kids/", "hide": false});
      d.pv = 7;
    }
    // 27.11: бизнес-сайт — 25 000 ₸, админ-панель входит в цену
    if ((+d.pv || 0) < 8) {
      d.types.forEach(function (x) {
        if (x.id !== 'biz') return;
        if (x.price === 17500) x.price = 25000;
        if (x.desc === 'Попроще: до 10 страниц, продающие тексты, форма заявки, галерея, базовое SEO. Без админ-панели — правки вношу я.') x.desc = 'До 10 страниц, продающие тексты, форма заявки, галерея, базовое SEO, админ-панель.';
        x.adminIn = true;
      });
      d.faq.forEach(function (f) { if (f && typeof f.a === 'string') f.a = f.a.replace('В интернет-магазине и премиуме админка уже входит.', 'В бизнес-сайте, интернет-магазине и премиуме админка уже входит.'); });
      d.pv = 8;
    }
    // 27.11: портфолио — новые работы клиентов и отдельный блок «примеры для бизнесов»
    if ((+d.pv || 0) < 9) {
      var has9 = function (id) { return d.cats.some(function (c) { return c.works.some(function (w) { return w.id === id; }); }); };
      [["serv", {"id": "aldimed", "name": "ALDIMED", "city": "Караганда · медицинский центр", "desc": "Врачи и направления, УЗИ 4D, анализы лаборатории INVIVO с ценами, запись на приём и админ-панель для клиники.", "tags": ["Запись", "Цены", "Админка"], "url": "https://aldimed.github.io/", "m": "img/w/aldimed-m.webp", "d": "img/w/aldimed-d.webp", "fan": true}], ["serv", {"id": "vertebra", "name": "Vertebra Medical", "city": "Петропавловск · лечение позвоночника и суставов", "desc": "Врачи, методы лечения грыжи и артроза, цены, отзывы пациентов, запись на приём и админ-панель. Свой домен.", "tags": ["Запись", "Отзывы", "Админка"], "url": "https://vertebramedical.com/", "m": "img/w/vertebra-m.webp", "d": "img/w/vertebra-d.webp", "fan": false}], ["serv", {"id": "bjplast", "name": "BJ PLAST", "city": "Астана · окна, двери и витражи", "desc": "Пластиковые и алюминиевые окна, двери и тамбуры, калькулятор стоимости, заявка на бесплатный замер и админ-панель. Свой домен.", "tags": ["Калькулятор", "Заявка", "Админка"], "url": "https://bjplast.com/", "m": "img/w/bjplast-m.webp", "d": "img/w/bjplast-d.webp", "fan": false}], ["serv", {"id": "petrodom", "name": "PetroDom", "city": "Петропавловск · продажа квартир", "desc": "Квартиры с фото и ценами, фильтры по комнатам и цене, подбор вариантов и заявка в WhatsApp.", "tags": ["Каталог", "Фильтры", "WhatsApp"], "url": "https://tamerlankajrolla2-a11y.github.io/PetroDom/", "m": "img/w/petrodom-m.webp", "d": "img/w/petrodom-d.webp", "fan": false}], ["shop", {"id": "nazdar", "name": "Nazdar Flowers", "city": "Астана · цветы и подарки", "desc": "Каталог букетов, растений и подарков с ценами, корзина, акции и заказ с доставкой в WhatsApp.", "tags": ["Каталог", "Корзина", "Доставка"], "url": "https://tamerlankajrolla2-a11y.github.io/Nazdar-Flowers/", "m": "img/w/nazdar-m.webp", "d": "img/w/nazdar-d.webp", "fan": true}], ["shop", {"id": "alisa", "name": "ALISA KIDS", "city": "Казахстан · детская одежда", "desc": "Каталог одежды для детей 2–12 лет с фильтром по размеру, корзина, доставка по Казахстану и админ-панель. Свой домен.", "tags": ["Каталог", "Фильтры", "Админка"], "url": "https://alisa-kids.com/", "m": "img/w/alisa-m.webp", "d": "img/w/alisa-d.webp", "fan": false}], ["shop", {"id": "minikids", "name": "Mini Kids", "city": "Казахстан · детская одежда ручного пошива", "desc": "Каталог хлопковой одежды с размерами 92–110 и заказ в WhatsApp. Есть отзыв владелицы.", "tags": ["Каталог", "WhatsApp"], "url": "https://tamerlankajrolla2-a11y.github.io/Mini-Kids/", "m": "img/w/minikids-m.webp", "d": "img/w/minikids-d.webp", "fan": false}], ["shop", {"id": "zerosushi", "name": "Zero Sushi", "city": "Петропавловск · доставка суши, пиццы и чикена", "desc": "Сеты до 100 роллов, роллы, пицца и чикен; корзина, промокоды и админ-панель.", "tags": ["Корзина", "Промокоды", "Админка"], "url": "https://tamerlankajrolla2-a11y.github.io/ZeroSushi/", "m": "img/w/zerosushi-m.webp", "d": "img/w/zerosushi-d.webp", "fan": false}]].forEach(function (x) {
        var c = d.cats.filter(function (c) { return c.id === x[0]; })[0];
        if (c && !has9(x[1].id)) c.works.push(x[1]);
      });
      d.cats.forEach(function (c) { c.works.forEach(function (w) {
        if (w.id === 'petro' && w.desc === "Банкеты под ключ: меню, калькулятор банкета на гостя, RU/KZ.") { w.url = "https://petro-povar.github.io/"; w.desc = "Выездной шеф: банкеты, фуршеты и сеты, каталог с корзиной, доставка и админ-панель."; w.tags = ["Корзина", "Доставка", "Админка"]; }
      }); });
      var dc = d.cats.filter(function (c) { return c.id === 'demo'; })[0];
      if (!dc) { dc = { id: 'demo', title: "примеры для бизнесов", desc: "Бесплатные примеры, которые я сделал салонам, клиникам, кафе и магазинам, чтобы показать их будущий сайт.", works: [] }; d.cats.push(dc); }
      var mv = ["tulpar", "kinderland", "woman"], moved9 = [];
      d.cats.forEach(function (c) { if (c === dc) return; c.works = c.works.filter(function (w) { if (mv.indexOf(w.id) >= 0) { w.fan = false; moved9.push(w); return false; } return true; }); });
      [{"id": "masstape", "name": "Mass Tape", "city": "Павлодар · массаж и тейпирование", "desc": "Карта тела с ценами по зонам, 6 мастеров, полный прайс, курсы, отзывы из 2ГИС и запись в WhatsApp.", "tags": ["Запись", "Цены", "WhatsApp"], "url": "https://sitemakerkz.com/demo/masstape/", "m": "img/w/masstape-m.webp", "d": "img/w/masstape-d.webp", "fan": true}, {"id": "royalclub", "name": "Royal Club", "city": "Алматы · фитнес-клубы и SPA", "desc": "4 клуба, подбор клубной карты за 3 вопроса, расписание занятий, тренеры и Royal Kids.", "tags": ["Запись", "Филиалы", "Расписание"], "url": "https://sitemakerkz.com/demo/royalclub/", "m": "img/w/royalclub-m.webp", "d": "img/w/royalclub-d.webp", "fan": true}, {"id": "labella", "name": "La Bella Sweets", "city": "Астана · торты и десерты", "desc": "60+ позиций с ценами: торты, бенто, комбо-наборы и клубника в шоколаде, корзина и заказ в WhatsApp.", "tags": ["Каталог", "Корзина", "WhatsApp"], "url": "https://sitemakerkz.com/demo/la-bella-sweets/", "m": "img/w/la-bella-sweets-m.webp", "d": "img/w/la-bella-sweets-d.webp", "fan": true}, {"id": "abramenko", "name": "ABRAMENKO studio", "city": "Петропавловск · студия красоты", "desc": "Окрашивание, стрижки и эпиляция: мастера, работы, курс колористики, отзывы и запись за минуту.", "tags": ["Запись", "Мастера", "Отзывы"], "url": "https://sitemakerkz.com/demo/abramenko/", "m": "img/w/abramenko-m.webp", "d": "img/w/abramenko-d.webp", "fan": false}, {"id": "zhb", "name": "Zhb.gym", "city": "Астана · тренажёрный зал", "desc": "Зал, абонементы, отзывы и запись на тренировку в WhatsApp.", "tags": ["Запись", "Отзывы", "WhatsApp"], "url": "https://tamerlankajrolla2-a11y.github.io/ZNB/", "m": "img/w/zhb-m.webp", "d": "img/w/zhb-d.webp", "fan": false}, {"id": "stomimp", "name": "Стом Империя", "city": "Павлодар · стоматология", "desc": "Лечение, имплантация, ортодонтия и детская стоматология, онлайн-запись к врачу.", "tags": ["Запись", "Услуги"], "url": "https://sitemakerkz.com/demo/stom-imperiya/", "m": "img/w/stom-imperiya-m.webp", "d": "img/w/stom-imperiya-d.webp", "fan": false}, {"id": "alazani", "name": "Алазани", "city": "Павлодар · грузинский ресторан", "desc": "Меню грузинской кухни, бронь стола и заявка на банкет онлайн.", "tags": ["Меню", "Бронь", "Банкеты"], "url": "https://sitemakerkz.com/demo/alazani/", "m": "img/w/alazani-m.webp", "d": "img/w/alazani-d.webp", "fan": false}, {"id": "bossfor", "name": "Bossfor", "city": "Павлодар · рестобар", "desc": "Кухня и зоны заведения, бронь стола за 30 секунд.", "tags": ["Меню", "Бронь"], "url": "https://sitemakerkz.com/demo/bossfor/", "m": "img/w/bossfor-m.webp", "d": "img/w/bossfor-d.webp", "fan": false}, {"id": "akbars", "name": "Ак Барс", "city": "Павлодар · автоцентр", "desc": "Ремонт, шиномонтаж и запчасти, онлайн-запись на ремонт с выбором услуги.", "tags": ["Запись", "Услуги"], "url": "https://sitemakerkz.com/demo/akbars/", "m": "img/w/akbars-m.webp", "d": "img/w/akbars-d.webp", "fan": false}, {"id": "crm", "name": "CRM для бизнеса", "city": "Казахстан · пример CRM", "desc": "Записи, клиенты, заявки, склад и финансы в одной программе. Можно нажимать и менять.", "tags": ["CRM", "Админка"], "url": "https://sitemakerkz.com/demo/crm/", "m": "img/w/crm-m.webp", "d": "img/w/crm-d.webp", "fan": false}, {"id": "banoffee", "name": "Banoffee", "city": "Астана · кондитерская", "desc": "Торты, бенто, эклеры, макарон и синнабоны с ценами, корзина и заказ в WhatsApp.", "tags": ["Каталог", "Корзина", "WhatsApp"], "url": "https://sitemakerkz.com/demo/banoffee/", "m": "img/w/banoffee-m.webp", "d": "img/w/banoffee-d.webp", "fan": false}, {"id": "chocostr", "name": "Chocostrawberry", "city": "Астана · клубника в шоколаде", "desc": "Наборы клубники в шоколаде по размеру и цене, корзина, доставка или самовывоз.", "tags": ["Каталог", "Корзина", "Доставка"], "url": "https://sitemakerkz.com/demo/chocostrawberry/", "m": "img/w/chocostrawberry-m.webp", "d": "img/w/chocostrawberry-d.webp", "fan": false}, {"id": "sandi", "name": "Sandi Chocoflowers", "city": "Астана · клубника в шоколаде", "desc": "Боксы клубники и клубничные букеты XS–L, выбор шоколада, корзина и заказ в WhatsApp.", "tags": ["Каталог", "Корзина", "WhatsApp"], "url": "https://sitemakerkz.com/demo/sandi-chocoflowers/", "m": "img/w/sandi-chocoflowers-m.webp", "d": "img/w/sandi-chocoflowers-d.webp", "fan": false}, {"id": "sladkaya", "name": "Сладкая жизнь", "city": "Астана · кондитерская", "desc": "30 десертов с ценами: торты, пирожные, трайфлы и боксы, корзина и заказ в WhatsApp.", "tags": ["Каталог", "Корзина", "WhatsApp"], "url": "https://sitemakerkz.com/demo/sladkaya-zhizn/", "m": "img/w/sladkaya-zhizn-m.webp", "d": "img/w/sladkaya-zhizn-d.webp", "fan": false}, {"id": "shafran", "name": "Shafran", "city": "Алматы · сеть кафе", "desc": "17 филиалов, восточная и европейская кухня, заказ и бронь стола напрямую без агрегаторов.", "tags": ["Меню", "Заказ", "Бронь"], "url": "https://sitemakerkz.com/demo/shafran/", "m": "img/w/shafran-m.webp", "d": "img/w/shafran-d.webp", "fan": false}, {"id": "burger", "name": "Burger na Satpayeva", "city": "Алматы · сеть бургерных", "desc": "9 филиалов, меню бургеров и донеров и заказ напрямую в WhatsApp.", "tags": ["Меню", "Заказ", "Филиалы"], "url": "https://sitemakerkz.com/demo/burger-na-satpayeva/", "m": "img/w/burger-na-satpayeva-m.webp", "d": "img/w/burger-na-satpayeva-d.webp", "fan": false}, {"id": "coffee", "name": "Coffee Original", "city": "Алматы · сеть кофеен", "desc": "22 филиала, меню кофе, завтраков и десертов и поиск ближайшей кофейни.", "tags": ["Меню", "Филиалы"], "url": "https://sitemakerkz.com/demo/coffee-original/", "m": "img/w/coffee-original-m.webp", "d": "img/w/coffee-original-d.webp", "fan": false}, {"id": "termanova", "name": "Terma Nova", "city": "Караганда · банный комплекс", "desc": "Бани, сауны, бассейн и зоны отдыха, рейтинг из 2ГИС и бронь в WhatsApp.", "tags": ["Бронь", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/terma-nova/", "m": "img/w/terma-nova-m.webp", "d": "img/w/terma-nova-d.webp", "fan": false}, {"id": "lifespa", "name": "Life SPA", "city": "Астана · SPA и салон красоты", "desc": "Бани, сауны и массаж, рейтинг из 2ГИС и бронь отдыха в WhatsApp.", "tags": ["Бронь", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/life-spa/", "m": "img/w/life-spa-m.webp", "d": "img/w/life-spa-d.webp", "fan": false}, {"id": "adam", "name": "ADAM CLINIC", "city": "Астана · многопрофильная клиника", "desc": "9 филиалов, направления врачей, анализы и диагностика, запись на приём в WhatsApp.", "tags": ["Запись", "Врачи", "Филиалы"], "url": "https://sitemakerkz.com/demo/adam-clinic/", "m": "img/w/adam-clinic-m.webp", "d": "img/w/adam-clinic-d.webp", "fan": false}, {"id": "kristina", "name": "Кристина", "city": "Караганда · клиника", "desc": "Направления врачей, анализы и диагностика, рейтинг из 2ГИС и запись на приём в WhatsApp.", "tags": ["Запись", "Врачи", "WhatsApp"], "url": "https://sitemakerkz.com/demo/kristina-clinic/", "m": "img/w/kristina-clinic-m.webp", "d": "img/w/kristina-clinic-d.webp", "fan": false}, {"id": "kovaleva", "name": "Dr. Kovaleva", "city": "Караганда · косметология", "desc": "Врач-косметолог: процедуры, опыт, рейтинг из 2ГИС и запись на консультацию в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/dr-kovaleva/", "m": "img/w/dr-kovaleva-m.webp", "d": "img/w/dr-kovaleva-d.webp", "fan": false}, {"id": "laboptic", "name": "LAB optic", "city": "Астана · сеть салонов оптики", "desc": "6 филиалов, оправы, солнцезащитные очки, линзы и ремонт, запись на подбор очков.", "tags": ["Запись", "Услуги", "Филиалы"], "url": "https://sitemakerkz.com/demo/lab-optic/", "m": "img/w/lab-optic-m.webp", "d": "img/w/lab-optic-d.webp", "fan": false}, {"id": "s1gma", "name": "S1gma", "city": "Астана · автошкола и мотошкола", "desc": "6 филиалов, права категории B и мотошкола, заявка с подбором группы и филиала.", "tags": ["Заявка", "Филиалы", "WhatsApp"], "url": "https://sitemakerkz.com/demo/s1gma/", "m": "img/w/s1gma-m.webp", "d": "img/w/s1gma-d.webp", "fan": false}, {"id": "este", "name": "ESTE", "city": "Астана · сеть барбершопов", "desc": "13 филиалов, мужские стрижки и борода, рейтинг из 2ГИС и запись к барберу в WhatsApp.", "tags": ["Запись", "Филиалы", "WhatsApp"], "url": "https://sitemakerkz.com/demo/este/", "m": "img/w/este-m.webp", "d": "img/w/este-d.webp", "fan": false}, {"id": "alphatrim", "name": "Alpha Trim", "city": "Караганда · барбершоп", "desc": "Мужские стрижки и борода, рейтинг из 2ГИС, карта и запись к барберу в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/alpha-trim/", "m": "img/w/alpha-trim-m.webp", "d": "img/w/alpha-trim-d.webp", "fan": false}, {"id": "adal", "name": "Adal", "city": "Караганда · парикмахерская", "desc": "3 филиала, стрижки и уход для всей семьи, рейтинг из 2ГИС и запись в WhatsApp.", "tags": ["Запись", "Филиалы", "WhatsApp"], "url": "https://sitemakerkz.com/demo/adal/", "m": "img/w/adal-m.webp", "d": "img/w/adal-d.webp", "fan": false}, {"id": "imanova", "name": "Imanova beauty", "city": "Караганда · салон красоты", "desc": "3 филиала, услуги салона, рейтинг из 2ГИС и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Филиалы", "WhatsApp"], "url": "https://sitemakerkz.com/demo/imanova/", "m": "img/w/imanova-m.webp", "d": "img/w/imanova-d.webp", "fan": false}, {"id": "madam", "name": "Madam", "city": "Караганда · студия красоты", "desc": "Маникюр, педикюр, брови и ресницы: услуги, рейтинг из 2ГИС и запись в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/madam/", "m": "img/w/madam-m.webp", "d": "img/w/madam-d.webp", "fan": false}, {"id": "shuaq", "name": "Shuaq", "city": "Астана · маникюр и брови", "desc": "Маникюр, педикюр, брови и ресницы: услуги, рейтинг из 2ГИС и запись в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/shuaq/", "m": "img/w/shuaq-m.webp", "d": "img/w/shuaq-d.webp", "fan": false}, {"id": "ayalashes", "name": "Ayalashes", "city": "Астана · брови и ресницы", "desc": "Брови и ресницы: услуги, рейтинг из 2ГИС, карта и запись за минуту в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/ayalashes/", "m": "img/w/ayalashes-m.webp", "d": "img/w/ayalashes-d.webp", "fan": false}, {"id": "beautybooster", "name": "Beautybooster", "city": "Астана · брови и ресницы", "desc": "Брови и ресницы: услуги, рейтинг из 2ГИС, карта и запись за минуту в WhatsApp.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/beautybooster/", "m": "img/w/beautybooster-m.webp", "d": "img/w/beautybooster-d.webp", "fan": false}, {"id": "elizabeth", "name": "Elizabeth", "city": "Караганда · имидж-клуб", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/elizabeth/", "m": "img/w/elizabeth-m.webp", "d": "img/w/elizabeth-d.webp", "fan": false}, {"id": "freshstyle", "name": "Fresh Style", "city": "Караганда · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/fresh-style/", "m": "img/w/fresh-style-m.webp", "d": "img/w/fresh-style-d.webp", "fan": false}, {"id": "ahh", "name": "Ahh beauty", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/ahh-beauty/", "m": "img/w/ahh-beauty-m.webp", "d": "img/w/ahh-beauty-d.webp", "fan": false}, {"id": "aigul", "name": "Айгүл", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/aigul/", "m": "img/w/aigul-m.webp", "d": "img/w/aigul-d.webp", "fan": false}, {"id": "aura", "name": "Aura", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/aura-beauty/", "m": "img/w/aura-beauty-m.webp", "d": "img/w/aura-beauty-d.webp", "fan": false}, {"id": "beles", "name": "Beles.beauty", "city": "Астана · студия красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/beles-beauty/", "m": "img/w/beles-beauty-m.webp", "d": "img/w/beles-beauty-d.webp", "fan": false}, {"id": "bounty", "name": "Bounty", "city": "Астана · студия красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/bounty/", "m": "img/w/bounty-m.webp", "d": "img/w/bounty-d.webp", "fan": false}, {"id": "inkar", "name": "Іңкәр", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/inkar-beauty/", "m": "img/w/inkar-beauty-m.webp", "d": "img/w/inkar-beauty-d.webp", "fan": false}, {"id": "meduza", "name": "Meduza", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/meduza/", "m": "img/w/meduza-m.webp", "d": "img/w/meduza-d.webp", "fan": false}, {"id": "merci", "name": "Merci", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/merci/", "m": "img/w/merci-m.webp", "d": "img/w/merci-d.webp", "fan": false}, {"id": "minard", "name": "Minard", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/minard/", "m": "img/w/minard-m.webp", "d": "img/w/minard-d.webp", "fan": false}, {"id": "mizu", "name": "MIZU", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/mizu/", "m": "img/w/mizu-m.webp", "d": "img/w/mizu-d.webp", "fan": false}, {"id": "rayana", "name": "Rayana Deluxe", "city": "Астана · салон красоты", "desc": "Услуги салона, рейтинг из 2ГИС, адрес на карте и запись в WhatsApp с выбранной услугой.", "tags": ["Запись", "Услуги", "WhatsApp"], "url": "https://sitemakerkz.com/demo/rayana-deluxe/", "m": "img/w/rayana-deluxe-m.webp", "d": "img/w/rayana-deluxe-d.webp", "fan": false}].forEach(function (w) { if (!has9(w.id)) { dc.works.push(w); if (w.id === 'abramenko') moved9.forEach(function (m) { dc.works.push(m); }), moved9 = []; } });
      moved9.forEach(function (m) { dc.works.push(m); });
      d.pv = 9;
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

  var CRM = 'https://sitemaker-crm.tamerlankajrolla2.workers.dev';
  function toCrm(o) { // копия заявки в CRM (только если оставили телефон)
    try {
      if (!o || !o.phone) return;
      fetch(CRM + '/site-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
        body: JSON.stringify({ name: o.name, phone: o.phone, comment: o.comment, plan: o.plan, total: o.total }) }).catch(function () {});
    } catch (e) {}
  }
  function createOrder(o) { toCrm(o); return req('/order', { method: 'POST', body: o }).then(function (r) { return r || true; }).catch(function () { return false; }); }
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
