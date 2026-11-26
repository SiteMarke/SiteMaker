/* sitemaker — главная страница (RU и KZ).
   Подключается из /index.html и /kz/index.html. Тексты KZ — в /js/i18n-kk.js.
   SiteMaker 3.0: калькулятор с новыми опциями, КП в PDF, аналитика, защита формы от спама. */
(function () {
'use strict';
var DEF = {"rev":1,"settings":{"wa":"77476128411","tg":"Gg124255","phone":"+7 747 612 84 11","offer":{"on":true,"text":"Все доп. опции бесплатно + хостинг 3 месяца в подарок","short":"Опции бесплатно + хостинг в подарок"},"heroSub":"Сайты для бизнеса, которые приносят заявки.\nОт 6 000 ₸ · запуск от 10 часов · с админкой."},"calc":{"admin":5000,"pagePrice":500,"pagesFree":10,"terms":[{"k":1.3,"name":"10 часов","tag":"+30%"},{"k":1,"name":"стандарт","tag":"по сроку тарифа"},{"k":0.7,"name":"4–5 дней","tag":"−30%"}],"adminWhy":{"q":"Зачем нужна админка?","why":["Меняете цены, меню, фото и тексты сами с телефона — не нужно ждать разработчика и платить за каждую правку.","Все заявки и заказы в одном месте со статусами — видно, кто ещё ждёт ответа.","Отчёт за день в Excel — удобно считать выручку и заказы.","Уведомления о новых заявках в Telegram — отвечаете клиенту быстрее конкурентов."],"fit":["кафе с меняющимся меню","магазины","доставка","банкетные залы"]}},"types":[{"id":"cafe","name":"кафе и общепит","price":7000,"days":"1 день","desc":"Онлайн-меню и QR-меню, бронь столиков, карта 2GIS, заказ в WhatsApp.","hit":true,"q":"Зачем это бизнесу?","why":["Гость открывает меню с фото и ценами по QR-коду на столе или по ссылке из 2GIS и Instagram — не нужно печатать меню.","Брони и заказы на вынос приходят в WhatsApp — меньше звонков в час пик.","Цены и блюда меняете сами за минуту, когда что-то закончилось или подорожало.","Сайт находят в Google и 2GIS, когда ищут «где поесть» рядом, — это новые гости без рекламы."],"fit":["кафе","кофейни","рестораны","столовые","фастфуд"]},{"id":"land","name":"лендинг / визитка","price":6000,"days":"1–2 дня","desc":"Одна страница о вас: услуги, цены, отзывы, кнопки WhatsApp и Telegram.","q":"Зачем это бизнесу?","why":["Одна ссылка вместо долгой переписки: услуги, цены, примеры и контакты на одной странице.","Ставите ссылку в Instagram, 2GIS и WhatsApp — клиент сразу видит всё и пишет уже готовым.","Вызывает доверие: с сайтом вы выглядите серьёзнее конкурентов «только из Instagram».","Реклама ведёт на страницу с кнопкой заявки — больше обращений за те же деньги."],"fit":["мастера","салоны","частные специалисты","автосервисы","курсы"]},{"id":"bot","name":"telegram-бот заявки","price":5500,"days":"1 день","desc":"Меню и кнопки, запись или заказы, уведомления администратору 24/7.","noPages":true,"noAdmin":true,"q":"Зачем бизнесу бот?","why":["Работает 24/7 без администратора: отвечает на частые вопросы, показывает цены, принимает записи и заказы.","Заявки приходят вам в Telegram сразу с именем и телефоном — ничего не теряется в переписке.","Клиенту не нужно ничего скачивать: открыл бота и записался за минуту.","Можно делать рассылки: акции и новинки сразу всем, кто пользовался ботом."],"fit":["салоны и барберы","клиники","доставка","курсы","онлайн-школы"]},{"id":"cat","name":"каталог","price":15000,"days":"3 дня","desc":"Товары с фильтрами и поиском, заказ через WhatsApp, Instagram и 2GIS.","q":"Зачем это бизнесу?","why":["Весь ассортимент с фото и ценами — клиент выбирает сам и пишет уже готовый заказ.","Фильтры и поиск: нужное находят за секунды, а не листая сотни постов в Instagram.","Меньше одинаковых вопросов «сколько стоит?» и «есть в наличии?» — экономит часы каждый день.","Ссылку на конкретный товар удобно отправить клиенту в WhatsApp."],"fit":["магазины","мебель","косметика","запчасти","стройматериалы"]},{"id":"biz","name":"бизнес-сайт","price":17500,"days":"2 дня","desc":"Попроще: до 10 страниц, продающие тексты, форма заявки, галерея, базовое SEO. Без админ-панели — правки вношу я.","q":"Зачем это бизнесу?","why":["Полноценное лицо компании: о вас, услуги, цены, работы, отзывы и контакты — до 10 страниц.","Заявки с сайта приходят в WhatsApp или Telegram 24/7 — даже ночью и в выходные.","Вас находят в Google по запросам вроде «натяжные потолки Петропавловск» — клиенты без затрат на рекламу.","Серьёзные клиенты и партнёры проверяют компанию по сайту, прежде чем позвонить."],"fit":["услуги","строительство","производство","клиники","B2B"]},{"id":"shop","name":"интернет-магазин","price":20000,"days":"4–5 дней","desc":"Корзина и оплата Kaspi / картой, админ-панель, аналитика.","adminIn":true,"q":"Зачем это бизнесу?","why":["Продажи 24/7: клиент кладёт товары в корзину и оплачивает Kaspi или картой без вашего участия.","Админ-панель уже внутри: сами добавляете товары, меняете цены и видите заказы.","Видно, что покупают чаще и сколько заказов за день, — проще планировать закупки.","Можно продавать не только в своём городе, а по всему Казахстану с доставкой."],"fit":["одежда","косметика","техника","подарки","продукты"]},{"id":"prem","name":"премиум","price":30000,"days":"от 1 дня","desc":"Всё включено: индивидуальный дизайн, админ-панель, заказы и брони в Telegram-бот, интеграция с Frontpad, промокоды, SEO для Google.","from":true,"adminIn":true,"q":"Зачем это бизнесу?","why":["Всё уже в цене: админ-панель, заказы и брони в Telegram-бот, интеграция с Frontpad для учёта заказов, промокоды и настройка для Google — без доплат.","Уникальный дизайн под ваш бренд — сайт не похож на шаблоны конкурентов.","Интеграции: CRM, онлайн-оплата, рассылки, чат-бот — заявки и клиенты в одной системе.","Сложная логика: калькуляторы, личные кабинеты, бронирование, несколько языков.","Приоритетная поддержка и доработки — сайт растёт вместе с бизнесом."],"fit":["сети заведений","отели","клиники","застройщики","крупные компании"]}],"promo":[{"code":"PROWEB","pct":50},{"code":"SITE10","pct":10}],"cats":[{"id":"food","title":"рестораны и банкеты","desc":"Меню, бронь столов и свободные даты, калькулятор банкета, админка.","works":[{"id":"emirat","name":"Emirat","city":"Петропавловск · банкетный ресторан","desc":"Календарь свободных дат, корпоративы, заявки и уведомления в Telegram, админка с отчётом в Excel.","tags":["Бронь дат","Админка","Telegram"],"url":"https://emirat-restaunrant.github.io/Emirat/","m":"img/w/emirat-m.webp","d":"img/w/emirat-d.webp","fan":true},{"id":"sezim","name":"Sezim Family Restobar","city":"Петропавловск · семейный рестобар","desc":"Полное меню и барная карта, заказ с сайта, бронь стола, детская игровая, админка.","tags":["Меню","Заказ","Бронь"],"url":"https://sezim-restaurant.github.io/Sezim/","m":"img/w/sezim-m.webp","d":"img/w/sezim-d.webp","fan":true},{"id":"pinocchio","name":"Pinocchio","city":"Астана · lounge & resto bar","desc":"Меню и бизнес-ланч с сетами, статус «открыто сейчас», бронь стола в WhatsApp с выбором блюд, карта.","tags":["Бронь","Меню","Бизнес-ланч"],"url":"https://tamerlankajrolla2-a11y.github.io/Pinocchio-Restobar/","m":"img/w/pinocchio-m.webp","d":"img/w/pinocchio-d.webp","fan":false},{"id":"tumar","name":"Тумар","city":"Пресновка · ресторан","desc":"Тои и банкеты, обеды, выпечка, свободные даты и бронь, админка для владельца.","tags":["Банкеты","Бронь","Админка"],"url":"https://tamerlankajrolla2-a11y.github.io/TUMAR-/","m":"img/w/tumar-m.webp","d":"img/w/tumar-d.webp","fan":false},{"id":"moon","name":"The Moon","city":"Астана · restobar & karaoke","desc":"Меню, «мой стол» с подсчётом суммы, бронь столов, отзывы.","tags":["Меню","Бронь","Караоке"],"url":"https://tamerlankajrolla2-a11y.github.io/The-Moon/","m":"img/w/moon-m.webp","d":"img/w/moon-d.webp","fan":true},{"id":"jamaica","name":"Jamaica Bar","city":"Кокшетау · караоке-лаундж","desc":"Меню, VIP-комнаты, бронь столов на компанию.","tags":["Меню","Бронь","VIP"],"url":"https://tamerlankajrolla2-a11y.github.io/Jamaica/","m":"img/w/jamaica-m.webp","d":"img/w/jamaica-d.webp","fan":false},{"id":"han","name":"Han Dastarhan","city":"Актобе · банкетный кейтеринг","desc":"Банкетное меню с ценами и подбор стола под количество гостей.","tags":["Меню","Подбор стола"],"url":"https://tamerlankajrolla2-a11y.github.io/han-dastarhan/","m":"img/w/han-m.webp","d":"img/w/han-d.webp","fan":false},{"id":"petro","name":"PETRO.POVAR","city":"Петропавловск · выездной шеф-повар","desc":"Банкеты под ключ: меню, калькулятор банкета на гостя, RU/KZ.","tags":["Калькулятор","2 языка"],"url":"https://tamerlankajrolla2-a11y.github.io/RETRO-POVAR/","m":"img/w/petro-m.webp","d":"img/w/petro-d.webp","fan":false},{"id":"samal","name":"Самал","city":"Астана · выездной шеф-повар","desc":"Банкеты и фуршеты под ключ: услуги, меню, работы, отзывы и заявка на мероприятие прямо в WhatsApp.","tags":["Заявка","Услуги","WhatsApp"],"url":"https://tamerlankajrolla2-a11y.github.io/samal-chef-astana/","m":"img/w/samal-m.webp","d":"img/w/samal-d.webp","fan":false},{"id":"turan","name":"TURAN-EL","city":"Караганда · ресторан тюркских народов","desc":"Меню с фото и ценами, галерея залов, отзывы гостей и бронь стола прямо в WhatsApp.","tags":["Меню","Галерея","WhatsApp"],"url":"https://tamerlankajrolla2-a11y.github.io/Turan-El/","m":"img/w/turan-m.webp","d":"img/w/turan-d.webp","fan":false}]},{"id":"shop","title":"доставка и магазины","desc":"Корзина, акции, заказ в WhatsApp, цены и меню меняются в админке.","works":[{"id":"sushi","name":"Sensei Sushi","city":"Петропавловск · доставка суши и пиццы","desc":"Сеты, новинки, роллы, пиццы и чикен; корзина, промокоды и заказ в WhatsApp, админка с заказами.","tags":["Корзина","Промокоды","Админка"],"url":"https://tamerlankajrolla2-a11y.github.io/SUSHI/","m":"img/w/sushi-m.webp","d":"img/w/sushi-d.webp","fan":true},{"id":"chicken","name":"Chicken Hot","city":"Петропавловск · курочка, пицца, роллы","desc":"Меню с фото, корзина, доставка и акции, админка.","tags":["Доставка","Корзина"],"url":"https://tamerlankajrolla2-a11y.github.io/Chicken-Petropavlock/","m":"img/w/chicken-m.webp","d":"img/w/chicken-d.webp","fan":true},{"id":"proyxod","name":"PRO_YXOD_KZ","city":"Петропавловск · корейская косметика","desc":"Каталог с фильтрами, подбор ухода и заказ в WhatsApp.","tags":["Каталог","Фильтры"],"url":"https://tamerlankajrolla2-a11y.github.io/Pro-yxod/","m":"img/w/proyxod-m.webp","d":"img/w/proyxod-d.webp","fan":true}]},{"id":"serv","title":"услуги и отели","desc":"Калькуляторы, заявки на замер и бронь, личные кабинеты, 2–3 языка.","works":[{"id":"five","name":"FiveHotel","city":"Астана · отель","desc":"Бронирование с календарём, личный кабинет, RU/KZ/EN, тёмная тема.","tags":["Бронирование","3 языка"],"url":"https://tamerlankajrolla2-a11y.github.io/Five-Hostel/","m":"img/w/five-m.webp","d":"img/w/five-d.webp","fan":true},{"id":"ag","name":"AG проект","city":"Петропавловск · проектирование и узаконение","desc":"Услуги с ценами, заявки на консультацию, уведомления в Telegram, админка.","tags":["Услуги","Telegram"],"url":"https://tamerlankajrolla2-a11y.github.io/AG-project/","m":"img/w/ag-m.webp","d":"img/w/ag-d.webp","fan":true},{"id":"potolki","name":"PotolkiSK","city":"Петропавловск · натяжные потолки","desc":"Калькулятор площади по комнатам, заявка на замер, работы, админка.","tags":["Калькулятор","Админка"],"url":"https://potolkisk.github.io/","m":"img/w/potolki-m.webp","d":"","fan":true},{"id":"atom","name":"Хостел ATOM","city":"Астана · хостел","desc":"Калькулятор проживания, бронь и переключатель языков. Есть отзыв владельца.","tags":["Калькулятор","3 языка"],"url":"https://atom-hostel.github.io/Hostel-ATOM/","m":"img/w/atom-m.webp","d":"img/w/atom-d.webp","fan":false},{"id":"astoria","name":"Astoria Hotel","city":"Астана · гостиница","desc":"Номера, расчёт брони, услуги и отзывы, RU/KZ.","tags":["Номера","Расчёт"],"url":"https://astoria-hotel.github.io/Astoria-Hotel/","m":"img/w/astoria-m.webp","d":"img/w/astoria-d.webp","fan":false}]}],"steps":[{"t":"Заявка","d":"Пишете в WhatsApp или Telegram, что нужно. Можно просто прислать ссылку на ваш Instagram."},{"t":"Расчёт и договор","d":"Считаю цену и срок, фиксируем всё заранее. Предоплата — на Kaspi."},{"t":"Дизайн и правки","d":"Показываю первый вариант. До 5 правок — бесплатно, пока не понравится."},{"t":"Запуск","d":"Публикую сайт, подключаю заявки и админку, индексирую в Google. Остаток — после запуска."}],"faq":[{"q":"Будет ли сайт виден в Google?","a":"Да. Делаю базовую SEO-настройку и индексацию — люди находят ваш сайт в поиске Google и на картах."},{"q":"Смогу менять цены и меню сам?","a":"Да, если подключить админ-панель (+5 000 ₸): меняете цены, меню, фото и тексты с телефона, видите заявки, скачиваете отчёт в Excel, получаете уведомления в Telegram. В интернет-магазине и премиуме админка уже входит."},{"q":"Почему так недорого? Где подвох?","a":"Подвоха нет. Пишу на чистом коде по отработанным решениям и не содержу офис студии — поэтому без студийных наценок и абонплаты. Платите один раз — сайт ваш."},{"q":"Нужно ли платить за хостинг и домен?","a":"Хостинг 24/7 на первые 3 месяца — в подарок. Потом его можно продлить или перенести сайт. Свой домен (.kz или .com) — по желанию, подскажу, как купить."},{"q":"Что нужно от меня для старта?","a":"Название, контакты, список услуг или меню с ценами, фото и логотип, если есть. Срок отсчитывается с момента, когда всё это у меня."},{"q":"Работаете только с Казахстаном?","a":"Нет, работаю с клиентами из Казахстана и стран СНГ. Всё общение — в WhatsApp или Telegram."}],"review":{"on":true,"text":"Осталась довольна работой по созданию сайта. Дизайн получился аккуратным, структура — понятной и удобной. Пожелания учли, на вопросы отвечали, необходимые правки внесли. Спасибо за работу!","author":"Хостел ATOM","city":"Астана","url":"https://atom-hostel.github.io/Hostel-ATOM/"},"press":{"on":true,"title":"отзывы и реклама","items":[{"id":"p-chef-talk","type":"video","src":"img/press/chef-talk.mp4","poster":"img/press/chef-talk.webp","tag":"видео-отзыв","name":"Қайыржан · @petro.povar","who":"Выездной шеф-повар · 40 тыс. подписчиков","text":"«Делает очень красиво, креативно, всё доступно и понятно. Мне очень понравилось — всем советую. Такие сайты делает, которые даже некоторые компании не делают»","url":"https://tamerlankajrolla2-a11y.github.io/RETRO-POVAR/","hide":false},{"id":"p-chef-story","type":"video","src":"img/press/chef-story.mp4","poster":"img/press/chef-story.webp","tag":"сторис","name":"@petro.povar","who":"Показал в сторис сайт ресторана Emirat","text":"«@sitemarkertam разработал сайт для @restoran.emirat и многих других бизнесов. Если вы владелец бизнеса — однозначно рекомендую создать свой сайт»","url":"https://emirat-restaunrant.github.io/Emirat/","hide":false},{"id":"p-minikids","type":"img","src":"img/press/minikids.webp","poster":"","tag":"отзыв","name":"Mini Kids","who":"Детская одежда ручного пошива","text":"«Выполнили всё чётко и в срок. Понравилось, что понимают клиента: сразу поняли мой запрос и сделали так, как я хотела, даже лучше. Очень довольна результатом и рекомендую!»","url":"https://tamerlankajrolla2-a11y.github.io/Mini-Kids/","hide":false},{"id":"p-zhanara","type":"img","src":"img/press/zhanara.webp","poster":"","tag":"сторис","name":"Жанара","who":"Магазин корейской косметики","text":"«Чтобы онлайн-продаж было больше, я заказала сайт 😍 Всё чётко, оперативно, и цена очень приятная!»","url":"https://tamerlankajrolla2-a11y.github.io/Pro-yxod/","hide":false},{"id":"p-ag","type":"img","src":"img/press/agproject.webp","poster":"","tag":"сторис","name":"AG проект · @ag_project.kz","who":"Проектирование и узаконение, Петропавловск","text":"«Обращайтесь @sitemarkertam — быстро, красиво, по доступным ценам 🤝»","url":"https://tamerlankajrolla2-a11y.github.io/AG-project/","hide":false},{"id":"p-kaspi","type":"img","src":"img/press/kaspi.webp","poster":"","tag":"реклама","name":"Каспи находки","who":"WhatsApp-канал · 100 тыс. подписчиков","text":"Рассказали о sitemaker в статусе канала.","url":"","hide":false}]},"pv":4};
var D = DEF;
/* язык страницы: ru — по умолчанию, kk — /kz/ (тексты из js/i18n-kk.js) */
var LANG = /^kk/.test(document.documentElement.lang || '') ? 'kk' : 'ru';
var KK = LANG === 'kk' ? (window.SM_KK || {}) : {};
function L(ru, kk) { return LANG === 'kk' && kk != null ? kk : ru; }
function tr(s) { if (LANG !== 'kk' || s == null) return s; var k = String(s).replace(/\s+/g, ' ').trim(); return (KK.dict && KK.dict[k]) || s; }
function track(name, p) { try { if (window.smTrack) window.smTrack(name, p || {}); } catch (e) {} }
var $ = function (s) { return document.querySelector(s); };
var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var money = function (n) { return String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; };
var cap = function (t) { t = String(t || ''); return t.charAt(0).toUpperCase() + t.slice(1); };
function pl(n, f, k) { if (LANG === 'kk') return k || f[0]; n = Math.abs(n) % 100; var m = n % 10; return n > 10 && n < 20 ? f[2] : m === 1 ? f[0] : m >= 2 && m <= 4 ? f[1] : f[2]; }
function waUrl(t) { return 'https://wa.me/' + D.settings.wa + (t ? '?text=' + encodeURIComponent(t) : ''); }
function tgUrl() { return 'https://t.me/' + D.settings.tg; }
function telUrl() { var d = String(D.settings.phone).replace(/\D/g, ''); if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1); return 'tel:+' + d; }
function img(p) { var u = window.Store ? Store.img(p) : p; return /^img\//.test(u) ? '/' + u : u; }
var obs = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); (function (t) { setTimeout(function () { t.classList.add('done'); }, 1100); })(en.target); } }); }, { rootMargin: '0px 0px -60px 0px' }) : null;
function observe() { document.querySelectorAll('.rv:not(.in)').forEach(function (el) { if (obs) obs.observe(el); else el.classList.add('in'); }); }

