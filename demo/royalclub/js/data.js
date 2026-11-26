/* Royal Club Fitness & SPA — данные сайта (демо).
   В демо всё, что меняется в админке, хранится в браузере (localStorage).
   В рабочей версии те же данные живут в облаке, а заявки приходят в WhatsApp / Telegram. */
(function () {
  var KEY = 'royalclub_demo_data_v1';
  var BKEY = 'royalclub_demo_bookings_v1';
  var U = function (id, w) { return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + (w || 1200) + '&q=70'; };
  var T = function (p) { return 'https://almaty.royalfitness.kz/wp-content/themes/yootheme/cache/' + p + '.jpeg'; };

  var DEFAULT = {
    settings: {
      name: 'Royal Club',
      tagline: 'Fitness & SPA',
      phone: '+7 727 356 55 55',
      wa: '77770439030',
      instagram: 'royal_clubs_almaty',
      rating: '4,9',
      reviews: '1158',
      app: 'https://apps.apple.com/us/app/royal-fitness/id1263231505'
    },
    promo: {
      on: true,
      title: 'Пробная тренировка в любом клубе',
      text: 'Познакомьтесь с клубом, бассейном и тренером до покупки карты — оставьте заявку, администратор подберёт время.'
    },
    clubs: [
      { name: 'Samal', address: 'мкр. Самал-3, 20, угол ул. Мендикулова', hours: '', note: 'Тренажёрный зал, бассейн, SPA' },
      { name: 'Bukhar Zhyrau', address: 'бульвар Бухар Жырау, 27/5', hours: '', note: 'Тренажёрный зал, групповые программы' },
      { name: 'Nurly Tau', address: 'проспект Аль-Фараби, 7к5А', hours: '', note: 'Тренажёрный зал, бассейн, групповые' },
      { name: 'Botanika', address: 'ЖК «Ботанический сад», 26', hours: '', note: 'Семейный клуб рядом с домом' }
    ],
    zones: [
      { title: 'Тренажёрный зал', text: '1200 м² и современное оборудование', img: U('1571902943202-507ec2618e8f', 1400) },
      { title: 'Бассейн 25 метров', text: 'Спортивное плавание и аквапрограммы', img: U('1560090995-01632a28895b') },
      { title: 'SPA-салон', text: 'Премиум-уход после тренировки', img: U('1544161515-4ab6ce6db874') },
      { title: 'Групповые программы', text: '71 вид программ: от сайкла до аэро-йоги', img: U('1518611012118-696072aa579a') },
      { title: 'Персональный тренинг', text: 'План под вашу цель с элит-тренером', img: U('1616279969856-759f316a5ac1') },
      { title: 'Свободные веса', text: 'Гантели, штанги, функциональная зона', img: U('1534438327276-14e5300c3a48') }
    ],
    cards: [
      { name: 'Platinum', price: '', period: '12 месяцев', text: 'Карта на 12 месяцев с дополнительными привилегиями для VIP-клиентов.', perks: 'Все зоны клуба; Привилегии VIP-клиента; Срок 12 месяцев', theme: 'platinum' },
      { name: 'Gold', price: '', period: 'безлимит', text: 'Безлимитный доступ во все зоны клуба, расширенная заморозка и больше гостевых визитов.', perks: 'Безлимит во все зоны; Расширенная заморозка; Больше гостевых визитов', theme: 'gold' },
      { name: 'Day', price: '', period: 'дневная', text: 'Дневная карта для тех, кто тренируется в первой половине дня.', perks: 'Дневные часы; Для свободного графика; Все основные зоны', theme: 'day' },
      { name: 'Kids', price: '', period: 'для детей', text: 'Спортивные и развивающие программы для юных членов клуба.', perks: 'Royal Kids; Детское плавание; Групповые и индивидуальные', theme: 'kids' },
      { name: 'Корпоративная', price: '', period: 'для компаний', text: 'Предложение для компании, собранное под ваш запрос.', perks: 'Для сотрудников; Условия под компанию; Один договор', theme: 'corp' }
    ],
    schedule: [
      { cat: 'Групповые', time: '07:30', name: 'Сайкл', club: 'Samal', dur: '45 мин' },
      { cat: 'Групповые', time: '09:00', name: 'Пилатес-аллегро', club: 'Nurly Tau', dur: '55 мин' },
      { cat: 'Групповые', time: '12:00', name: 'Аэро-йога', club: 'Botanika', dur: '60 мин' },
      { cat: 'Групповые', time: '18:30', name: 'Функциональный тренинг', club: 'Bukhar Zhyrau', dur: '55 мин' },
      { cat: 'Групповые', time: '19:30', name: 'Сайкл', club: 'Nurly Tau', dur: '45 мин' },
      { cat: 'Групповые', time: '20:00', name: 'Стретчинг', club: 'Samal', dur: '55 мин' },
      { cat: 'Водные', time: '07:00', name: 'Свободное плавание', club: 'Samal', dur: '60 мин' },
      { cat: 'Водные', time: '10:00', name: 'Аквааэробика', club: 'Nurly Tau', dur: '45 мин' },
      { cat: 'Водные', time: '19:00', name: 'Техника плавания', club: 'Samal', dur: '55 мин' },
      { cat: 'Детские', time: '10:00', name: 'Грудничковое плавание', club: 'Samal', dur: '30 мин' },
      { cat: 'Детские', time: '16:00', name: 'Плавание 5–8 лет', club: 'Nurly Tau', dur: '45 мин' },
      { cat: 'Детские', time: '17:00', name: 'Royal Kids: ОФП', club: 'Bukhar Zhyrau', dur: '50 мин' },
      { cat: 'Игровые', time: '08:00', name: 'Сквош', club: 'Samal', dur: '45 мин' },
      { cat: 'Игровые', time: '20:30', name: 'Сквош: игровой вечер', club: 'Samal', dur: '90 мин' }
    ],
    trainers: [
      { name: 'Евгений Ковалёв', role: 'Элит-тренер, супервайзер тренажёрного зала Samal', img: T('28/kovaljov_evgenij-28271343') },
      { name: 'Балжан Надирбаева', role: 'Элит-тренер, супервайзер групповых программ Nurly Tau', img: T('d5/nadirbaeva_balzhan-d5eeafc7') },
      { name: 'Олег Штейников', role: 'Элит-тренер, супервайзер водных программ Samal', img: T('be/shtejnikov_oleg-be4b6724') },
      { name: 'Александр Джумадилдаев', role: 'Элит-тренер', img: T('d0/dzhumadildaev_aleksandr-d046b412') },
      { name: 'Лола Азаметова', role: 'Элит-тренер', img: T('a3/azametova_lola-a358874b') },
      { name: 'Марина Исмаилова', role: 'Супервайзер групповых программ Samal', img: T('12/ismailova_marina-12031845') },
      { name: 'Андрей Клюев', role: 'Элит-тренер, супервайзер водных программ Nurly Tau', img: T('16/kljuev_andrej-1608c931') },
      { name: 'Жибек Нурпеисова', role: 'Элит-тренер', img: T('b7/nurpeisova_zhibek-b79a6c5e') },
      { name: 'Вячеслав Кадочников', role: 'Заместитель фитнес-директора', img: T('79/kadochnikov-vjacheslav-790cbbd3') }
    ],
    faq: [
      { q: 'Можно сначала прийти на пробную тренировку?', a: 'Да. Оставьте заявку — администратор подберёт удобное время в выбранном клубе.' },
      { q: 'Как заморозить карту?', a: 'Напишите в WhatsApp номер карты и даты — администратор оформит заморозку по условиям вашей карты.' },
      { q: 'С какого возраста можно ребёнку?', a: 'Обучение плаванию — от 0 до 14 лет, есть грудничковое плавание и более 10 программ Royal Kids.' },
      { q: 'Есть ли корпоративные условия?', a: 'Да, корпоративное предложение собирается под запрос компании. Оставьте заявку с пометкой «корпоратив».' }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) {
        var d = JSON.parse(s), def = clone(DEFAULT);
        for (var k in def) if (!(k in d)) d[k] = def[k];
        for (var k2 in def.settings) if (!(k2 in d.settings)) d.settings[k2] = def.settings[k2];
        return d;
      }
    } catch (e) {}
    return clone(DEFAULT);
  }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch (e) { return false; } }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }
  function bookings() { try { return JSON.parse(localStorage.getItem(BKEY) || '[]'); } catch (e) { return []; } }
  function saveBookings(l) { try { localStorage.setItem(BKEY, JSON.stringify(l)); } catch (e) {} }
  function addBooking(b) { var l = bookings(); l.unshift(b); saveBookings(l); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function wa(num, text) { return 'https://wa.me/' + String(num).replace(/\D/g, '') + '?text=' + encodeURIComponent(text); }

  window.RC = { DEFAULT: DEFAULT, load: load, save: save, reset: reset, bookings: bookings, saveBookings: saveBookings, addBooking: addBooking, esc: esc, wa: wa };
})();
