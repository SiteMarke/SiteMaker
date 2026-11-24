/* sitemaker — аналитика (Google Analytics 4 + Яндекс Метрика).
   ▶ НАСТРОЙКА: впишите свои ID ниже и сохраните файл. Пока ID пустые — ничего не загружается и не отправляется.
     GA4:            analytics.google.com → Администратор → Потоки данных → «Идентификатор потока» вида G-XXXXXXXXXX
     Яндекс Метрика: metrika.yandex.ru → Добавить счётчик → номер счётчика (только цифры)
   Подтверждение сайта уже лежит в корне: google07f9f3bacff757d0.html (Search Console) и yandex_03bab38094ff35a4.html (Вебмастер).

   События (цели), которые отправляются автоматически:
     click_whatsapp, click_telegram, click_phone — нажатия на мессенджеры и телефон (на всех страницах)
     calc_start      — первое действие в калькуляторе
     calc_promo      — применён промокод
     calc_pdf        — скачано коммерческое предложение
     calc_send       — расчёт отправлен в WhatsApp / Telegram
     lead_submit     — отправлена заявка с сайта (главная конверсия) + generate_lead для GA4
     portfolio_open  — открыт сайт из портфолио или страница кейса
     portfolio_category, portfolio_filter — категории и фильтры портфолио
     consult_open, consult_lead — консультант: открыт / клиент перешёл к заявке
   В GA4 отметьте lead_submit и generate_lead как «Ключевые события», в Метрике создайте цели типа «JavaScript-событие» с этими именами. */
(function () {
  'use strict';
  var CFG = {
    ga4: '',   // например 'G-ABC123XYZ9'
    ym: ''     // например '98765432'
  };
  if (window.SM_ANALYTICS) { CFG.ga4 = window.SM_ANALYTICS.ga4 || CFG.ga4; CFG.ym = window.SM_ANALYTICS.ym || CFG.ym; }
  var ga = /^G-[A-Z0-9]+$/.test(CFG.ga4), ym = /^\d{5,12}$/.test(String(CFG.ym));

  function load(src) { var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); }
  if (ga) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date()); window.gtag('config', CFG.ga4);
    load('https://www.googletagmanager.com/gtag/js?id=' + CFG.ga4);
  }
  if (ym) {
    window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments); }; window.ym.l = +new Date();
    load('https://mc.yandex.ru/metrika/tag.js');
    window.ym(+CFG.ym, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
  }

  var last = {};
  window.smTrack = function (name, params) {
    params = params || {};
    var key = name + JSON.stringify(params);
    if (last[key] > Date.now() - 800) return; last[key] = Date.now();   // защита от двойных срабатываний
    params.page_lang = (document.documentElement.lang || 'ru').slice(0, 2);
    if (ga && window.gtag) {
      window.gtag('event', name, params);
      if (name === 'lead_submit') window.gtag('event', 'generate_lead', { currency: 'KZT', value: +params.value || 0 });
    }
    if (ym && window.ym) window.ym(+CFG.ym, 'reachGoal', name, params);
    if (window.SM_DEBUG) console.log('[smTrack]', name, params);
  };

  /* клики по мессенджерам, телефону и портфолио — на всех страницах */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a'); if (!a) return;
    var h = a.getAttribute('href') || '';
    var where = location.pathname;
    if (/wa\.me\/|api\.whatsapp\.com|whatsapp:\/\//.test(h)) return window.smTrack('click_whatsapp', { where: where });
    if (/^https?:\/\/t\.me\//.test(h) || a.id === 'cTg') return window.smTrack('click_telegram', { where: where });
    if (/^tel:/.test(h)) return window.smTrack('click_phone', { where: where });
    if (a.hasAttribute('data-portfolio') || /\/portfolio\/[^/]+\/$/.test(h)) return window.smTrack('portfolio_open', { item: a.getAttribute('data-portfolio') || h });
  }, true);
})();