/* ---------- тексты и контакты ---------- */
function renderTexts() {
  var s = D.settings, o = s.offer || {};
  $('#offer').hidden = !o.on || !o.text;
  $('#offL').textContent = tr(o.text); $('#offS').textContent = tr(o.short || o.text);
  if (s.heroSub) $('#heroSub').innerHTML = (LANG === 'kk' ? (KK.dict && KK.dict[s.heroSub.replace(/\s+/g, ' ').trim()] ? esc(KK.dict[s.heroSub.replace(/\s+/g, ' ').trim()]) : esc(s.heroSub)) : esc(s.heroSub)).replace(/\n/g, '<br>');
  document.querySelectorAll('[data-order]').forEach(function (a) { a.onclick = function (e) { e.preventDefault(); var f = $('#lead').hidden ? $('#leadOk') : $('#lead'); f.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { var n = $('#lName'); if (n && !$('#lead').hidden) n.focus({ preventScroll: true }); }, 600); }; });
  document.querySelectorAll('[data-wa]').forEach(function (a) { a.href = waUrl(a.dataset.wa); a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('[data-tg]').forEach(function (a) { a.href = tgUrl(); });
  document.querySelectorAll('[data-tel]').forEach(function (a) { a.href = telUrl(); });
  document.querySelectorAll('[data-phone]').forEach(function (a) { a.textContent = s.phone; });
  $('#pFree').textContent = L('до ' + D.calc.pagesFree + ' ' + pl(D.calc.pagesFree, ['страницы', 'страниц', 'страниц']) + ' — бесплатно', D.calc.pagesFree + ' бетке дейін — тегін');
  var r = D.review || {};
  $('#review').hidden = !r.on || !r.text;
  $('#rvText').textContent = tr(r.text) || '';
  $('#rvCite').innerHTML = '<b>' + esc(tr(r.author)) + '</b>' + (r.city ? ' · ' + esc(tr(r.city)) : '') + (r.url ? ' · <a href="' + esc(r.url) + '" target="_blank" rel="noopener">' + L('смотреть сайт ↗', 'сайтты көру ↗') + '</a>' : '');
  $('#steps').innerHTML = D.steps.map(function (st, i) { return '<div class="step rv" style="transition-delay:' + (i * .1) + 's"><div class="n">' + (i < 9 ? '0' : '') + (i + 1) + '</div><b>' + esc(tr(st.t)) + '</b><p>' + esc(tr(st.d)) + '</p></div>'; }).join('');
  $('#faqList').innerHTML = D.faq.map(function (q) { return '<details><summary>' + esc(tr(q.q)) + '</summary><p>' + esc(tr(q.a)) + '</p></details>'; }).join('');
}

/* ---------- работы ---------- */
function vis(c) { return c.works.filter(function (w) { return !w.hide; }); }
function cats() { return D.cats.filter(function (c) { return vis(c).length; }); }
function fanOf(c) {
  var ws = vis(c), f = ws.filter(function (w) { return w.fan && w.m; });
  if (f.length < 3) f = f.concat(ws.filter(function (w) { return !w.fan && w.m; }));
  f = f.slice(0, 3);
  return f.length === 3 ? [f[1], f[0], f[2]] : f.length === 2 ? [f[1], f[0], null] : [null, f[0], null];
}
var CASES = window.SM_CASES || {};
function caseUrl(w) { var k = CASES[w.id] || CASES[w.name]; return k ? (LANG === 'kk' ? '/kz' : '') + '/portfolio/' + k + '/' : ''; }
function renderWorks() {
  var C = cats(), n = C.reduce(function (a, c) { return a + vis(c).length; }, 0);
  $('#wCount').textContent = n + ' ' + pl(n, ['живой сайт', 'живых сайта', 'живых сайтов'], 'жұмыс істеп тұрған сайт');
  var stw = $('#stWorks'); if (stw) { stw.dataset.count = n; if (stw.dataset.done) stw.textContent = n + '+'; }
  $('#cats').innerHTML = C.map(function (c, i) {
    var k = vis(c).length;
    return '<button type="button" class="cat rv" data-cat="' + i + '" style="transition-delay:' + (i * .08) + 's"><div class="fan">' + fanOf(c).map(function (w) { return w ? '<img src="' + esc(img(w.m)) + '" alt="' + esc(L('Сайт ', 'Сайт: ') + w.name) + '" width="160" height="320" loading="lazy" decoding="async">' : '<img alt="" style="visibility:hidden">'; }).join('') + '</div>' +
      '<small>' + k + ' ' + pl(k, ['работа', 'работы', 'работ'], 'жұмыс') + L(' · смотреть все', ' · барлығын көру') + '</small><h3>' + esc(tr(c.title)) + '</h3><p>' + esc(tr(c.desc)) + '</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></button>';
  }).join('');
}
var dlg = $('#dlg');
function openCat(i) {
  var c = cats()[i]; if (!c) return;
  $('#dlgP').innerHTML = '<div class="top"><h3 id="dlgT">' + esc(tr(c.title)) + '</h3><button class="x" type="button" data-close aria-label="' + L('Закрыть', 'Жабу') + '">×</button></div>' +
    vis(c).map(function (w) {
      var mob = !w.d;
      var cs = caseUrl(w);
      return '<div class="work"><a class="th' + (mob ? ' m' : '') + '" href="' + esc(w.url) + '" target="_blank" rel="noopener" data-portfolio="' + esc(w.id || w.name) + '" aria-label="' + L('Открыть сайт ', 'Сайтты ашу: ') + esc(w.name) + '"><img src="' + esc(img(w.d || w.m)) + '" alt="' + L('Сайт ', 'Сайт: ') + esc(w.name) + '" loading="lazy"></a>' +
        '<div><b>' + esc(w.name) + '</b><div class="c">' + esc(tr(w.city)) + '</div><p>' + esc(tr(w.desc)) + '</p><div class="tags">' + w.tags.map(function (t) { return '<span>' + esc(tr(t)) + '</span>'; }).join('') + '</div>' +
        (w.url ? '<a class="go" href="' + esc(w.url) + '" target="_blank" rel="noopener" data-portfolio="' + esc(w.id || w.name) + '">' + L('открыть сайт ↗', 'сайтты ашу ↗') + '</a>' : '') +
        (cs ? ' <a class="go" href="' + cs + '">' + L('подробнее о проекте →', 'жоба туралы толығырақ →') + '</a>' : '') + '</div></div>';
    }).join('') +
    '<div style="margin-top:22px;display:grid;gap:8px"><a class="pill big" href="' + esc(waUrl(L('Здравствуйте! Посмотрел ваши работы («' + c.title + '») — хочу похожий сайт.', 'Сәлеметсіз бе! Жұмыстарыңызды («' + tr(c.title) + '») көрдім — осындай сайт қалаймын.'))) + '" target="_blank" rel="noopener" style="width:100%"><svg><use href="#i-wa"/></svg>' + L('Хочу такой же сайт', 'Осындай сайт қалаймын') + '</a><a class="pill big gh" href="' + L('/portfolio/', '/kz/portfolio/') + '" style="width:100%">' + L('Всё портфолио с фильтрами', 'Сүзгілері бар толық портфолио') + '</a></div>';
  dlg.classList.add('on'); document.documentElement.style.overflow = 'hidden';
  setTimeout(function () { var x = dlg.querySelector('.x'); if (x) x.focus(); }, 50);
}
function openTerms() {
  var ph = (D.settings && D.settings.phone) || '', tg = (D.settings && D.settings.tg) || '';
  if (LANG === 'kk' && KK.terms) {
    $('#dlgP').innerHTML = KK.terms(esc(ph), esc(tg));
    dlg.classList.add('on'); document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { var x = dlg.querySelector('.x'); if (x) x.focus(); }, 50);
    return;
  }
  $('#dlgP').innerHTML = '<div class="top"><h3 id="dlgT">соглашение</h3><button class="x" type="button" data-close aria-label="Закрыть">×</button></div>' +
    '<div class="terms">' +
    '<p>Это пользовательское соглашение между вами (Заказчик) и sitemaker (Исполнитель). Оставляя заявку на сайте или заказывая через WhatsApp / Telegram, вы подтверждаете, что прочитали и приняли условия ниже.</p>' +
    '<h4>1. Что вы заказываете</h4><p>Разработка сайта или Telegram-бота по выбранному в калькуляторе типу, сроку и опциям. Итоговая цена и срок фиксируются в переписке до начала работы. Расчёт на сайте — предварительный.</p>' +
    '<h4>2. Что нужно от Заказчика</h4><p>Название, контакты, услуги или меню с ценами, фото и логотип (если есть). Срок отсчитывается с момента, когда Заказчик передал все материалы. Заказчик отвечает за то, что передаёт тексты и фото, на которые у него есть права.</p>' +
    '<h4>3. Оплата</h4><ul><li>Предоплата вносится до начала работы (Kaspi), остаток — после запуска сайта.</li><li>Предоплата — это оплата начала работ: резервирование времени, дизайн и вёрстка. <b>Предоплата не возвращается.</b></li><li>Цена не меняется после согласования, если Заказчик не добавляет новые задачи.</li></ul>' +
    '<h4>4. Правки</h4><p>До 5 правок к согласованному заданию — бесплатно. Новые функции и страницы сверх согласованного оцениваются отдельно.</p>' +
    '<h4>5. Отказ и возврат денег</h4><ul><li><b>Деньги, внесённые в качестве предоплаты, не возвращаются</b>, в том числе если Заказчик отказался от заказа или сайт ему не понравился.</li><li>Если сайт не нравится, Исполнитель вносит правки в рамках п. 4 (до 5 правок бесплатно), пока результат не будет согласован.</li><li>Единственное исключение: Исполнитель по своей вине не сдал работу в согласованный срок и не приступил к исправлению — тогда стороны решают вопрос возврата по договорённости.</li></ul>' +
    '<h4>6. Хостинг, домен, права</h4><p>Хостинг на первые 3 месяца включён, далее его можно продлить или перенести сайт. После полной оплаты сайт принадлежит Заказчику. Исполнитель вправе показывать сайт в своём портфолио, если Заказчик не против.</p>' +
    '<h4>7. Персональные данные</h4><p>Имя и телефон из заявки используются только чтобы связаться с вами по заказу и не передаются третьим лицам. Данные приходят Исполнителю в Telegram и в админ-панель. Вы можете попросить удалить свои данные, написав на контакты ниже.</p>' +
    '<h4>8. Связь и споры</h4><p>Все вопросы решаются в WhatsApp или Telegram. Если договориться не удалось — по законодательству Республики Казахстан.</p>' +
    '<p style="margin-top:18px">Контакты: ' + esc(ph) + (tg ? ' · Telegram @' + esc(tg) : '') + '</p>' +
    '<div style="margin-top:22px"><button class="pill big" type="button" data-agree-ok style="width:100%">Принимаю условия</button></div></div>';
  dlg.classList.add('on'); document.documentElement.style.overflow = 'hidden';
  setTimeout(function () { var x = dlg.querySelector('.x'); if (x) x.focus(); }, 50);
}
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-terms]'); if (t) { e.preventDefault(); return openTerms(); }
  if (e.target.closest('[data-agree-ok]')) { $('#lAgree').checked = true; $('#lAgreeBox').classList.remove('bad'); closeDlg(); }
});
function needAgree() {
  if ($('#lAgree').checked) return false;
  $('#lAgreeBox').classList.add('bad');
  var m = $('#lMsg'); m.className = 'lmsg bad'; m.textContent = L('Чтобы заказать, примите пользовательское соглашение', 'Тапсырыс беру үшін пайдаланушы келісімін қабылдаңыз');
  if (!$('#lead').hidden) $('#lAgreeBox').scrollIntoView({ behavior: 'smooth', block: 'center' });
  return true;
}
$('#lAgree').addEventListener('change', function () { $('#lAgreeBox').classList.remove('bad'); });
function closeDlg() { dlg.classList.remove('on'); document.documentElement.style.overflow = ''; }
dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.closest('[data-close]')) closeDlg(); });
addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDlg(); });

