/* Общий слой данных для сайта и админ-панели. */
(function () {
  var KEY = 'aldimed_site_v1', BKEY = 'aldimed_bookings_v1', PKEY = 'aldimed_patient_notes_v1';
  var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
  var get = function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } };
  var set = function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } };

  var S = {
    load: function () {
      var d = get(KEY, null);
      if (d && d.version === window.ALDIMED_DEFAULT.version && d.settings) return d;
      return clone(window.ALDIMED_DEFAULT);
    },
    save: function (d) { return set(KEY, d); },
    reset: function () { try { localStorage.removeItem(KEY); } catch (e) {} },
    isCustom: function () { return !!get(KEY, null); },

    bookings: function () { return get(BKEY, []); },
    saveBookings: function (a) { return set(BKEY, a); },
    addBooking: function (b) { var a = S.bookings(); a.unshift(b); set(BKEY, a.slice(0, 500)); return b; },
    notes: function () { return get(PKEY, {}); },
    saveNotes: function (n) { return set(PKEY, n); },

    esc: function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); },
    money: function (n) { return Number(n || 0).toLocaleString('ru-RU').replace(/ |,/g, ' ') + ' ₸'; },
    digits: function (s) { return String(s || '').replace(/\D/g, ''); },
    normPhone: function (s) { var d = S.digits(s); if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1); if (d.length === 10) d = '7' + d; return d; },
    wa: function (num, text) { return 'https://wa.me/' + S.digits(num) + (text ? '?text=' + encodeURIComponent(text) : ''); },
    tel: function (p) { var d = S.digits(p); if (d.length === 10) d = '7' + d; return 'tel:+' + d; },
    uid: function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); },

    // Время в Караганде (UTC+5, без перехода на летнее время)
    now: function () { var n = new Date(); return new Date(n.getTime() + n.getTimezoneOffset() * 60000 + 5 * 3600000); },
    ymd: function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },
    mins: function (hm) { var p = String(hm).split(':'); return (+p[0]) * 60 + (+p[1] || 0); },
    status: function (hours) {
      var n = S.now(), day = n.getDay(), cur = n.getHours() * 60 + n.getMinutes(), h = hours[day];
      if (h && cur >= S.mins(h[0]) && cur < S.mins(h[1])) return { open: true, text: 'Открыто до ' + h[1] };
      if (h && cur < S.mins(h[0])) return { open: false, text: 'Откроется сегодня в ' + h[0] };
      for (var i = 1; i <= 7; i++) {
        var hh = hours[(day + i) % 7];
        if (hh) return { open: false, text: 'Откроется ' + (i === 1 ? 'завтра' : ['в воскресенье', 'в понедельник', 'во вторник', 'в среду', 'в четверг', 'в пятницу', 'в субботу'][(day + i) % 7]) + ' в ' + hh[0] };
      }
      return { open: false, text: 'Закрыто' };
    },
    hoursText: function (hours) {
      var names = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], order = [1, 2, 3, 4, 5, 6, 0], out = [], i = 0;
      while (i < order.length) {
        var d = order[i], h = hours[d], j = i;
        while (j + 1 < order.length && JSON.stringify(hours[order[j + 1]]) === JSON.stringify(h)) j++;
        out.push({ days: names[d] + (j > i ? '–' + names[order[j]] : ''), time: h ? h[0] + '–' + h[1] : 'выходной' });
        i = j + 1;
      }
      return out;
    },
    activePromos: function (d) {
      var today = S.ymd(S.now());
      return (d.promos || []).filter(function (p) { return p.on && (!p.until || p.until >= today); });
    },
    fmtDate: function (ymd) {
      if (!ymd) return '';
      var p = ymd.split('-'), m = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      return (+p[2]) + ' ' + m[+p[1] - 1];
    }
  };
  window.AStore = S;
})();
