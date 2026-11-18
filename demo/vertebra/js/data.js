/* Vertebra Medical (Петропавловск) — данные сайта.
   Услуги и цены взяты из карточки 2ГИС сети Vertebra Medical (ориентировочные), отзывы — из карточки в Петропавловске.
   В готовом сайте этими данными управляет админ-панель. */
(function () {
  var KEY = 'vm_demo_data_v1';

  var DEFAULT = {
    settings: {
      wa: '77716206682',
      insta: 'vertebra_medical_petropavlovsk',
      address: 'ул. Жабаева, 241, 1 этаж',
      city: 'Петропавловск',
      hours: 'Ежедневно 09:00 – 19:00, по предварительной записи'
    },
    promo: {
      on: true,
      text: 'При записи на консультацию пробная процедура в подарок. Приходите с МРТ, КТ или рентгеном, если они есть.'
    },
    services: [
      { name: 'Консультация врача', desc: 'Осмотр, разбор МРТ, КТ, рентгена и выписок, индивидуальный план лечения', price: 0 },
      { name: 'Мануальная терапия', desc: 'Лечение боли в спине, в том числе при грыже и протрузии диска', price: 15000, from: true },
      { name: 'Ударно-волновая терапия', desc: 'Пяточная шпора, боли в суставах и сухожилиях', price: 10000, from: true },
      { name: 'Высокоинтенсивная магнитная терапия SIS', desc: 'Аппаратная процедура для спины и суставов', price: 10000, from: true },
      { name: 'Низкоинтенсивная магнитная терапия', desc: 'Мягкое аппаратное воздействие, назначает врач', price: 5000, from: true },
      { name: 'Лазерная терапия', desc: 'Аппаратная процедура при болях в спине и суставах', price: 10000, from: true },
      { name: 'Иглотерапия', desc: 'Рефлексотерапия по назначению врача', price: 10000, from: true },
      { name: 'Электростимуляция', desc: 'Аппаратная процедура, подбирается под вашу задачу', price: 7000, from: true },
      { name: 'PRP-терапия', desc: 'Плазма, обогащённая тромбоцитами, из вашей собственной крови', price: 25000, from: true },
      { name: 'Массаж спины', desc: 'Лечебный массаж, снимает напряжение мышц', price: 15000, from: true },
      { name: 'Общий массаж', desc: 'Лечебный массаж всего тела', price: 20000, from: true },
      { name: 'Внутримышечная инъекция', desc: 'Процедурный кабинет', price: 2000 },
      { name: 'Внутривенная инъекция', desc: 'Процедурный кабинет', price: 5000 }
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

  /* Заявки на консультацию (в демо — в браузере; в рабочей версии приходят ещё и в Telegram) */
  var RKEY = 'vm_demo_req_v1';
  function seedReq() {
    function day(n) { var d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
    return [
      { id: 'r1', name: 'Марат', phone: '+7 701 555 12 34', date: day(1), problem: 'Грыжа или протрузия', mri: true, note: 'Есть МРТ поясницы', status: 'new', example: true },
      { id: 'r2', name: 'Светлана', phone: '+7 777 301 45 67', date: day(2), problem: 'Артроз колена', mri: false, note: '', status: 'ok', example: true },
      { id: 'r3', name: 'Ермек', phone: '+7 705 880 22 11', date: day(-2), problem: 'Пяточная шпора', mri: false, note: '', status: 'done', example: true }
    ];
  }
  function requests() {
    try { var r = JSON.parse(localStorage.getItem(RKEY) || 'null'); if (r) return r; } catch (e) {}
    var r2 = seedReq(); saveRequests(r2); return r2;
  }
  function saveRequests(r) { try { localStorage.setItem(RKEY, JSON.stringify(r)); return true; } catch (e) { return false; } }
  function addRequest(o) { var r = requests(); o.id = 'r' + Date.now().toString(36); o.status = 'new'; r.unshift(o); saveRequests(r); }
  function reset() { try { localStorage.removeItem(KEY); localStorage.removeItem(RKEY); } catch (e) {} }

  function money(n) { n = Math.round(Number(n) || 0); return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.VM = { KEY: KEY, DEFAULT: DEFAULT, load: load, save: save, reset: reset, requests: requests, saveRequests: saveRequests, addRequest: addRequest, money: money, esc: esc, clone: clone };
})();