/* ---------- цены ---------- */
function TYPES() { return D.types.filter(function (t) { return !t.hide; }); }
function TERMS() { return D.calc.terms; }
function whyBox(t, pickAttr, label) {
  var ask = waUrl(L('Здравствуйте! Интересует: ', 'Сәлеметсіз бе! Мені қызықтырады: ') + tr(t.name) + L('. Расскажите подробнее, как это поможет моему бизнесу.', '. Бұл бизнесіме қалай көмектесетінін толығырақ айтып беріңізші.'));
  return '<div class="wx" data-stop><div><div class="in"><h4>' + esc(tr(t.q)) + '</h4><ul>' + t.why.map(function (x) { return '<li>' + esc(tr(x)) + '</li>'; }).join('') + '</ul>' +
    (t.fit.length ? '<div class="fit">' + L('Подходит:', 'Кімге лайық:') + t.fit.map(function (x) { return '<span>' + esc(tr(x)) + '</span>'; }).join('') + '</div>' : '') +
    '<div class="ac"><button type="button" class="pill" ' + pickAttr + '>' + label + '</button><a class="pill gh" href="' + esc(ask) + '" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg>' + L('Спросить в WhatsApp', 'WhatsApp-та сұрау') + '</a></div></div></div></div>';
}
function rowHtml(t, attr, pre, price, act, label) {
  var hasWhy = t.why && t.why.length;
  return '<div class="row" ' + attr + '><b>' + esc(tr(t.name)) + (t.hit ? '<em>' + L('хит', 'хит') + '</em>' : '') + '</b><div class="d">' + esc(tr(t.desc)) +
    (hasWhy ? '<br><button type="button" class="why" data-why aria-expanded="false"><i>+</i>' + esc(tr(t.q)) + '</button>' : '') + '</div>' +
    '<span class="pr"><small>' + pre + '</small>' + money(price) + '</span><button type="button" class="or" ' + attr + '>' + act + ' <svg width="14" height="14"><use href="#i-arr"/></svg></button>' + (hasWhy ? whyBox(t, attr, label) : '') + '</div>';
}
function renderRows() {
  var aw = D.calc.adminWhy;
  $('#rows').innerHTML = TYPES().map(function (t) { return rowHtml(t, 'data-pick="' + esc(t.id) + '"', L('от', 'бастап'), t.price, L('заказать', 'тапсырыс'), (/бот/i.test(t.name) ? L('Рассчитать бота', 'Ботты есептеу') : L('Рассчитать сайт', 'Сайтты есептеу'))); }).join('') +
    (D.calc.admin ? rowHtml({ name: 'админ-панель', desc: 'Добавка к любому сайту: сами меняете цены, меню, фото и тексты, видите заявки, отчёт за день в Excel, уведомления в Telegram.', q: aw.q, why: aw.why, fit: aw.fit }, 'data-admin', '+', D.calc.admin, L('добавить', 'қосу'), L('Добавить в расчёт', 'Есептеуге қосу')) : '');
}

