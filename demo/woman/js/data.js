/* WOMAN beauty space — данные сайта (демо).
   В демо всё, что меняется в админке, хранится в браузере (localStorage).
   В рабочей версии те же данные живут в облаке, а записи приходят в Telegram. */
(function () {
  var KEY = 'woman_demo_data_v1';
  var BKEY = 'woman_demo_bookings_v1';

  var DEFAULT = {
    settings: {
      name: 'WOMAN',
      tagline: 'beauty space',
      slogan: 'Место, где тебя ценят',
      wa: '77761411171',
      phone: '+7 776 141 11 71',
      address: 'Петропавловск, ул. Абая, 94',
      hours: 'Ежедневно 09:00–22:00, по записи',
      open: '09:00',
      close: '22:00',
      instagram: 'woman_petropavl',
      men: 'wo.men_salon',
      gis: 'https://2gis.kz/petropavlovsk/firm/70000001098303884',
      rating: '4,9',
      reviews: '514'
    },
    promo: {
      on: true,
      title: '−30% на первый визит',
      text: 'Для новых клиентов каждый понедельник и вторник'
    },
    cats: [
      { id: 'mani', name: 'Маникюр' },
      { id: 'pedi', name: 'Педикюр' },
      { id: 'brows', name: 'Брови' },
      { id: 'lash', name: 'Ресницы' },
      { id: 'epil', name: 'Эпиляция' },
      { id: 'pm', name: 'Перманент' }
    ],
    services: [
      { id: 's1', cat: 'mani', name: 'Маникюр без покрытия', time: '60 мин', price: 3500, on: true },
      { id: 's2', cat: 'mani', name: 'Маникюр + гель-лак', time: '1 ч 30 мин', price: 6000, on: true, hit: true },
      { id: 's3', cat: 'mani', name: 'Укрепление + гель-лак', time: '2 ч', price: 7000, on: true },
      { id: 's4', cat: 'mani', name: 'Наращивание ногтей', time: '2 ч 30 мин', price: 10000, on: true },
      { id: 's5', cat: 'mani', name: 'Дизайн, френч', time: '', price: 500, from: true, on: true },
      { id: 's6', cat: 'mani', name: 'Парафинотерапия рук', time: '20 мин', price: 1500, on: true },
      { id: 's7', cat: 'mani', name: 'Снятие покрытия', time: '15 мин', price: 1000, on: true },
      { id: 's8', cat: 'pedi', name: 'Педикюр без покрытия', time: '60 мин', price: 6000, on: true },
      { id: 's9', cat: 'pedi', name: 'Педикюр + гель-лак', time: '1 ч 30 мин', price: 8000, on: true, hit: true },
      { id: 's10', cat: 'pedi', name: 'Педикюр только пальчики', time: '60 мин', price: 6500, on: true },
      { id: 's11', cat: 'brows', name: 'Коррекция и окрашивание', time: '45 мин', price: 4000, on: true },
      { id: 's12', cat: 'brows', name: 'Долговременная укладка', time: '60 мин', price: 6000, on: true, hit: true },
      { id: 's13', cat: 'brows', name: 'Коррекция без окрашивания', time: '20 мин', price: 2000, on: true },
      { id: 's14', cat: 'lash', name: 'Наращивание классика', time: '2 ч', price: 7000, on: true },
      { id: 's15', cat: 'lash', name: 'Наращивание 2D', time: '2 ч 30 мин', price: 8000, on: true, hit: true },
      { id: 's16', cat: 'lash', name: 'Наращивание 3D', time: '3 ч', price: 9000, on: true },
      { id: 's17', cat: 'lash', name: 'Ламинирование ресниц', time: '60 мин', price: 6000, on: true },
      { id: 's18', cat: 'lash', name: 'Снятие ресниц', time: '20 мин', price: 1000, on: true },
      { id: 's19', cat: 'epil', name: 'Подмышки', time: '15 мин', price: 2000, on: true },
      { id: 's20', cat: 'epil', name: 'Голени', time: '30 мин', price: 4000, on: true },
      { id: 's21', cat: 'epil', name: 'Глубокое бикини', time: '40 мин', price: 6000, on: true },
      { id: 's22', cat: 'pm', name: 'Пудровые брови', time: '2 ч 30 мин', price: 25000, on: true },
      { id: 's23', cat: 'pm', name: 'Перманент губ', time: '2 ч 30 мин', price: 25000, on: true },
      { id: 's24', cat: 'pm', name: 'Межресничка', time: '2 ч', price: 20000, on: true }
    ],
    masters: [
      { id: 'm1', name: 'Полина', role: 'Мастер ногтевого сервиса', note: '«Мастер с золотыми руками и невероятным чувством вкуса» — из отзывов' },
      { id: 'm2', name: 'Гульназ', role: 'Мастер маникюра', note: 'Аккуратный маникюр, к которому возвращаются' },
      { id: 'm3', name: 'Анна', role: 'Мастер маникюра', note: '«Всё сделала как я и хотела» — из отзывов' },
      { id: 'm4', name: 'Аружан', role: 'Наращивание ресниц', note: '«Быстро и качественно, вышла в полном восторге» — из отзывов' }
    ],
    works: [
      { img: 'img/nails-close.jpg', cap: 'Маникюр с дизайном' },
      { img: 'img/brows.jpg', cap: 'Брови' },
      { img: 'img/nails-autumn.jpg', cap: 'Осенний оттенок' },
      { img: 'img/nails-red.jpg', cap: 'Классика в красном' },
      { img: 'img/nails-hand.jpg', cap: 'Нюд и френч' },
      { img: 'img/mani-process.jpg', cap: 'В процессе' }
    ],
    reviews: [
      { name: 'Милена', text: 'Брови, ресницы делаю только здесь, всегда всё на высоте. Очень приятный персонал, всегда вежливые девушки.' },
      { name: 'Наташа К.', text: 'Доброжелательный персонал, комфортная атмосфера, всегда заботятся о клиентах, предлагают напитки. Хочется возвращаться снова.' },
      { name: 'Алия М.', text: 'Спасибо мастеру Гульназ и девочкам на ресепшен за тёплую атмосферу и отличный сервис. Маникюр очень аккуратный и красивый.' },
      { name: 'Anna', text: 'Мастер по наращиванию ресниц Аружан просто прекрасная девушка! Сделала всё быстро и качественно, теперь буду ходить только к ней.' },
      { name: 'Кариша', text: 'Очень красивое место и приятные мастера.' }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function load() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) {
        var d = JSON.parse(s);
        // новые поля из шаблона, если их нет в сохранённых данных
        var def = clone(DEFAULT);
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
  function saveBookings(list) { try { localStorage.setItem(BKEY, JSON.stringify(list)); } catch (e) {} }
  function addBooking(b) { var l = bookings(); l.unshift(b); saveBookings(l); }

  function money(n) { return String(Math.round(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  window.WM = { DEFAULT: DEFAULT, load: load, save: save, reset: reset, bookings: bookings, saveBookings: saveBookings, addBooking: addBooking, money: money, esc: esc };
})();
