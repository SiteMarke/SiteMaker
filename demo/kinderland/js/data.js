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
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }

  function money(n) {
    n = Math.round(Number(n) || 0);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸';
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  window.KL = { KEY: KEY, DEFAULT: DEFAULT, load: load, save: save, reset: reset, money: money, esc: esc, clone: clone };
})();