/* ---------- калькулятор ---------- */
var S = { type: '', term: -1, admin: false, pages: 3, promo: '', design: 'tpl', style: 'min', anim: 'std', card: false, bot: false, ads: false, domain: 'free', host: 'sm' };
function T() { var L2 = TYPES(); return L2.filter(function (t) { return t.id === S.type; })[0] || L2[0]; }
function stdTerm() { var i = -1; TERMS().forEach(function (x, j) { if (i < 0 && x.k === 1) i = j; }); return i < 0 ? 0 : i; }
function termName(t) { var x = TERMS()[S.term]; return x.k === 1 ? (tr(t.days) || tr(x.name)) : tr(x.name); }
function promoPct(code) { var p = D.promo.filter(function (x) { return x.code === code; })[0]; return p ? p.pct / 100 : 0; }

/* Новые опции (SiteMaker 3.0). Цены можно поменять здесь или в данных: calc.ext = { uniq, card, botPct, ads, hostMonth } */
function num(v, d) { return v === undefined || v === null || v === '' || isNaN(+v) ? d : +v; }
function ext() { var o = (D.calc && D.calc.ext) || {}; return { uniq: num(o.uniq, 5000), card: num(o.card, 5000), botPct: num(o.botPct, 20), ads: num(o.ads, 5000), hostMonth: num(o.hostMonth, 1000) }; }
var OPT = {
  design: [
    { id: 'tpl', n: L('На основе готового решения', 'Дайын шешім негізінде'), s: L('проверенная структура из портфолио', 'портфолиодағы тексерілген құрылым') },
    { id: 'uniq', n: L('Уникальный дизайн', 'Бірегей дизайн'), s: L('с нуля под ваш бренд', 'брендіңізге арнап нөлден') }
  ],
  style: [
    { id: 'min', n: L('минимализм', 'минимализм') }, { id: 'dark', n: L('тёмный премиум', 'қараңғы премиум') }, { id: 'bright', n: L('яркий', 'ашық-жарқын') },
    { id: 'nat', n: L('национальный', 'ұлттық') }, { id: 'corp', n: L('строгий корпоративный', 'қатаң корпоративтік') }
  ],
  anim: [
    { id: 'calm', n: L('спокойные', 'жайлы'), s: L('только плавные появления', 'тек біркелкі пайда болу') },
    { id: 'std', n: L('стандарт', 'стандарт'), s: L('эффекты при прокрутке', 'айналдырғандағы әсерлер') },
    { id: 'max', n: L('максимум', 'максимум'), s: L('3D, частицы, параллакс', '3D, бөлшектер, параллакс') }
  ],
  domain: [
    { id: 'free', n: L('Бесплатный адрес', 'Тегін мекенжай'), s: L('вида имя.github.io', 'атауы.github.io түрінде') },
    { id: 'com', n: L('Новый домен .com', 'Жаңа .com домені'), s: L('помогу купить и подключу', 'сатып алуға көмектесіп, қосып беремін') },
    { id: 'kz', n: L('Новый домен .kz', 'Жаңа .kz домені'), s: L('нужен хостинг в Казахстане', 'Қазақстандағы хостинг қажет') },
    { id: 'own', n: L('У меня уже есть домен', 'Менде домен бар'), s: L('подключу к сайту', 'сайтқа қосып беремін') }
  ],
  host: [
    { id: 'sm', n: L('Хостинг sitemaker', 'sitemaker хостингі'), s: '' },
    { id: 'own', n: L('Свой хостинг', 'Өз хостингім'), s: L('передам файлы сайта', 'сайт файлдарын беремін') }
  ]
};
function optName(k, id) { var o = OPT[k].filter(function (x) { return x.id === id; })[0]; return o ? o.n : id; }
function botType() { return TYPES().filter(function (x) { return x.id === 'bot'; })[0] || TYPES().filter(function (x) { return x.noPages && x.noAdmin; })[0]; }
function isBot(t) { return !!(t && t.noPages && t.noAdmin); }
function designIn(t) { return t.id === 'prem'; }
function cardIn(t) { return t.id === 'shop' || t.id === 'prem'; }
function botPkg() { var b = botType(); if (!b) return { price: 0, full: 0 }; return { price: Math.round(b.price * (1 - ext().botPct / 100) / 100) * 100, full: b.price }; }
function gift() { return !!(D.settings.offer && D.settings.offer.on); }

