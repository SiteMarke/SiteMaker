/* Kinder Land — данные сайта. Цены взяты из карточки 2ГИС (обновлено 24.08.2026).
   В готовом сайте этими данными управляет админ-панель. */
(function () {
  var KEY = 'kl_demo_data_v1';

  var DEFAULT = {
    settings: {
      wa: '77059610677',
      insta: 'kinder_land_2015',
      address: 'ул. Сабита Муканова, 53, 2 этаж',
      city: 'Петропавловск',
      hours: '12:00 – 22:00'
    },
    promo: {
      on: true,
      text: 'Малышковый безлимит — 2 400 ₸ по будням с 12:00 до 18:00. Взрослый с ребёнком — бесплатно.'
    },
    passes: [
      { name: 'Детская площадка', desc: 'Безлимит, до 7 лет. Сопровождение взрослого бесплатно.', price: 1800, tag: '' },
      { name: 'Малышковый безлимит', desc: 'Малышковая площадка + батутный комплекс «Вулкан». Только по будням с 12:00 до 18:00, взрослый бесплатно.', price: 2400, tag: 'Будни' },
      { name: 'Ниндзя-квест + Большой лабиринт', desc: 'Время не ограничено — безлимит.', price: 2500, tag: '' },
      { name: '«Вулкан» + «Ниндзя-квест» + «Большой лабиринт»', desc: 'Время не ограничено — безлимит.', price: 3500, tag: '' },
      { name: 'Безлимит MAXI', desc: 'Детская площадка + «Вулкан» + большой лабиринт + ниндзя-квест. Действует до 7 лет.', price: 4500, tag: 'Всё включено' }
    ],
    extras: [
      { name: 'Батутный комплекс «Вулкан»', desc: 'Стоимость за 1 час', price: 1200 },
      { name: 'Соляная пещера · взрослый', desc: 'Дыхательная релаксация для взрослых', price: 1000 },
      { name: 'Соляная пещера · детский', desc: 'Для малышей и школьников', price: 500 },
      { name: 'Абонемент на 10 посещений · взрослый', desc: 'Выгоднее разовых визитов', price: 8000 },
      { name: 'Абонемент на 10 посещений · детский', desc: 'Выгоднее разовых визитов', price: 4000 }
    ],
    bday: [
      { name: 'Будни · 1 час', desc: 'Комната именинника на час', price: 4000, pack: false },
      { name: 'Будни · пакет', desc: '3 часа + 6 детей на площадке играют бесплатно', price: 22000, pack: true },
      { name: 'Выходные · 1 час', desc: 'Комната именинника на час', price: 5000, pack: false },
      { name: 'Выходные · пакет', desc: '3 часа + 6 детей на площадке играют бесплатно', price: 25000, pack: true }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    var d = clone(DEFAULT);
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (s) for (var k in s) if (s.hasOwnProperty(k)) d[k] = s[k];
    } catch (e) {}
    return d;
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }

  /* Заявки на дни рождения (в демо — в браузере; в рабочей версии приходят ещё и в Telegram) */
  var RKEY = 'kl_demo_req_v1';
  function seedReq() {
    function day(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
    return [
      { id: 'r1', name: 'Айгерим', phone: '+7 701 555 12 34', date: day(3), pack: 'Выходные · пакет', price: 25000, kids: '8', note: 'Тема — Человек-паук', status: 'new', example: true },
      { id: 'r2', name: 'Дмитрий', phone: '+7 777 301 45 67', date: day(6), pack: 'Будни · 1 час', price: 4000, kids: '5', note: '', status: 'ok', example: true },
      { id: 'r3', name: 'Мадина', phone: '+7 705 880 22 11', date: day(-2), pack: 'Будни · пакет', price: 22000, kids: '10', note: 'Торт приносим свой', status: 'done', example: true }
    ];
  }
  function requests() {
    try { var r = JSON.parse(localStorage.getItem(RKEY) || 'null'); if (r) return r; } catch (e) {}
    var r2 = seedReq(); saveRequests(r2); return r2;
  }
  function saveRequests(r) { try { localStorage.setItem(RKEY, JSON.stringify(r)); return true; } catch (e) { return false; } }
  function addRequest(o) {
    var r = requests();
    o.id = 'r' + Date.now().toString(36); o.status = 'new';
    r.unshift(o); saveRequests(r);
  }
  function reset() { try { localStorage.removeItem(KEY); localStorage.removeItem(RKEY); } catch (e) {} }

  function money(n) {
    n = Math.round(Number(n) || 0);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.KL = { KEY: KEY, DEFAULT: DEFAULT, load: load, save: save, reset: reset, requests: requests, saveRequests: saveRequests, addRequest: addRequest, money: money, esc: esc, clone: clone };
})();