function calc() {
  var t = T(), base = t.price, pagesExtra = t.noPages ? 0 : Math.max(0, S.pages - D.calc.pagesFree) * D.calc.pagePrice;
  var adm = (!t.noAdmin && !t.adminIn && S.admin) ? D.calc.admin : 0, k = TERMS()[S.term].k;
  var X = ext(), bot = isBot(t);
  var design = (!bot && S.design === 'uniq' && !designIn(t)) ? X.uniq : 0;
  var card = (!bot && S.card && !cardIn(t)) ? X.card : 0;
  var botP = (!bot && S.bot) ? botPkg().price : 0;
  var ads = S.ads ? X.ads : 0;
  var extra = design + card + botP + ads;
  var sub = (base + pagesExtra) * k + adm + extra, d = promoPct(S.promo), total = Math.round(sub * (1 - d) / 100) * 100;
  return { t: t, base: base, pagesExtra: pagesExtra, adm: adm, k: k, design: design, card: card, botP: botP, ads: ads, extra: extra, sub: sub, d: d, total: total, bot: bot };
}
function segHtml(key, list, cur, priceOf) {
  return list.map(function (x) {
    var p = priceOf ? priceOf(x) : '';
    return '<button type="button" data-opt="' + key + '" data-v="' + x.id + '" aria-pressed="' + (x.id === cur) + '">' + esc(/^sitemaker/.test(x.n) ? x.n : cap(x.n)) + (x.s || p ? '<small>' + esc(p || x.s) + '</small>' : '') + '</button>';
  }).join('');
}
function recurring(r) {
  var X = ext(), out = [];
  if (S.host === 'sm') out.push([L('Хостинг', 'Хостинг'), (gift() ? L('3 мес. в подарок, далее от ', '3 ай сыйлық, кейін ') : L('от ', '')) + money(X.hostMonth) + L('/мес', '/ай') + (gift() ? '' : '')]);
  else out.push([L('Хостинг', 'Хостинг'), L('ваш, по тарифу хостинга', 'өзіңіздікі, хостинг тарифі бойынша')]);
  if (S.domain === 'com' || S.domain === 'kz') out.push([L('Домен', 'Домен'), L('оплата регистратору, раз в год', 'тіркеушіге төлем, жылына бір рет')]);
  return out;
}
function paintCalc() {
  if (!TYPES().length) return;
  if (!T() || T().id !== S.type) S.type = T().id;
  if (!TERMS()[S.term]) S.term = stdTerm();
  if (S.promo && !promoPct(S.promo)) S.promo = '';
  var r = calc(), t = r.t, X = ext(), bp = botPkg();
  $('#cType').innerHTML = TYPES().map(function (x) { return '<button type="button" data-type="' + esc(x.id) + '" aria-pressed="' + (x.id === S.type) + '">' + esc(cap(tr(x.name))) + '<small>' + (x.from ? L('от ', '') : '') + money(x.price) + (x.from ? L('', '-ден') : '') + '</small></button>'; }).join('');
  $('#cTerm').innerHTML = TERMS().map(function (x, i) { return '<button type="button" data-term="' + i + '" aria-pressed="' + (i === S.term) + '">' + esc(x.k === 1 ? (tr(t.days) || tr(x.name)) : tr(x.name)) + '<small>' + esc(tr(x.tag)) + '</small></button>'; }).join('');
  var admBtn = $('#cAdm'), noAdm = !!t.noAdmin || !D.calc.admin;
  admBtn.hidden = noAdm; admBtn.previousElementSibling.hidden = noAdm;
  admBtn.setAttribute('aria-pressed', String(!!(t.adminIn || S.admin)));
  admBtn.disabled = !!t.adminIn;
  $('#cAdmP').textContent = t.adminIn ? L('входит', 'кіреді') : '+' + money(D.calc.admin);
  $('#pagesBox').hidden = !!t.noPages;
  $('#cPages').textContent = S.pages;
  $('#cPagesN').textContent = S.pages <= D.calc.pagesFree ? L('до ' + D.calc.pagesFree + ' страниц — бесплатно', D.calc.pagesFree + ' бетке дейін — тегін') : '+' + money((S.pages - D.calc.pagesFree) * D.calc.pagePrice) + L(' за страницы сверх ' + D.calc.pagesFree, ' — ' + D.calc.pagesFree + ' беттен асқаны үшін');
  /* новые блоки */
  $('#xSite').hidden = r.bot;
  $('#cDesign').innerHTML = segHtml('design', OPT.design, S.design, function (x) { return x.id === 'uniq' ? (designIn(t) ? L('входит в тариф', 'тарифке кіреді') : '+' + money(X.uniq)) : L('по цене тарифа', 'тариф бағасымен'); });
  $('#cStyle').innerHTML = segHtml('style', OPT.style, S.style);
  $('#cAnim').innerHTML = segHtml('anim', OPT.anim, S.anim);
  var cb = $('#cCard'); cb.setAttribute('aria-pressed', String(!!(cardIn(t) || S.card))); cb.disabled = cardIn(t);
  $('#cCardP').textContent = cardIn(t) ? L('входит', 'кіреді') : '+' + money(X.card);
  var bb = $('#cBot'); bb.hidden = r.bot || !bp.full; bb.setAttribute('aria-pressed', String(!!S.bot));
  $('#cBotP').innerHTML = '+' + money(bp.price) + (bp.full > bp.price ? '<s>' + money(bp.full) + '</s>' : '');
  $('#cAds').setAttribute('aria-pressed', String(!!S.ads)); $('#cAdsP').textContent = '+' + money(X.ads);
  $('#cDomain').innerHTML = segHtml('domain', OPT.domain, S.domain);
  $('#cHost').innerHTML = segHtml('host', OPT.host, S.host, function (x) { return x.id === 'sm' ? (gift() ? L('3 мес. в подарок, далее от ', '3 ай сыйлық, кейін ') + money(X.hostMonth) + L('/мес', '/ай') : L('от ', '') + money(X.hostMonth) + L('/мес', '/ай')) : ''; });
  $('#cDomNote').hidden = S.domain !== 'kz';
  /* строки расчёта */
  var Ls = '<div><span>' + esc(cap(tr(t.name))) + '</span><span>' + (t.from ? L('от ', '') : '') + money(r.base) + (t.from ? L('', '-ден') : '') + '</span></div>';
  if (r.pagesExtra) Ls += '<div><span>' + L('Страницы сверх ' + D.calc.pagesFree, D.calc.pagesFree + ' беттен асқаны') + '</span><span>+' + money(r.pagesExtra) + '</span></div>';
  if (r.k !== 1) Ls += '<div><span>' + L('Срок ', 'Мерзім: ') + esc(tr(TERMS()[S.term].name)) + '</span><span>' + esc(tr(TERMS()[S.term].tag)) + '</span></div>';
  if (t.adminIn) Ls += '<div><span>' + L('Админ-панель', 'Әкімшілік панель') + '</span><span>' + L('входит', 'кіреді') + '</span></div>'; else if (r.adm) Ls += '<div><span>' + L('Админ-панель', 'Әкімшілік панель') + '</span><span>+' + money(r.adm) + '</span></div>';
  if (r.design) Ls += '<div><span>' + L('Уникальный дизайн', 'Бірегей дизайн') + '</span><span>+' + money(r.design) + '</span></div>';
  if (r.card) Ls += '<div><span>' + L('Онлайн-оплата картой', 'Картамен онлайн төлем') + '</span><span>+' + money(r.card) + '</span></div>';
  if (r.botP) Ls += '<div><span>' + L('Пакет: + Telegram-бот', 'Пакет: + Telegram-бот') + '</span><span>+' + money(r.botP) + '</span></div>';
  if (r.ads) Ls += '<div><span>' + L('Пакет: + настройка рекламы', 'Пакет: + жарнаманы баптау') + '</span><span>+' + money(r.ads) + '</span></div>';
  if (gift()) Ls += '<div><span>' + L('Доп. опции и хостинг 3 мес.', 'Қосымша опциялар және 3 ай хостинг') + '</span><span>' + L('в подарок', 'сыйлыққа') + '</span></div>';
  if (r.d) Ls += '<div class="disc"><span>' + L('Промокод ', 'Промокод ') + esc(S.promo) + '</span><span>−' + Math.round(r.d * 100) + '%</span></div>';
  $('#cLines').innerHTML = Ls;
  $('#cTotal').textContent = (t.from ? L('от ', '') : '') + money(r.total) + (t.from ? L('', '-ден') : '');
  $('#cOld').textContent = r.d ? money(Math.round(r.sub / 100) * 100) : '';
  $('#cDays').textContent = L('Срок: ', 'Мерзімі: ') + termName(t) + L('. Предоплата на Kaspi, остаток — после запуска.', '. Алдын ала төлем Kaspi арқылы, қалғаны — іске қосылғаннан кейін.');
  $('#cRec').innerHTML = recurring(r).map(function (x) { return '<div><span>' + esc(x[0]) + '</span><span>' + esc(x[1]) + '</span></div>'; }).join('');
  var bar = $('#cBarT'); if (bar) bar.textContent = $('#cTotal').textContent;
  var msg = L('Здравствуйте! Хочу заказать сайт.', 'Сәлеметсіз бе! Сайтқа тапсырыс бергім келеді.') + '\n\n' + plan(r).text + '\n\n✅ ' + L('С пользовательским соглашением согласен', 'Пайдаланушы келісімімен келісемін');
  $('#cWa').href = waUrl(msg);
  $('#cTg').href = tgUrl();
  $('#cTg').dataset.text = msg;
}
function plan(r) {
  var t = r.t, Lx = [L('Тип: ', 'Түрі: ') + tr(t.name).trim(), L('Срок: ', 'Мерзімі: ') + termName(t)];
  if (!t.noPages) Lx.push(L('Страниц: ', 'Беттер: ') + S.pages);
  if (!t.noAdmin && D.calc.admin) Lx.push(L('Админ-панель: ', 'Әкімшілік панель: ') + (t.adminIn ? L('входит', 'кіреді') : S.admin ? L('да', 'иә') : L('нет', 'жоқ')));
  if (!r.bot) {
    Lx.push(L('Дизайн: ', 'Дизайн: ') + optName('design', S.design) + (S.design === 'uniq' && designIn(t) ? L(' (входит)', ' (кіреді)') : ''));
    Lx.push(L('Стиль: ', 'Стиль: ') + optName('style', S.style));
    Lx.push(L('Анимации: ', 'Анимациялар: ') + optName('anim', S.anim));
    Lx.push(L('Оплата на сайте: ', 'Сайттағы төлем: ') + (cardIn(t) || S.card ? L('Kaspi + онлайн-оплата картой', 'Kaspi + картамен онлайн төлем') : L('Kaspi-перевод / QR', 'Kaspi аударым / QR')));
    if (S.bot) Lx.push(L('Пакет: + Telegram-бот', 'Пакет: + Telegram-бот'));
  }
  if (S.ads) Lx.push(L('Пакет: + настройка рекламы', 'Пакет: + жарнаманы баптау'));
  Lx.push(L('Домен: ', 'Домен: ') + optName('domain', S.domain));
  Lx.push(L('Хостинг: ', 'Хостинг: ') + optName('host', S.host));
  if (r.d) Lx.push(L('Промокод: ', 'Промокод: ') + S.promo);
  Lx.push(L('Итого по калькулятору: ', 'Калькулятор бойынша барлығы: ') + (t.from ? L('от ', '') : '') + money(r.total) + (t.from ? L('', '-ден') : ''));
  return { text: Lx.join('\n'), data: { id: t.id, name: t.name, term: termName(t), pages: t.noPages ? null : S.pages, admin: t.noAdmin ? null : (t.adminIn ? 'входит' : S.admin), promo: r.d ? S.promo : '', total: r.total, from: !!t.from,
    design: r.bot ? null : S.design, style: r.bot ? null : S.style, anim: r.bot ? null : S.anim, card: r.bot ? null : !!(cardIn(t) || S.card), bot: !!S.bot && !r.bot, ads: !!S.ads, domain: S.domain, host: S.host, lang: LANG } };
}
function applyPromo() {
  var v = $('#cPromo').value.trim().toUpperCase(), m = $('#cPromoMsg');
  if (!v) { S.promo = ''; m.className = 'msg'; m.textContent = ''; return paintCalc(); }
  if (promoPct(v)) { S.promo = v; m.className = 'msg ok'; m.textContent = L('Промокод применён: −', 'Промокод қолданылды: −') + Math.round(promoPct(v) * 100) + '%'; track('calc_promo', { code: v }); }
  else { S.promo = ''; m.className = 'msg bad'; m.textContent = L('Такого промокода нет', 'Мұндай промокод жоқ'); }
  paintCalc();
}
$('#cPromoBtn').addEventListener('click', applyPromo);
$('#cPromo').addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); applyPromo(); } });

/* коммерческое предложение (PDF через печать браузера — без тяжёлых библиотек) */
function kpHtml() {
  var r = calc(), t = r.t, p = plan(r), now = new Date(), name = ($('#lName') && $('#lName').value.trim()) || '';
  var no = 'SM-' + now.getFullYear() + String(now.getMonth() + 1).padStart(2, '0') + String(now.getDate()).padStart(2, '0') + '-' + String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
  var date = now.toLocaleDateString(LANG === 'kk' ? 'kk-KZ' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  var rows = $('#cLines').innerHTML, rec = $('#cRec').innerHTML;
  var opts = p.text.split('\n').slice(0, -1).map(function (x) { var i = x.indexOf(': '); return '<tr><td>' + esc(x.slice(0, i)) + '</td><td>' + esc(x.slice(i + 2)) + '</td></tr>'; }).join('');
  var s = D.settings;
  return '<!DOCTYPE html><html lang="' + (LANG === 'kk' ? 'kk' : 'ru') + '"><head><meta charset="utf-8"><title>' + L('Коммерческое предложение', 'Коммерциялық ұсыныс') + ' ' + no + ' — sitemaker</title>' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><style>@page{size:A4;margin:16mm}*{box-sizing:border-box}body{font:14px/1.55 Manrope,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;color:#141418;margin:0;padding:24px;max-width:820px;margin:0 auto}' +
    'h1{font:800 26px/1.1 Unbounded,"Arial Black",Arial,sans-serif;letter-spacing:-.02em;margin:26px 0 4px}h2{font:700 15px/1.2 Unbounded,Arial,sans-serif;margin:26px 0 10px}.top{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #141418;padding-bottom:12px}' +
    '.logo{font:700 18px Unbounded,Arial,sans-serif}.mut{color:#6b6a72;font-size:12.5px}table{width:100%;border-collapse:collapse}td{padding:7px 0;border-bottom:1px solid #e6e3dd;vertical-align:top}td:last-child{text-align:right;font-weight:600}' +
    '.lines div{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid #e6e3dd}.lines div span:last-child{font-weight:600;text-align:right}.tot{display:flex;justify-content:space-between;align-items:baseline;margin-top:14px;padding:14px 16px;background:#f2ebdf;border-radius:12px}' +
    '.tot b{font:800 28px Unbounded,Arial,sans-serif}ul{padding-left:18px;margin:6px 0}.btn{display:inline-block;margin:18px 8px 0 0;padding:10px 18px;border-radius:99px;background:#141418;color:#fff;text-decoration:none;font-weight:700;border:0;font-size:14px;cursor:pointer}@media print{.np{display:none}body{padding:0}}</style></head><body>' +
    '<div class="np" style="background:#fff8e6;border:1px solid #f0dca8;border-radius:12px;padding:12px 14px;margin-bottom:16px">' + L('Чтобы сохранить PDF: «Печать» → «Сохранить как PDF».', 'PDF сақтау үшін: «Басып шығару» → «PDF ретінде сақтау».') + ' <button class="btn" onclick="print()">' + L('Сохранить PDF', 'PDF сақтау') + '</button></div>' +
    '<div class="top"><span class="logo">sitemaker</span><span class="mut">sitemakerkz.com · ' + esc(s.phone) + (s.tg ? ' · Telegram @' + esc(s.tg) : '') + '</span></div>' +
    '<h1>' + L('Коммерческое предложение', 'Коммерциялық ұсыныс') + '</h1><div class="mut">№ ' + no + ' · ' + esc(date) + (name ? ' · ' + L('для: ', 'кімге: ') + esc(name) : '') + '</div>' +
    '<h2>' + L('Что входит в проект', 'Жобаға не кіреді') + '</h2><table>' + opts + '</table>' +
    '<h2>' + L('Стоимость', 'Құны') + '</h2><div class="lines">' + rows + '</div>' +
    '<div class="tot"><span>' + L('Итого, разово', 'Барлығы, бір рет') + '</span><b>' + esc($('#cTotal').textContent) + '</b></div>' +
    (rec ? '<h2>' + L('Регулярные платежи', 'Тұрақты төлемдер') + '</h2><div class="lines">' + rec + '</div>' : '') +
    '<h2>' + L('Условия', 'Шарттар') + '</h2><ul><li>' + L('Срок: ', 'Мерзімі: ') + esc(termName(t)) + L(', отсчитывается с момента получения материалов.', ', материалдар алынған сәттен бастап есептеледі.') + '</li>' +
    '<li>' + L('Предоплата на Kaspi, остаток — после запуска. Предоплата не возвращается.', 'Алдын ала төлем Kaspi арқылы, қалғаны — іске қосылғаннан кейін. Алдын ала төлем қайтарылмайды.') + '</li>' +
    '<li>' + L('До 5 правок к согласованному заданию — бесплатно, поддержка 30 дней после запуска.', 'Келісілген тапсырмаға 5 түзетуге дейін — тегін, іске қосылғаннан кейін 30 күн қолдау.') + '</li>' +
    '<li>' + L('Расчёт предварительный: итоговая цена и срок фиксируются в переписке до начала работы.', 'Есеп алдын ала: соңғы баға мен мерзім жұмыс басталғанға дейін хат алмасуда бекітіледі.') + '</li></ul>' +
    '<p class="mut" style="margin-top:22px">' + L('Портфолио: sitemakerkz.com/portfolio/ · Заказать: WhatsApp ', 'Портфолио: sitemakerkz.com/portfolio/ · Тапсырыс: WhatsApp ') + esc(s.phone) + '</p>' +
    '<script>setTimeout(function(){try{print()}catch(e){}},400)<\/script></body></html>';
}
function openKP() {
  track('calc_pdf', { type: T().id, value: calc().total });
  var html = kpHtml(), w = null;
  try { w = window.open('', '_blank'); } catch (e) {}
  if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); return; }
  var f = document.createElement('iframe'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0'; document.body.appendChild(f);
  f.contentDocument.open(); f.contentDocument.write(html.replace('setTimeout(function(){try{print()}catch(e){}},400)', '')); f.contentDocument.close();
  setTimeout(function () { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(function () { f.remove(); }, 60000); }, 400);
}
$('#cKp').addEventListener('click', openKP);

/* мобильная плашка с итогом */
(function () {
  var bar = $('#cBar'), sum = $('.sum'), calcEl = $('#calc'); if (!bar || !('IntersectionObserver' in window)) return;
  var inCalc = false, sumVis = false;
  function upd() { var on = inCalc && !sumVis; bar.classList.toggle('on', on); document.body.classList.toggle('cbar-on', on); }
  new IntersectionObserver(function (es) { inCalc = es[0].isIntersecting; upd(); }, { rootMargin: '-40% 0px -40% 0px' }).observe(calcEl);
  new IntersectionObserver(function (es) { sumVis = es[0].isIntersecting; upd(); }, { threshold: 0.05 }).observe($('#cTotal'));
  bar.querySelector('button').addEventListener('click', function () { $('#cTotal').scrollIntoView({ behavior: 'smooth', block: 'center' }); });
})();

var toastT;
function toast(t) { var el = $('#toast'); if (!el) return; el.textContent = t; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 3200); }

/* ?type=cafe&admin=1 — выбор тарифа по ссылке (со страниц услуг и из консультанта) */
(function () {
  try {
    var q = new URLSearchParams(location.search);
    if (q.get('type')) S.type = q.get('type');
    if (q.get('admin') === '1') S.admin = true;
    if (q.get('design') === 'uniq') S.design = 'uniq';
    if (q.get('bot') === '1') S.bot = true;
    if (q.get('ads') === '1') S.ads = true;
  } catch (e) {}
})();

/* заявка с сайта → админка + Telegram */
var sent = {};
function logClick(via) {
  if (!window.Store || sent[via] > Date.now() - 60000) return;
  sent[via] = Date.now();
  var p = plan(calc());
  Store.createOrder({ kind: 'lead', via: via, comment: (LANG === 'kk' ? '[KZ] ' : '') + p.text, plan: p.data, total: p.data.total });
}
$('#cWa').addEventListener('click', function (e) { if (needAgree()) return e.preventDefault(); logClick('wa'); track('calc_send', { via: 'whatsapp', value: calc().total }); });
$('#cTg').addEventListener('click', function (e) {
  if (needAgree()) return e.preventDefault();
  var txt = this.dataset.text || '';
  try { navigator.clipboard.writeText(txt).then(function () { toast(L('Расчёт скопирован — вставьте его в чат Telegram', 'Есеп көшірілді — оны Telegram чатына қойыңыз')); }, function () {}); } catch (e2) {}
  logClick('tg'); track('calc_send', { via: 'telegram', value: calc().total });
});
function fmtPhone(v) {
  var d = v.replace(/\D/g, ''); if (d[0] === '8') d = '7' + d.slice(1); if (d && d[0] !== '7') d = '7' + d; d = d.slice(0, 11);
  var o = '+7'; if (d.length > 1) o += ' ' + d.slice(1, 4); if (d.length > 4) o += ' ' + d.slice(4, 7); if (d.length > 7) o += ' ' + d.slice(7, 9); if (d.length > 9) o += ' ' + d.slice(9, 11);
  return d ? o : '';
}
$('#lPhone').addEventListener('input', function () { var a = this.value; this.value = fmtPhone(a); this.classList.remove('bad'); });
$('#lName').addEventListener('input', function () { this.classList.remove('bad'); });
/* защита от спама: скрытое поле-ловушка, минимальное время заполнения и не чаще одной заявки в минуту */
var T_OPEN = Date.now();
function lastSent(v) { try { if (v) localStorage.setItem('sm_lead_at', String(v)); return +localStorage.getItem('sm_lead_at') || 0; } catch (e) { return 0; } }
$('#lead').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = $('#lName').value.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim(), ph = $('#lPhone').value, digits = ph.replace(/\D/g, ''), m = $('#lMsg'), b = $('#lBtn');
  var okName = name.length >= 2 && /[a-zа-яёәіңғүұқөһ]/i.test(name);
  $('#lName').classList.toggle('bad', !okName); $('#lPhone').classList.toggle('bad', digits.length !== 11);
  if (!okName || digits.length !== 11) { m.className = 'lmsg bad'; m.textContent = !okName ? L('Напишите, как к вам обращаться', 'Сізге қалай жүгінуге болатынын жазыңыз') : L('Проверьте номер телефона', 'Телефон нөмірін тексеріңіз'); return; }
  if (needAgree()) return;
  var hp = $('#lSite');
  if ((hp && hp.value) || Date.now() - T_OPEN < 3000) { $('#lead').hidden = true; $('#leadOk').hidden = false; return; }
  if (Date.now() - lastSent() < 60000) { m.className = 'lmsg bad'; m.textContent = L('Заявка уже отправлена — я скоро свяжусь с вами.', 'Өтінім жіберілді — жақында хабарласамын.'); return; }
  b.disabled = true; b.textContent = L('Отправляю…', 'Жіберілуде…');
  var p = plan(calc());
  var done = function (r) {
    b.disabled = false; b.textContent = L('Заказать сайт', 'Сайтқа тапсырыс беру');
    if (!r) { m.className = 'lmsg bad'; m.innerHTML = L('Не получилось отправить. Напишите, пожалуйста, в ', 'Жіберу мүмкін болмады. Өтінеміз, ') + '<a href="' + esc(waUrl(L('Здравствуйте! Хочу заказать сайт.', 'Сәлеметсіз бе! Сайтқа тапсырыс бергім келеді.') + '\n\n' + p.text)) + '" target="_blank" rel="noopener" style="text-decoration:underline">WhatsApp</a>' + L('.', '-қа жазыңыз.'); return; }
    lastSent(Date.now());
    track('lead_submit', { via: 'site', type: p.data.id, value: p.data.total, currency: 'KZT' });
    $('#lead').hidden = true; $('#leadOk').hidden = false;
    $('#okT').textContent = L('Заявка' + (r.id ? ' №' + r.id : '') + ' отправлена, ' + name + '!', name + ', өтінім' + (r.id ? ' №' + r.id : '') + ' жіберілді!');
  };
  if (!window.Store) return done(false);
  var agreedAt = new Date().toISOString(), agreedTxt = '\n\n✅ Пользователь принял пользовательское соглашение (в т.ч. предоплата не возвращается) — ' + new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  Store.createOrder({ kind: 'lead', via: 'site', name: name, phone: ph, comment: (LANG === 'kk' ? '[KZ] ' : '') + p.text + agreedTxt, plan: p.data, total: p.data.total, agreed: true, agreed_at: agreedAt }).then(done);
});

/* ---------- клики ---------- */
var calcUsed = false;
function usedCalc() { if (calcUsed) return; calcUsed = true; track('calc_start', { type: S.type }); }
document.addEventListener('click', function (e) {
  var t = e.target.closest('[data-why],[data-stop],[data-cat],[data-pick],[data-admin],[data-type],[data-term],[data-pg],[data-opt],#cAdm,#cCard,#cBot,#cAds');
  if (!t) return;
  if (t.hasAttribute('data-stop')) return;
  if (t.hasAttribute('data-why')) { var row = t.closest('.row'), on = !row.classList.contains('open'); row.classList.toggle('open', on); t.setAttribute('aria-expanded', String(on)); return; }
  if (t.dataset.cat) { track('portfolio_category', { category: t.dataset.cat }); return openCat(+t.dataset.cat); }
  usedCalc();
  if (t.dataset.pick) { S.type = t.dataset.pick; paintCalc(); return $('#calc').scrollIntoView({ behavior: 'smooth' }); }
  if (t.hasAttribute('data-admin')) { if (T().noAdmin) S.type = (TYPES().filter(function (x) { return !x.noAdmin; })[0] || T()).id; S.admin = true; paintCalc(); return $('#calc').scrollIntoView({ behavior: 'smooth' }); }
  if (t.dataset.type) { S.type = t.dataset.type; return paintCalc(); }
  if (t.dataset.term) { S.term = +t.dataset.term; return paintCalc(); }
  if (t.dataset.pg) { S.pages = Math.max(1, Math.min(60, S.pages + (+t.dataset.pg))); return paintCalc(); }
  if (t.dataset.opt) { S[t.dataset.opt] = t.dataset.v; return paintCalc(); }
  if (t.id === 'cAdm') { S.admin = !S.admin; return paintCalc(); }
  if (t.id === 'cCard') { S.card = !S.card; return paintCalc(); }
  if (t.id === 'cBot') { S.bot = !S.bot; return paintCalc(); }
  if (t.id === 'cAds') { S.ads = !S.ads; return paintCalc(); }
});

/* для консультанта: выбрать тариф и показать калькулятор */
window.SM = {
  lang: LANG, money: money, waUrl: waUrl, tgUrl: tgUrl, tr: tr,
  data: function () { return D; },
  types: function () { return TYPES(); },
  pick: function (id, opts) { if (id) S.type = id; if (opts) Object.keys(opts).forEach(function (k) { S[k] = opts[k]; }); usedCalc(); paintCalc(); $('#calc').scrollIntoView({ behavior: 'smooth' }); },
  total: function () { return calc().total; }
};


/* ---------- отзывы и реклама ---------- */
function renderPress() {
  var P = D.press || {}, it = (P.items || []).filter(function (x) { return !x.hide && x.src; });
  $('#press').hidden = !P.on || !it.length;
  $('#prT').textContent = tr(P.title || 'отзывы и реклама');
  $('#prList').setAttribute('data-n', it.length);
  $('#prList').innerHTML = it.map(function (x, i) {
    var v = x.type === 'video';
    return '<article class="pc rv" style="transition-delay:' + (i * .06) + 's"><div class="pm" data-pm="' + (v ? 'v' : 'i') + '">' +
      (v ? '<video preload="none" playsinline' + (x.poster ? ' poster="' + esc(img(x.poster)) + '"' : '') + ' src="' + esc(img(x.src)) + '"></video><span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>'
        : '<img src="' + esc(img(x.src)) + '" alt="' + esc(x.name) + '" loading="lazy" decoding="async">') +
      (x.tag ? '<span class="tg">' + esc(tr(x.tag)) + '</span>' : '') + '</div>' +
      '<div class="pb"><b>' + esc(x.name) + '</b>' + (x.who ? '<small>' + esc(tr(x.who)) + '</small>' : '') + (x.text ? '<p>' + esc(tr(x.text)) + '</p>' : '') +
      (x.url ? '<a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + L('смотреть сайт ↗', 'сайтты көру ↗') + '</a>' : '') + '</div></article>';
  }).join('');
}
document.addEventListener('click', function (e) {
  var pm = e.target.closest && e.target.closest('.pm');
  if (pm) {
    if (pm.dataset.pm === 'v') {
      var v = pm.querySelector('video'); if (e.target === v && v.controls) return;
      document.querySelectorAll('.pm video').forEach(function (o) { if (o !== v && !o.paused) o.pause(); });
      if (v.paused) { v.controls = true; pm.classList.add('on'); v.play().catch(function () {}); } else v.pause();
    } else { var lb = $('#plb'); lb.querySelector('img').src = pm.querySelector('img').src; lb.hidden = false; }
    return;
  }
  if (e.target.closest && e.target.closest('#plb')) $('#plb').hidden = true;
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('#plb')) $('#plb').hidden = true; });
function renderAll() { renderTexts(); renderWorks(); renderRows(); renderPress(); paintCalc(); observe(); }
renderAll();
if (window.Store) Store.load().then(function (d) { if (d && JSON.stringify(d) !== JSON.stringify(D)) { D = d; renderAll(); } }).catch(function () {});
var nav = $('#nav');
(function () {
  var b = document.querySelector('.burger'), m = $('#mnav'); if (!b || !m) return;
  function set(on) { m.hidden = !on; b.setAttribute('aria-expanded', String(on)); nav.classList.toggle('open', on); }
  b.addEventListener('click', function () { set(m.hidden); });
  m.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
})();
addEventListener('scroll', function () { nav.classList.toggle('sc', scrollY > 30); }, { passive: true });
$('#yr').textContent = new Date().getFullYear();

/* ================= анимации ================= */
var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
var small = matchMedia('(max-width: 700px)').matches;
var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
var DPR = Math.min(window.devicePixelRatio || 1, small ? 2 : 1.5);

/* скорость прокрутки — разгоняет цветы и бегущую строку */
var sv = 0, lastSY = scrollY, rawSV = 0;
addEventListener('scroll', function () { rawSV += scrollY - lastSY; lastSY = scrollY; }, { passive: true });
function tickScroll() { sv += (rawSV - sv) * 0.12; rawSV *= 0.8; }

/* спрайты цветов и лепестков */
var TINTS = [['#ffffff', '#f4f1ff'], ['#ffffff', '#efe6ff'], ['#f6f0ff', '#d9c7ff'], ['#f2f8ff', '#cfe3ff'], ['#fff3f8', '#ffd2e6'], ['#f3fff9', '#cdf3e3'], ['#ffffff', '#fff1d6']];
function sprite(c1, c2, petals) {
  var s = 72, c = document.createElement('canvas'); c.width = c.height = s; var g = c.getContext('2d');
  g.translate(s / 2, s / 2);
  g.shadowColor = 'rgba(255,255,255,.55)'; g.shadowBlur = 8;
  for (var i = 0; i < petals; i++) {
    g.save(); g.rotate(i * Math.PI * 2 / petals);
    var gr = g.createLinearGradient(0, -4, 0, -27); gr.addColorStop(0, c2); gr.addColorStop(1, c1);
    g.fillStyle = gr; g.beginPath(); g.ellipse(0, -15, 8.5, 13, 0, 0, Math.PI * 2); g.fill(); g.restore();
  }
  g.shadowBlur = 0; g.fillStyle = '#fff6d8'; g.beginPath(); g.arc(0, 0, 4.2, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(214,170,90,.55)'; g.beginPath(); g.arc(0, 0, 2.2, 0, Math.PI * 2); g.fill();
  return c;
}
function petalSprite(c1, c2) {
  var c = document.createElement('canvas'); c.width = 40; c.height = 56; var g = c.getContext('2d');
  var gr = g.createLinearGradient(0, 4, 0, 52); gr.addColorStop(0, c1); gr.addColorStop(1, c2);
  g.fillStyle = gr; g.shadowColor = 'rgba(255,255,255,.45)'; g.shadowBlur = 6;
  g.beginPath(); g.moveTo(20, 52); g.bezierCurveTo(2, 38, 4, 10, 20, 5); g.bezierCurveTo(36, 10, 38, 38, 20, 52); g.fill();
  return c;
}
function leaf() {
  var s = 72, c = document.createElement('canvas'); c.width = c.height = s; var g = c.getContext('2d');
  g.translate(s / 2, s / 2); g.rotate(.6);
  var gr = g.createLinearGradient(0, -26, 0, 26); gr.addColorStop(0, '#2f5a43'); gr.addColorStop(1, '#0f2419');
  g.fillStyle = gr; g.beginPath(); g.ellipse(0, 0, 9, 26, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = 'rgba(160,220,180,.25)'; g.lineWidth = 1; g.beginPath(); g.moveTo(0, -22); g.lineTo(0, 22); g.stroke();
  return c;
}
var SPR = TINTS.map(function (t) { return sprite(t[0], t[1], 5); }); SPR.push(sprite('#ffffff', '#e9e2ff', 6));
var PSPR = TINTS.map(function (t) { return petalSprite(t[0], t[1]); });
var LEAF = leaf();

/* 3D-поле цветов: первый экран и низ страницы */
function Field(cv, cfg) {
  var ctx = cv.getContext('2d'), W = 0, H = 0, P = [], ZMIN = 1.1, ZMAX = cfg.zmax || 16, XR = 11, T0 = Math.random() * 50;
  var mx = 0, my = 0, cx = 0, cy = 0, last = performance.now(), run = false, slowN = -30, slowT = 0;
  function newP(z) {
    return { x: (Math.random() * 2 - 1) * XR * (0.35 + z / ZMAX), z: z, s: 0.55 + Math.random() * 0.75, r: Math.random() * 6.28, vr: (Math.random() - .5) * .6,
      leaf: Math.random() < .09, spr: (Math.random() * SPR.length) | 0, jy: (Math.random() - .5) * .9 };
  }
  for (var i = 0; i < cfg.n; i++) P.push(newP(ZMIN + Math.random() * (ZMAX - ZMIN)));
  function size() { var r = cv.getBoundingClientRect(); W = r.width; H = r.height; cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); }
  size(); addEventListener('resize', size);
  if (cfg.mouse) addEventListener('pointermove', function (e) { mx = (e.clientX / innerWidth - .5); my = (e.clientY / innerHeight - .5); }, { passive: true });
  function waveY(x, z, t) { return -1.25 + 0.95 * Math.sin(x * 0.42 + z * 0.33 - t * 0.55) + 0.55 * Math.cos(z * 0.52 + t * 0.32) + 0.35 * Math.sin(x * 0.9 - t * 0.4); }
  function frame(now) {
    if (!run) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now; T0 += dt;
    cx += (mx * 1.6 - cx) * 0.04; cy += (my * 0.5 - cy) * 0.04;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
    var F = Math.min(W, H * 1.6) * (cfg.f || 0.62), hx = W / 2, hy = H * (small ? cfg.hyM : cfg.hy);
    var sp = (reduce ? 0 : cfg.speed) + Math.min(3, Math.abs(sv) * 0.05);
    for (var i = 0; i < P.length; i++) { var p = P[i]; p.z -= sp * dt; p.r += p.vr * dt; if (p.z < ZMIN) { P[i] = newP(ZMAX); P[i].z = ZMAX - Math.random() * .5; } }
    P.sort(function (a, b) { return b.z - a.z; });
    for (var j = 0; j < P.length; j++) {
      var q = P[j], z = q.z, s = F / z;
      var y = waveY(q.x, z, T0) + q.jy * 0.35 - cy;
      var px = hx + (q.x - cx) * s, py = hy - y * s, sz = q.s * s * 0.34;
      if (px < -sz || px > W + sz || py < -sz || py > H + sz) continue;
      var a = Math.min(1, (ZMAX - z) / 4.5) * Math.min(1, (z - ZMIN) / 0.9);
      var crest = 0.55 + 0.45 * Math.max(0, Math.min(1, (y + 1.8) / 2.2));
      ctx.globalAlpha = a * crest * (q.leaf ? 0.75 : 1);
      ctx.setTransform(DPR, 0, 0, DPR, px * DPR, py * DPR); ctx.rotate(q.r);
      ctx.drawImage(q.leaf ? LEAF : SPR[q.spr], -sz / 2, -sz / 2, sz, sz);
    }
    ctx.globalAlpha = 1;
    if (slowN < 90) { if (++slowN > 0) slowT += dt; if (slowN === 90 && slowT / 90 > 0.026 && P.length > 500) { P.length = Math.round(P.length * 0.6); slowN = 0; slowT = 0; } }
    if (!reduce) requestAnimationFrame(frame);
  }
  function start() { if (run) return; run = true; last = performance.now(); requestAnimationFrame(frame); }
  function stop() { run = false; }
  var visible = false;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; visible && !document.hidden ? start() : stop(); }, { rootMargin: '100px' }).observe(cv);
  else { visible = true; start(); }
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : visible && start(); });
  if (reduce) { run = true; frame(performance.now()); run = false; }
}
Field($('#field'), { n: small ? 1500 : 3200, hy: 0.42, hyM: 0.46, speed: 0.85, mouse: true });
if ($('#meadow')) Field($('#meadow'), { n: small ? 700 : 1500, hy: 0.16, hyM: 0.16, speed: 0.55, f: 0.62, zmax: 13 });

/* летящие лепестки + «вспышка» лепестков при нажатии */
(function () {
  var pc = $('#petals'); if (!pc || reduce) return;
  var g = pc.getContext('2d'), W = 0, H = 0, A = [], B = [], NA = small ? 12 : 22, last = performance.now();
  function size() { W = innerWidth; H = innerHeight; pc.width = Math.round(W * DPR); pc.height = Math.round(H * DPR); }
  size(); addEventListener('resize', size);
  function amb(top) { return { x: Math.random() * W, y: top ? -30 - Math.random() * H * 0.3 : Math.random() * H, vy: 16 + Math.random() * 26, sw: 18 + Math.random() * 30, ph: Math.random() * 6.28, r: Math.random() * 6.28, vr: (Math.random() - .5) * 1.4, fl: Math.random() * 6.28, vf: 1 + Math.random() * 2, s: 9 + Math.random() * 9, k: (Math.random() * PSPR.length) | 0, a: 0.35 + Math.random() * 0.4, fw: Math.random() < 0.18 }; }
  for (var i = 0; i < NA; i++) A.push(amb(false));
  function burst(x, y) {
    for (var i = 0; i < (small ? 7 : 10); i++) {
      var ang = Math.random() * 6.28, v = 120 + Math.random() * 220;
      B.push({ x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v - 120, r: Math.random() * 6.28, vr: (Math.random() - .5) * 10, fl: Math.random() * 6.28, vf: 4 + Math.random() * 6, s: 10 + Math.random() * 10, k: (Math.random() * PSPR.length) | 0, t: 0, life: 1 + Math.random() * 0.6, fw: Math.random() < 0.3 });
    }
  }
  document.addEventListener('pointerdown', function (e) { if (e.target.closest('a,button') && !e.target.closest('input,select,textarea')) burst(e.clientX, e.clientY); }, { passive: true });
  function draw(p, alpha) {
    g.globalAlpha = alpha; g.setTransform(DPR, 0, 0, DPR, p.x * DPR, p.y * DPR); g.rotate(p.r);
    if (p.fw) { var s = p.s * 1.25; g.drawImage(SPR[p.k % SPR.length], -s / 2, -s / 2, s, s); }
    else { g.scale(Math.cos(p.fl), 1); g.drawImage(PSPR[p.k], -p.s * 0.36, -p.s / 2, p.s * 0.72, p.s); }
  }
  var hidden = false;
  document.addEventListener('visibilitychange', function () { hidden = document.hidden; if (!hidden) { last = performance.now(); requestAnimationFrame(frame); } });
  function frame(now) {
    if (hidden) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now; tickScroll();
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, pc.width, pc.height);
    var fade = Math.max(0, Math.min(1, (scrollY - innerHeight * 0.45) / (innerHeight * 0.5)));
    for (var i = 0; i < A.length; i++) {
      var p = A[i]; p.ph += dt; p.y += p.vy * dt - sv * 0.25; p.x += Math.sin(p.ph * 0.8) * p.sw * dt; p.r += p.vr * dt; p.fl += p.vf * dt;
      if (p.y > H + 40 || p.y < -H * 0.5 || p.x < -60 || p.x > W + 60) { A[i] = amb(p.y > 0); continue; }
      if (fade > 0) draw(p, p.a * fade);
    }
    for (var j = B.length - 1; j >= 0; j--) {
      var q = B[j]; q.t += dt; if (q.t > q.life) { B.splice(j, 1); continue; }
      q.vy += 420 * dt; q.vx *= 0.985; q.x += q.vx * dt; q.y += q.vy * dt; q.r += q.vr * dt; q.fl += q.vf * dt;
      draw(q, Math.min(1, (q.life - q.t) * 2.2));
    }
    g.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
if (reduce || !$('#petals')) setInterval(tickScroll, 50);

/* бегущая строка */
(function () {
  var W1 = LANG === 'kk' ? ['кафе', 'мейрамханалар', 'жеткізу', 'дүкендер', 'қонақүйлер', 'қызметтер', 'лендингтер', 'каталогтар', 'telegram-боттар'] : ['кафе', 'рестораны', 'доставка', 'магазины', 'отели', 'услуги', 'лендинги', 'каталоги', 'telegram-боты'];
  var fl = '<svg viewBox="0 0 24 24"><use href="#i-fl"/></svg>';
  document.querySelectorAll('.mq').forEach(function (m, n) {
    var words = n ? W1.slice().reverse() : W1;
    var one = '<div class="mqi">' + words.map(function (w) { return '<span>' + w + '</span>' + fl; }).join('') + '</div>';
    m.innerHTML = one + one;
  });
  if (reduce) return;
  var rows = Array.prototype.map.call(document.querySelectorAll('.mq'), function (m) { return { el: m, x: 0, dir: +m.dataset.dir || 1 }; });
  var last = performance.now(), vis = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; if (vis) { last = performance.now(); requestAnimationFrame(step); } }).observe($('.marq'));
  function step(now) {
    if (!vis || document.hidden) return;
    var dt = Math.min(0.05, (now - last) / 1000); last = now;
    rows.forEach(function (r) {
      var w = r.el.firstChild.offsetWidth || 1, v = (small ? 40 : 60) + Math.abs(sv) * 6;
      r.x -= v * dt * r.dir * (sv < -0.5 ? -1 : 1);
      if (r.x <= -w) r.x += w; if (r.x > 0) r.x -= w;
      r.el.style.transform = 'translate3d(' + r.x.toFixed(1) + 'px,0,0)';
    });
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
  document.addEventListener('visibilitychange', function () { if (!document.hidden && vis) { last = performance.now(); requestAnimationFrame(step); } });
})();

/* заголовки: буквы выезжают снизу, рядом распускается цветок */
document.querySelectorAll('.h2.disp').forEach(function (h) {
  var txt = h.textContent.trim(), k = 0;
  h.setAttribute('aria-label', txt);
  h.innerHTML = txt.split(' ').map(function (w) {
    return '<span class="w" aria-hidden="true">' + w.split('').map(function (ch) { return '<span class="c" style="transition-delay:' + Math.min(0.9, (k++) * 0.035).toFixed(3) + 's">' + esc(ch) + '</span>'; }).join('') + '</span>';
  }).join(' ') + '<span class="bl" aria-hidden="true"><svg viewBox="0 0 24 24"><use href="#i-fl"/></svg></span>';
  h.classList.add('split');
  if (obs) obs.observe(h); else h.classList.add('in');
});

/* цифры считаются при появлении */
(function () {
  var els = document.querySelectorAll('[data-count]'); if (!els.length) return;
  function run(el) {
    el.dataset.done = 1; var to = +el.dataset.count || 0, pre = el.dataset.pre || '', suf = el.dataset.suf || '', t0 = performance.now(), d = 1400;
    if (reduce) { el.textContent = pre + to + suf; return; }
    (function f(now) { var k = Math.min(1, (now - t0) / d), e = 1 - Math.pow(1 - k, 3); el.textContent = pre + Math.round(to * e) + suf; if (k < 1) requestAnimationFrame(f); })(t0);
  }
  if (!('IntersectionObserver' in window)) return els.forEach(run);
  var io2 = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { run(en.target); io2.unobserve(en.target); } }); }, { threshold: 0.6 });
  els.forEach(function (el) { io2.observe(el); });
})();

/* карточки наклоняются за курсором, кнопки «притягиваются» */
if (fine && !reduce) {
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.cat');
    if (c) {
      var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty('--ry', ((x - .5) * 10).toFixed(2) + 'deg'); c.style.setProperty('--rx', ((.5 - y) * 8).toFixed(2) + 'deg');
      c.style.setProperty('--gx', (x * 100).toFixed(1) + '%'); c.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
    }
  }, { passive: true });
  document.addEventListener('pointerout', function (e) {
    var c = e.target.closest && e.target.closest('.cat');
    if (c && !c.contains(e.relatedTarget)) { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); }
  });
  document.querySelectorAll('.hero .pill, .cta .pill, .nact .pill, #lBtn').forEach(function (b) {
    b.classList.add('mag');
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.32).toFixed(1) + 'px)'; });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });
}
})();

/* клики по демо-сайтам → аналитика */
document.addEventListener('click', function (e) { var d = e.target.closest && e.target.closest('[data-demo]'); if (d) track('demo_open', { demo: d.dataset.demo }); });
