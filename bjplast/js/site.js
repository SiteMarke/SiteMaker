/* BJ PLAST — сайт: язык, чертёж окна, калькулятор, работы, отзывы, заявки. */
(function () {
'use strict';
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
var nf = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); };
var money = function (n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'; };
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

/* ================= тексты ================= */
var T = {
ru: {
 n1: 'Услуги', n2: 'Расчёт', n3: 'Работы', n4: 'Отзывы', n5: 'Контакты',
 h1: 'Окна и двери под ваш проём',
 sub: 'Изготовим из ПВХ или алюминия по точным размерам и установим под ключ — с откосами и подоконником. Замер в Астане и Косшы бесплатно.',
 c1: 'Рассчитать стоимость', c2: 'Вызвать замерщика', tr1: 'в 2ГИС', tr2: 'лет опыта', tr3b: 'Замер', tr3: 'бесплатно',
 cap: 'Двустворчатое окно ПВХ, 1500 × 1400 мм',
 sh: 'Что делаем', sl: 'Сами изготавливаем и сами устанавливаем. Для квартир, частных домов, офисов, магазинов и строящихся объектов.',
 calcIt: 'Рассчитать', orderIt: 'Вызвать замерщика',
 ch: 'Соберите конструкцию и узнайте цену', cl: 'Укажите размеры проёма, нажмите на створки, чтобы выбрать, какие открываются, и выберите цвет. Чертёж и цена обновятся сразу.',
 hint: 'Нажмите на створку, чтобы сменить тип открывания',
 f1: 'Что нужно', f2: 'Размер проёма, мм', fw: 'ширина', fh: 'высота', f3: 'Сколько створок', f3b: 'Сколько створок у окна', f3g: 'Сколько секций', f4: 'Цвет профиля', f5: 'Добавить', f6: 'Количество',
 rk: 'Ориентировочная стоимость', rkOff: 'Ваш расчёт', rs: 'Отправить расчёт и записаться на замер', priceOff: 'Цену назовём после замера',
 pcs: 'шт.', mm: 'мм', sash1: 'створка', sash2: 'створки', sash5: 'створок', sec1: 'секция', sec2: 'секции', sec5: 'секций',
 o_fix: 'глухая', o_turn: 'поворотная', o_tt: 'поворотно-откидная', o_door: 'дверь',
 lg_fix: 'не открывается', lg_turn: 'открывается', lg_tt: 'открывается и откидывается на проветривание',
 doorWith: 'дверь и окно', withDoor: 'с дверью',
 wh: 'Наши объекты', wl: 'Квартиры, частные дома и коммерческие здания в Астане и Косшы. Новые работы выкладываем в Instagram и TikTok.',
 w_all: 'Все', w_window: 'Окна и балконы', w_door: 'Двери и тамбуры', w_commercial: 'Витражи и фасады', w_partition: 'Перегородки',
 ph: 'Как проходит заказ',
 rh: 'Отзывы клиентов', rgis: 'оценка в 2ГИС', rcnt: 'оценок', rall: 'Все отзывы в 2ГИС',
 qh: 'Частые вопросы',
 kh: 'Запишитесь на бесплатный замер', kl: 'Оставьте телефон — перезвоним или напишем в WhatsApp и договоримся о времени.',
 k1: 'Телефон и WhatsApp', k2: 'Адрес', k3: 'Часы работы',
 zh: 'Заявка на замер', zs: 'Замер и консультация бесплатно.', fn: 'Имя', fp: 'Телефон', fa: 'Адрес или район', fc: 'Что нужно сделать', fcp: 'Например: 2 окна и балкон в новостройке', zb: 'Записаться на замер',
 okh: 'Заявка отправлена', okt: 'Мы свяжемся с вами в рабочее время. Если удобнее, напишите сразу в WhatsApp.', okt2: 'Мы получили расчёт и свяжемся с вами, чтобы договориться о замере.',
 ft: 'Астана и Косшы', set: 'Настройки', call: 'Позвонить', calcS: 'Расчёт',
 oh: 'Отправить расчёт', ob: 'Отправить заявку', close: 'Закрыть', waGo: 'Написать в WhatsApp',
 theme: 'Оформление', thA: 'Авто', thL: 'Светлое', thD: 'Тёмное', lang: 'Язык',
 pr1: 'Хотите похожий сайт для бизнеса?', pr2: 'Сделаю такой же сайт для вашего бизнеса — с калькулятором, заявками и WhatsApp.',
 errPhone: 'Укажите телефон, чтобы мы могли с вами связаться.', failH: 'Заявка не ушла', fail: 'Нет связи с сервером. Напишите нам в WhatsApp — данные уже в сообщении.',
 sending: 'Отправляю…',
 waHello: 'Здравствуйте! Пишу с сайта BJ PLAST, хочу узнать про окна/двери.',
 waCalc: 'Здравствуйте! Расчёт с сайта BJ PLAST', waZamer: 'Здравствуйте! Хочу записаться на бесплатный замер.', waNo: 'Заявка №',
 lName: 'Имя', lPhone: 'Телефон', lAddr: 'Адрес', lPrice: 'Ориентир', lOpts: 'Дополнительно',
 svc: [
  ['s-pvc', 'Пластиковые окна', 'ПВХ-профиль и тёплые стеклопакеты. Белые, под дерево и антрацит, любые размеры.', 'pvc'],
  ['s-balc', 'Балконы и лоджии', 'Балконные блоки, остекление и отделка балконов и лоджий.', 'balcony'],
  ['s-alu', 'Алюминиевые окна и витражи', 'Для фасадов, магазинов, офисов и частных домов.', 'alu'],
  ['s-door', 'Входные двери и тамбуры', 'Тёплые остеклённые тамбуры и входные группы для дома и бизнеса.', 'tambur'],
  ['s-part', 'Перегородки', 'Офисные и торговые перегородки с дверями под ваши размеры.', 'partition'],
  ['s-fix', 'Замена и ремонт', 'Меняем стеклопакеты и треснувшее стекло, делаем откосы и подоконники, регулируем створки.', '']],
 faq: [
  ['Сколько стоит окно?', 'Цена зависит от размера, профиля, стеклопакета и отделки. Ориентир — в калькуляторе выше, точную сумму называем после бесплатного замера.'],
  ['Замер платный?', 'Нет. Замер и консультация бесплатные — в Астане и Косшы.'],
  ['Делаете откосы и подоконники?', 'Да, это монтаж под ключ: откосы, подоконник и отлив делаем вместе с установкой.'],
  ['Можно заменить только стеклопакет или стекло?', 'Да. Меняем стеклопакеты и треснувшее стекло без замены всего окна.'],
  ['Работаете с организациями и стройками?', 'Да. Остекляем коммерческие и строящиеся объекты: витражи, фасады, входные группы, перегородки. Оплата наличными или через банк.']]
},
kk: {
 n1: 'Қызметтер', n2: 'Есептеу', n3: 'Жұмыстар', n4: 'Пікірлер', n5: 'Байланыс',
 h1: 'Терезе мен есік — сіздің өлшеміңізге',
 sub: 'ПВХ немесе алюминийден нақты өлшеммен жасап, откосы мен терезе алдымен бірге кілті дайын орнатамыз. Астана мен Қосшыда өлшеу тегін.',
 c1: 'Құнын есептеу', c2: 'Өлшеушіні шақыру', tr1: '2ГИС-те', tr2: 'жыл тәжірибе', tr3b: 'Өлшеу', tr3: 'тегін',
 cap: 'Екі қанатты ПВХ терезе, 1500 × 1400 мм',
 sh: 'Не істейміз', sl: 'Өзіміз жасаймыз, өзіміз орнатамыз. Пәтерге, жеке үйге, кеңсе мен дүкенге және салынып жатқан нысандарға.',
 calcIt: 'Есептеу', orderIt: 'Өлшеушіні шақыру',
 ch: 'Конструкцияны құрастырып, бағасын біліңіз', cl: 'Ойық өлшемін жазыңыз, қай қанаттар ашылатынын таңдау үшін оларды басыңыз және түсін таңдаңыз. Сызба мен баға бірден жаңарады.',
 hint: 'Ашылу түрін өзгерту үшін қанатты басыңыз',
 f1: 'Не керек', f2: 'Ойық өлшемі, мм', fw: 'ені', fh: 'биіктігі', f3: 'Қанат саны', f3b: 'Терезенің қанат саны', f3g: 'Секция саны', f4: 'Профиль түсі', f5: 'Қосу', f6: 'Саны',
 rk: 'Шамамен құны', rkOff: 'Сіздің есебіңіз', rs: 'Есепті жіберіп, өлшеуге жазылу', priceOff: 'Бағасын өлшеуден кейін айтамыз',
 pcs: 'дана', mm: 'мм', sash1: 'қанат', sash2: 'қанат', sash5: 'қанат', sec1: 'секция', sec2: 'секция', sec5: 'секция',
 o_fix: 'ашылмайтын', o_turn: 'бұрылып ашылатын', o_tt: 'бұрылып әрі шалқайып ашылатын', o_door: 'есік',
 lg_fix: 'ашылмайды', lg_turn: 'ашылады', lg_tt: 'ашылады және желдетуге шалқаяды',
 doorWith: 'есік пен терезе', withDoor: 'есігімен',
 wh: 'Біздің нысандар', wl: 'Астана мен Қосшыдағы пәтерлер, жеке үйлер және коммерциялық ғимараттар. Жаңа жұмыстарды Instagram мен TikTok-қа салып тұрамыз.',
 w_all: 'Барлығы', w_window: 'Терезе мен балкон', w_door: 'Есік пен тамбур', w_commercial: 'Витраж бен қасбет', w_partition: 'Перегородкалар',
 ph: 'Тапсырыс қалай өтеді',
 rh: 'Клиенттер пікірі', rgis: '2ГИС-тегі баға', rcnt: 'бағалау', rall: '2ГИС-тегі барлық пікір',
 qh: 'Жиі қойылатын сұрақтар',
 kh: 'Тегін өлшеуге жазылыңыз', kl: 'Телефоныңызды қалдырыңыз — қоңырау шаламыз немесе WhatsApp-қа жазып, уақытын келісеміз.',
 k1: 'Телефон және WhatsApp', k2: 'Мекенжай', k3: 'Жұмыс уақыты',
 zh: 'Өлшеуге өтінім', zs: 'Өлшеу мен кеңес тегін.', fn: 'Атыңыз', fp: 'Телефон', fa: 'Мекенжай немесе аудан', fc: 'Не істеу керек', fcp: 'Мысалы: жаңа үйде 2 терезе және балкон', zb: 'Өлшеуге жазылу',
 okh: 'Өтінім жіберілді', okt: 'Жұмыс уақытында хабарласамыз. Ыңғайлы болса, бірден WhatsApp-қа жазыңыз.', okt2: 'Есебіңізді алдық, өлшеу уақытын келісу үшін хабарласамыз.',
 ft: 'Астана және Қосшы', set: 'Баптаулар', call: 'Қоңырау', calcS: 'Есептеу',
 oh: 'Есепті жіберу', ob: 'Өтінімді жіберу', close: 'Жабу', waGo: 'WhatsApp-қа жазу',
 theme: 'Безендіру', thA: 'Авто', thL: 'Жарық', thD: 'Қараңғы', lang: 'Тіл',
 pr1: 'Бизнесіңізге осындай сайт керек пе?', pr2: 'Бизнесіңізге де осындай сайт жасап беремін — калькулятормен, өтініммен және WhatsApp-пен.',
 errPhone: 'Сізбен байланысуымыз үшін телефон нөмірін жазыңыз.', failH: 'Өтінім жіберілмеді', fail: 'Серверге байланыс жоқ. WhatsApp-қа жазыңыз — деректер хабарламада дайын.',
 sending: 'Жіберілуде…',
 waHello: 'Сәлеметсіз бе! BJ PLAST сайтынан жазып отырмын, терезе/есік туралы білгім келеді.',
 waCalc: 'Сәлеметсіз бе! BJ PLAST сайтындағы есеп', waZamer: 'Сәлеметсіз бе! Тегін өлшеуге жазылғым келеді.', waNo: 'Өтінім №',
 lName: 'Аты', lPhone: 'Телефон', lAddr: 'Мекенжай', lPrice: 'Шамамен баға', lOpts: 'Қосымша',
 svc: [
  ['s-pvc', 'Пластик терезелер', 'ПВХ профиль және жылы стеклопакет. Ақ, ағаш түстес және антрацит, кез келген өлшем.', 'pvc'],
  ['s-balc', 'Балкон мен лоджия', 'Балкон блоктары, балкон мен лоджияны әйнектеу және әрлеу.', 'balcony'],
  ['s-alu', 'Алюминий терезе мен витраж', 'Қасбетке, дүкенге, кеңсеге және жеке үйге.', 'alu'],
  ['s-door', 'Кіреберіс есік пен тамбур', 'Үйге және бизнеске арналған жылы әйнектелген тамбурлар мен кіреберіс топтары.', 'tambur'],
  ['s-part', 'Перегородкалар', 'Есігі бар кеңсе және сауда перегородкалары, өлшеміңізге қарай.', 'partition'],
  ['s-fix', 'Ауыстыру және жөндеу', 'Стеклопакет пен жарылған әйнекті ауыстырамыз, откос пен терезе алдын жасаймыз, қанаттарды реттейміз.', '']],
 faq: [
  ['Терезе қанша тұрады?', 'Баға өлшемге, профильге, стеклопакетке және әрлеуге байланысты. Шамамен бағасы — жоғарыдағы калькуляторда, нақты соманы тегін өлшеуден кейін айтамыз.'],
  ['Өлшеу ақылы ма?', 'Жоқ. Астана мен Қосшыда өлшеу мен кеңес тегін.'],
  ['Откос пен терезе алдын жасайсыздар ма?', 'Иә, кілті дайын орнату: откос, терезе алды мен ағызғышты орнатумен бірге жасаймыз.'],
  ['Тек стеклопакетті немесе әйнекті ауыстыруға бола ма?', 'Иә. Бүкіл терезені ауыстырмай-ақ стеклопакет пен жарылған әйнекті ауыстырамыз.'],
  ['Ұйымдармен және құрылыспен жұмыс істейсіздер ме?', 'Иә. Коммерциялық және салынып жатқан нысандарды әйнектейміз: витраж, қасбет, кіреберіс топтары, перегородкалар. Төлем қолма-қол немесе банк арқылы.']]
}};
var STEP_KK = { p1: 'Өтінім', p1t: 'WhatsApp-қа жазасыз немесе сайтта өтінім қалдырасыз. Тапсырманы нақтылап, өлшеу уақытын келісеміз.', p2: 'Тегін өлшеу', p2t: 'Өлшеуші келіп, ойықты өлшейді және қай конструкция лайық екенін айтады. Нақты бағасын айтамыз.', p3: 'Дайындау', p3t: 'Конструкцияны сіздің өлшеміңізге қарай ПВХ немесе алюминийден таңдаған түсте жасаймыз.', p4: 'Кілті дайын орнату', p4t: 'Орнатамыз, откос, терезе алды мен ағызғышты жасаймыз. Ұқыпты жұмыс істеп, артымыздан жинаймыз.' };
var STEP_RU = {};
['p1', 'p1t', 'p2', 'p2t', 'p3', 'p3t', 'p4', 'p4t'].forEach(function (k) { var el = $('[data-t="' + k + '"]'); STEP_RU[k] = el ? el.textContent : ''; });
Object.keys(STEP_KK).forEach(function (k) { T.kk[k] = STEP_KK[k]; T.ru[k] = STEP_RU[k]; });

var lang = store('bj-lang') === 'kk' ? 'kk' : 'ru';
var t = function (k) { var v = T[lang][k]; return v == null ? (T.ru[k] == null ? '' : T.ru[k]) : v; };
var D = null; // данные сайта
var S = D ? D.settings : {};
var L = function (o, k) { return (lang === 'kk' && o[k + '_kk']) ? o[k + '_kk'] : (lang === 'kk' && k === 'name' && o.kk) ? o.kk : o[k]; };
function plural(n, a, b, c) { n = Math.abs(n) % 100; var n1 = n % 10; if (n > 10 && n < 20) return c; if (n1 > 1 && n1 < 5) return b; if (n1 === 1) return a; return c; }

/* ================= чертёж ================= */
var uid = 0;
function shade(hex, f) { var n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255; var m = function (x) { return Math.max(0, Math.min(255, Math.round(f < 0 ? x * (1 + f) : x + (255 - x) * f))); }; return '#' + ((1 << 24) + (m(r) << 16) + (m(g) << 8) + m(b)).toString(16).slice(1); }
// o: {kind, W, H, n, open[], color, photo, interactive, heroAnim}
function drawSVG(o) {
  var id = 'd' + (++uid), W = o.W, H = o.H, k = Math.max(W, H) / 1500;
  var Lp = 250 * k, Tp = 230 * k, Rp = 30 * k, Bp = 30 * k;
  var F = Math.max(48, 58 * Math.min(k, 1.4)), M = F * 0.95, SV = F * 0.62, fs = 62 * k;
  var col = o.color || '#F4F6F8', light = parseInt(col.slice(1, 3), 16) > 200;
  var prof = col, prof2 = shade(col, light ? -0.08 : 0.12);
  var glass = o.photo ? 'url(#' + id + 'p)' : 'url(#' + id + 'g)';
  var out = [], dims = [], panes = [];
  var openList = o.open || [];
  function R(x, y, w, h, cls, fill, extra) { return '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + Math.max(0, w).toFixed(1) + '" height="' + Math.max(0, h).toFixed(1) + '"' + (cls ? ' class="' + cls + '"' : '') + ' fill="' + fill + '"' + (extra || '') + '/>'; }
  function Ln(x1, y1, x2, y2, cls, extra) { return '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" class="' + cls + '"' + (extra || '') + '/>'; }
  var gi = 0, clips = [];
  function glassAt(x, y, w, h) {
    if (o.scene) {
      var cid = id + 'k' + (gi++);
      clips.push('<clipPath id="' + cid + '"><rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '"/></clipPath>');
      return R(x, y, w, h, 'gl', 'url(#' + id + 's)') + '<use href="#' + id + 'v" clip-path="url(#' + cid + ')"/>' + R(x, y, w, h, 'gl', 'none');
    }
    var s = R(x, y, w, h, 'gl', glass);
    if (!o.photo) s += Ln(x + w * 0.18, y + h * 0.42, x + w * 0.42, y + h * 0.18, 'gl', ' style="stroke:#fff;opacity:.7"') + Ln(x + w * 0.22, y + h * 0.56, x + w * 0.56, y + h * 0.22, 'gl', ' style="stroke:#fff;opacity:.45"');
    return s;
  }
  function symbol(x, y, w, h, type, hinge) {
    var s = '';
    if (type === 'turn' || type === 'tt' || type === 'door') {
      var ax = hinge === 'l' ? x : x + w, bx = hinge === 'l' ? x + w : x;
      s += '<path class="op" d="M' + bx.toFixed(1) + ' ' + y.toFixed(1) + 'L' + ax.toFixed(1) + ' ' + (y + h / 2).toFixed(1) + 'L' + bx.toFixed(1) + ' ' + (y + h).toFixed(1) + '"/>';
    }
    if (type === 'tt' || type === 'tilt') s += '<path class="op" d="M' + x.toFixed(1) + ' ' + y.toFixed(1) + 'L' + (x + w / 2).toFixed(1) + ' ' + (y + h).toFixed(1) + 'L' + (x + w).toFixed(1) + ' ' + y.toFixed(1) + '"/>';
    return s;
  }
  function handle(x, y, w, h, type, hinge) {
    if (type === 'fix') return '';
    var hw = 26 * k, hh = (type === 'door' ? 260 : 150) * k, hx = hinge === 'l' ? x + w - SV / 2 - hw / 2 : x + SV / 2 - hw / 2, hy = y + h / 2 - hh / 2;
    if (type === 'door') hy = y + Math.min(h / 2, 1050) - hh / 2;
    return '<rect class="hd2" x="' + hx.toFixed(1) + '" y="' + hy.toFixed(1) + '" width="' + hw.toFixed(1) + '" height="' + hh.toFixed(1) + '" rx="' + (hw / 2).toFixed(1) + '"/>';
  }
  // одна ячейка: глухое стекло или створка
  function cell(x, y, w, h, type, hinge, idx, panel) {
    var s = '';
    if (type === 'fix') {
      var b = 10 * k; s += R(x, y, w, h, 'fr', prof2) + glassAt(x + b, y + b, w - 2 * b, h - 2 * b);
    } else {
      s += R(x, y, w, h, 'fr', prof);
      var gx = x + SV, gy = y + SV, gw = w - 2 * SV, gh = h - 2 * SV;
      if (panel) { var ph = gh * panel; s += R(gx, gy + gh - ph, gw, ph, 'fr', prof2); gh -= ph + SV * 0.6; }
      s += glassAt(gx, gy, gw, gh) + symbol(gx, gy, gw, gh, type, hinge) + handle(x, y, w, h, type, hinge);
    }
    if (idx != null && o.interactive) {
      var lab = t('o_' + type);
      s = '<g class="pane" data-i="' + idx + '" tabindex="0" role="button" aria-label="' + esc(lab) + '">' + s + '</g>';
    }
    return s;
  }
  function cols(x0, y0, w, h, n) { var cw = (w - (n - 1) * M) / n, r = []; for (var i = 0; i < n; i++) r.push([x0 + i * (cw + M), y0, cw, h]); return r; }
  function hingeOf(i, n) { return n === 1 ? 'l' : (i < n / 2 ? 'l' : 'r'); }

  // рама
  var kind = o.kind;
  var segs = []; // границы для размеров по верху
  if (kind === 'window' || kind === 'group' || kind === 'groupdoor') {
    out.push(R(0, 0, W, H, 'fr', prof));
    var x0 = F, y0 = F, iw = W - 2 * F, ih = H - 2 * F, n = o.n;
    var top = 0;
    if (kind !== 'window') { top = Math.min(ih * 0.22, 520); var tc = cols(x0, y0, iw, top, n); tc.forEach(function (c) { out.push(cell(c[0], c[1], c[2], c[3], 'fix')); }); y0 += top + M; ih -= top + M; }
    var cs = cols(x0, y0, iw, ih, n), doorAt = kind === 'groupdoor' ? Math.floor((n - 1) / 2) : -1;
    cs.forEach(function (c, i) {
      var type = i === doorAt ? 'door' : (openList[i] || 'fix');
      out.push(cell(c[0], c[1], c[2], c[3], type, hingeOf(i, n), (kind === 'window' && i !== doorAt) ? i : null, type === 'door' ? 0.32 : 0));
      if (type !== 'fix') panes.push(type);
    });
    for (var i = 1; i < n; i++) segs.push(W * i / n);
    if (kind !== 'window') segs = []; // у витражей только общий размер
  } else if (kind === 'balcony') {
    var dw = Math.max(650, Math.min(900, W * 0.36)); if (W - dw < 450) dw = W - 450;
    var wh = Math.round(Math.min(H * 0.67, 1450) / 10) * 10;
    out.push('<rect x="' + dw.toFixed(1) + '" y="' + wh.toFixed(1) + '" width="' + (W - dw).toFixed(1) + '" height="' + (H - wh).toFixed(1) + '" class="wall"/>');
    out.push(R(0, 0, dw, H, 'fr', prof));
    out.push(cell(F, F, dw - 2 * F, H - 2 * F, 'door', 'l', null, 0.36)); panes.push('door');
    out.push(R(dw - 1, 0, W - dw + 1, wh, 'fr', prof));
    var nn = Math.max(1, o.n - 1), wc = cols(dw + F * 0.6, F, W - dw - F * 1.6, wh - 2 * F, nn);
    wc.forEach(function (c, i) { var tp = openList[i] || 'fix'; out.push(cell(c[0], c[1], c[2], c[3], tp, hingeOf(i, nn), i)); if (tp !== 'fix') panes.push(tp); });
    segs.push(dw);
    dims.push(['v', W + 0, 0, wh, 'in']);
  } else if (kind === 'door') {
    out.push(R(0, 0, W, H, 'fr', prof));
    out.push(cell(F, F, W - 2 * F, H - F, 'door', 'l', null, 0.38)); panes.push('door');
  }

  // размеры
  var dimS = [], ty = -Tp * 0.62, sy = -Tp * 0.26, lx = -Lp * 0.62, tk = 32 * k;
  var anim = o.heroAnim ? ' pathLength="1"' : '';
  function tick(x, y) { return Ln(x - tk, y + tk, x + tk, y - tk, 'tick'); }
  // общая ширина
  dimS.push(Ln(0, -Tp * 0.82, 0, -12 * k, 'ext') + Ln(W, -Tp * 0.82, W, -12 * k, 'ext'));
  dimS.push(Ln(0, ty, W, ty, 'dim', anim) + tick(0, ty) + tick(W, ty));
  dimS.push('<text class="lbl" x="' + (W / 2).toFixed(1) + '" y="' + (ty - fs * 0.45).toFixed(1) + '" font-size="' + fs.toFixed(1) + '" text-anchor="middle">' + nf(W) + '</text>');
  // по секциям
  if (segs.length) {
    var pts = [0].concat(segs, [W]);
    dimS.push(Ln(0, sy, W, sy, 'dim', anim));
    pts.forEach(function (p) { dimS.push(tick(p, sy)); });
    for (var j = 1; j < pts.length; j++) dimS.push('<text class="lbl" x="' + ((pts[j - 1] + pts[j]) / 2).toFixed(1) + '" y="' + (sy - fs * 0.35).toFixed(1) + '" font-size="' + (fs * 0.8).toFixed(1) + '" text-anchor="middle" style="fill:var(--mute)">' + nf(pts[j] - pts[j - 1]) + '</text>');
  }
  // общая высота
  dimS.push(Ln(-Lp * 0.82, 0, -12 * k, 0, 'ext') + Ln(-Lp * 0.82, H, -12 * k, H, 'ext'));
  dimS.push(Ln(lx, 0, lx, H, 'dim', anim) + tick(lx, 0) + tick(lx, H));
  dimS.push('<text class="lbl" x="' + (lx - fs * 0.45).toFixed(1) + '" y="' + (H / 2).toFixed(1) + '" font-size="' + fs.toFixed(1) + '" text-anchor="middle" transform="rotate(-90 ' + (lx - fs * 0.45).toFixed(1) + ' ' + (H / 2).toFixed(1) + ')">' + nf(H) + '</text>');
  // высота окна у балконного блока — справа
  dims.forEach(function (d) {
    if (d[0] === 'v') { var rx = W + Rp * 0.2 + 120 * k; Rp = Math.max(Rp, 260 * k);
      dimS.push(Ln(rx, d[2], rx, d[3], 'dim', anim) + tick(rx, d[2]) + tick(rx, d[3]));
      dimS.push('<text class="lbl" x="' + (rx + fs * 0.95).toFixed(1) + '" y="' + ((d[2] + d[3]) / 2).toFixed(1) + '" font-size="' + (fs * 0.8).toFixed(1) + '" text-anchor="middle" style="fill:var(--mute)" transform="rotate(-90 ' + (rx + fs * 0.95).toFixed(1) + ' ' + ((d[2] + d[3]) / 2).toFixed(1) + ')">' + nf(d[3] - d[2]) + '</text>'); }
  });

  var defs = '<defs><linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--glass2)"/><stop offset="1" stop-color="var(--glass)"/></linearGradient>' +
    (o.scene ? '<linearGradient id="' + id + 's" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--sky1)"/><stop offset=".75" stop-color="var(--sky2)"/></linearGradient><g id="' + id + 'v">' + skyline(W, H) + '</g>' + clips.join('') : '') +
    (o.photo ? '<pattern id="' + id + 'p" patternUnits="userSpaceOnUse" x="0" y="0" width="' + W + '" height="' + H + '"><image href="' + o.photo + '" x="0" y="0" width="' + W + '" height="' + H + '" preserveAspectRatio="xMidYMid slice"/></pattern>' : '') + '</defs>';
  var vb = [-Lp, -Tp, W + Lp + Rp, H + Tp + Bp].map(function (v) { return v.toFixed(1); }).join(' ');
  return '<svg viewBox="' + vb + '" role="img" aria-label="' + esc(o.label || '') + '" xmlns="http://www.w3.org/2000/svg">' + defs + dimS.join('') + out.join('') + '</svg>';
}
// вид из окна: Астана — Хан Шатыр и Байтерек, нарисованные как чертёж
function skyline(W, H) {
  var sx = W / 1500, sy = H / 1400, P = function (x, y) { return (x * sx).toFixed(1) + ' ' + (y * sy).toFixed(1); };
  var b = function (x, y, w, h) { var s = '<rect style="fill:var(--bldf);stroke:var(--draft);stroke-width:1px;vector-effect:non-scaling-stroke" x="' + (x * sx).toFixed(1) + '" y="' + (y * sy).toFixed(1) + '" width="' + (w * sx).toFixed(1) + '" height="' + (h * sy).toFixed(1) + '"/>'; for (var yy = y + 50; yy < y + h - 20; yy += 56) s += '<line style="stroke:var(--draft);stroke-width:.8px;fill:none;opacity:.6;vector-effect:non-scaling-stroke" x1="' + ((x + 18) * sx).toFixed(1) + '" y1="' + (yy * sy).toFixed(1) + '" x2="' + ((x + w - 18) * sx).toFixed(1) + '" y2="' + (yy * sy).toFixed(1) + '"/>'; return s; };
  var g = '';
  g += '<circle style="fill:var(--sunf)" cx="' + (300 * sx).toFixed(1) + '" cy="' + (330 * sy).toFixed(1) + '" r="' + (70 * sx).toFixed(1) + '"/>';
  g += b(80, 860, 150, 340) + b(1120, 800, 170, 400) + b(1310, 900, 140, 300) + b(250, 960, 110, 240);
  g += '<path style="fill:var(--bldf);stroke:var(--draft);stroke-width:1px;vector-effect:non-scaling-stroke" d="M' + P(390, 1200) + 'Q' + P(470, 960) + ' ' + P(520, 770) + 'Q' + P(570, 960) + ' ' + P(650, 1200) + 'Z"/>';
  g += '<path style="stroke:var(--draft);stroke-width:.8px;fill:none;opacity:.6;vector-effect:non-scaling-stroke" d="M' + P(520, 770) + 'L' + P(520, 1200) + 'M' + P(520, 800) + 'Q' + P(480, 1000) + ' ' + P(440, 1200) + 'M' + P(520, 800) + 'Q' + P(560, 1000) + ' ' + P(600, 1200) + '"/>';
  g += '<path style="fill:var(--bldf);stroke:var(--draft);stroke-width:1px;vector-effect:non-scaling-stroke" d="M' + P(935, 1180) + 'L' + P(951, 590) + 'L' + P(969, 590) + 'L' + P(985, 1180) + 'Z"/>';
  g += '<path style="stroke:var(--draft);stroke-width:.8px;fill:none;opacity:.6;vector-effect:non-scaling-stroke" d="M' + P(960, 600) + 'L' + P(902, 488) + 'M' + P(960, 600) + 'L' + P(928, 470) + 'M' + P(960, 600) + 'L' + P(992, 470) + 'M' + P(960, 600) + 'L' + P(1018, 488) + 'M' + P(960, 400) + 'L' + P(960, 360) + '"/>';
  g += '<ellipse style="fill:var(--sun);stroke:#C98A12;stroke-width:1px;vector-effect:non-scaling-stroke" cx="' + (960 * sx).toFixed(1) + '" cy="' + (455 * sy).toFixed(1) + '" rx="' + (62 * sx).toFixed(1) + '" ry="' + (62 * sy).toFixed(1) + '"/>';
  g += '<rect style="fill:var(--gndf)" x="0" y="' + (1200 * sy).toFixed(1) + '" width="' + W + '" height="' + (H * 0.2).toFixed(1) + '"/>';
  return g;
}
function legendSym(type) {
  return '<svg viewBox="0 0 26 20" aria-hidden="true"><rect x="1" y="1" width="24" height="18" fill="var(--glass)" stroke="var(--ink)" stroke-width="1.2"/>' +
    (type === 'turn' || type === 'tt' ? '<path d="M25 1L1 10l24 9" fill="none" stroke="var(--ink)" stroke-dasharray="3 2" stroke-width="1"/>' : '') +
    (type === 'tt' ? '<path d="M1 1l12 18L25 1" fill="none" stroke="var(--ink)" stroke-dasharray="3 2" stroke-width="1"/>' : '') + '</svg>';
}

/* ================= калькулятор ================= */
var C = { type: 'pvc', w: 1500, h: 1400, n: 2, open: [], color: 'white', ex: {}, q: 1 };
var OPEN_CYCLE = ['fix', 'turn', 'tt'];
function typeObj() { var l = D.calc.types.filter(function (x) { return x.on; }); return l.filter(function (x) { return x.id === C.type; })[0] || l[0]; }
function nRange(tp) { if (tp.kind === 'door') return [1, 1]; if (tp.kind === 'balcony') return [2, 4]; if (tp.kind === 'window') return [1, 4]; return [2, 5]; }
function windowPanes(tp) { return tp.kind === 'window' ? C.n : tp.kind === 'balcony' ? Math.max(1, C.n - 1) : 0; }
function defaultOpen(m) { return ({ 1: ['tt'], 2: ['fix', 'tt'], 3: ['tt', 'fix', 'tt'], 4: ['tt', 'fix', 'fix', 'tt'] })[m] || []; }
function pickType(id, keepSize) {
  var tp = D.calc.types.filter(function (x) { return x.id === id && x.on; })[0]; if (!tp) return;
  C.type = id;
  if (!keepSize) { C.w = tp.w; C.h = tp.h; C.n = tp.sashes; }
  var r = nRange(tp); C.n = Math.min(r[1], Math.max(r[0], C.n));
  C.open = defaultOpen(windowPanes(tp));
  renderCfg();
}
function calcPrice() {
  var tp = typeObj(), c = D.calc;
  var area = Math.max(C.w * C.h / 1e6, 0.6);
  var col = c.colors.filter(function (x) { return x.id === C.color; })[0] || { pct: 0 };
  var base = tp.rate * area * (1 + col.pct / 100);
  var opens = 0, wp = windowPanes(tp); for (var i = 0; i < wp; i++) if ((C.open[i] || 'fix') !== 'fix') opens++;
  var unit = base + opens * c.openPrice, add = 0, pct = 0, names = [];
  c.extras.forEach(function (x) { if (!x.on || !C.ex[x.id]) return; names.push(L(x, 'name')); if (x.pct) pct += x.pct; if (x.price) add += x.price; });
  var total = (unit * (1 + pct / 100) + add) * C.q;
  return { lo: Math.floor(total * 0.93 / 1000) * 1000, hi: Math.ceil(total * 1.07 / 1000) * 1000, names: names, opens: opens };
}
function describe() {
  var tp = typeObj(), wp = windowPanes(tp), parts = [L(tp, 'name'), nf(C.w).replace(' ', ' ') + ' × ' + nf(C.h).replace(' ', ' ') + ' ' + t('mm')];
  if (wp) {
    var o = []; for (var i = 0; i < wp; i++) o.push(t('o_' + (C.open[i] || 'fix')));
    parts.push(wp + ' ' + plural(wp, t('sash1'), t('sash2'), t('sash5')) + ': ' + o.join(', '));
    if (tp.kind === 'balcony') parts[parts.length - 1] = t('doorWith') + ', ' + parts[parts.length - 1];
  } else if (tp.kind !== 'door') parts.push(C.n + ' ' + plural(C.n, t('sec1'), t('sec2'), t('sec5')) + (tp.kind === 'groupdoor' ? ', ' + t('withDoor') : ''));
  var col = D.calc.colors.filter(function (x) { return x.id === C.color; })[0];
  if (col) parts.push(L(col, 'name').toLowerCase());
  parts.push(C.q + ' ' + t('pcs').replace(/\.$/, ''));
  return parts.join(', ');
}
function renderCfg() {
  var c = D.calc, tp = typeObj(); if (!tp) return;
  C.type = tp.id;
  $('#types').innerHTML = c.types.filter(function (x) { return x.on; }).map(function (x) { return '<button type="button" class="chip" data-type="' + x.id + '" aria-pressed="' + (x.id === C.type) + '">' + esc(L(x, 'name')) + '</button>'; }).join('');
  var r = nRange(tp);
  $('#sashBox').hidden = r[0] === r[1];
  $('#sashBox legend').textContent = tp.kind === 'window' ? t('f3') : tp.kind === 'balcony' ? t('f3b') : t('f3g');
  var opts = []; for (var n = r[0]; n <= r[1]; n++) { var shown = tp.kind === 'balcony' ? n - 1 : n, tooNarrow = (C.w / n) < 300; opts.push('<button type="button" class="chip" data-n="' + n + '" aria-pressed="' + (n === C.n) + '"' + (tooNarrow ? ' disabled style="opacity:.4"' : '') + '>' + shown + '</button>'); }
  $('#sashes').innerHTML = opts.join('');
  $('#colors').innerHTML = c.colors.filter(function (x) { return x.on; }).map(function (x) { return '<button type="button" data-color="' + x.id + '" aria-pressed="' + (x.id === C.color) + '"><i style="background:' + esc(x.hex) + '"></i>' + esc(L(x, 'name')) + '</button>'; }).join('');
  if (!c.colors.some(function (x) { return x.on && x.id === C.color; })) { var fc = c.colors.filter(function (x) { return x.on; })[0]; C.color = fc ? fc.id : ''; }
  $('#extras').innerHTML = c.extras.filter(function (x) { return x.on; }).map(function (x) { return '<label><input type="checkbox" data-ex="' + x.id + '"' + (C.ex[x.id] ? ' checked' : '') + '>' + esc(L(x, 'name')) + (c.showPrice ? '<span>' + (x.pct ? '+' + x.pct + '%' : x.price ? '+' + money(x.price) : '') + '</span>' : '') + '</label>'; }).join('');
  $('#iw').value = C.w; $('#ih').value = C.h; $('#iq').value = C.q;
  $('#tapHint').hidden = !windowPanes(tp);
  $('#legend').innerHTML = windowPanes(tp) ? ['fix', 'turn', 'tt'].map(function (k) { return '<span>' + legendSym(k) + t('lg_' + k) + '</span>'; }).join('') : '';
  redraw();
}
function redraw() {
  var tp = typeObj(); if (!tp) return;
  var col = D.calc.colors.filter(function (x) { return x.id === C.color; })[0];
  var focused = document.activeElement && document.activeElement.closest && document.activeElement.closest('#cfgDraw .pane');
  var fi = focused ? focused.getAttribute('data-i') : null;
  $('#cfgDraw').innerHTML = drawSVG({ kind: tp.kind, W: C.w, H: C.h, n: tp.kind === 'door' ? 1 : C.n, open: C.open, color: col ? col.hex : '#F4F6F8', interactive: true, label: describe() });
  if (fi != null) { var p = $('#cfgDraw .pane[data-i="' + fi + '"]'); if (p) p.focus(); }
  var pr = calcPrice();
  $('#what').textContent = describe() + (pr.names.length ? '. ' + pr.names.join(', ') : '');
  if (D.calc.showPrice) { $('#rk').textContent = t('rk'); $('#sum').textContent = money(pr.lo).replace(/ ₸$/, '') + ' – ' + money(pr.hi); $('#note').textContent = L(D.calc, 'note') || ''; }
  else { $('#rk').textContent = t('rkOff'); $('#sum').textContent = t('priceOff'); $('#note').textContent = ''; }
}
function clampDim(v, d) { v = parseInt(String(v).replace(/\D/g, ''), 10); if (!isFinite(v)) v = d; return Math.min(6000, Math.max(400, v)); }
$('#types').addEventListener('click', function (e) { var b = e.target.closest('[data-type]'); if (b) pickType(b.dataset.type); });
$('#sashes').addEventListener('click', function (e) { var b = e.target.closest('[data-n]'); if (!b || b.disabled) return; C.n = +b.dataset.n; C.open = defaultOpen(windowPanes(typeObj())); renderCfg(); });
$('#colors').addEventListener('click', function (e) { var b = e.target.closest('[data-color]'); if (!b) return; C.color = b.dataset.color; $$('#colors button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); redraw(); });
$('#extras').addEventListener('change', function (e) { var i = e.target.closest('[data-ex]'); if (!i) return; C.ex[i.dataset.ex] = i.checked; redraw(); });
function cyclePane(el) { var i = +el.getAttribute('data-i'); var cur = C.open[i] || 'fix'; C.open[i] = OPEN_CYCLE[(OPEN_CYCLE.indexOf(cur) + 1) % OPEN_CYCLE.length]; redraw(); }
$('#cfgDraw').addEventListener('click', function (e) { var p = e.target.closest('.pane'); if (p) cyclePane(p); });
$('#cfgDraw').addEventListener('keydown', function (e) { var p = e.target.closest('.pane'); if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); cyclePane(p); } });
document.querySelector('.ctl').addEventListener('click', function (e) {
  var b = e.target.closest('[data-step]'); if (!b) return;
  var a = b.dataset.step.split('|'), d = +a[1];
  if (a[0] === 'w') C.w = clampDim(C.w + d, 1500); else if (a[0] === 'h') C.h = clampDim(C.h + d, 1400); else C.q = Math.min(50, Math.max(1, C.q + d));
  if (a[0] === 'w') { renderCfg(); } else { $('#ih').value = C.h; $('#iq').value = C.q; redraw(); }
});
var dimT = null;
['#iw', '#ih', '#iq'].forEach(function (s) {
  $(s).addEventListener('input', function () { clearTimeout(dimT); var el = this; dimT = setTimeout(function () { var v = parseInt(el.value.replace(/\D/g, ''), 10); if (!isFinite(v)) return; if (s === '#iq') { C.q = Math.min(50, Math.max(1, v)); } else if (v >= 400 && v <= 6000) { if (s === '#iw') C.w = v; else C.h = v; } if (s === '#iw') { var keep = document.activeElement; renderCfg(); if (keep) keep.focus(); } else redraw(); }, 350); });
  $(s).addEventListener('change', function () { if (s === '#iw') C.w = clampDim(this.value, C.w); if (s === '#ih') C.h = clampDim(this.value, C.h); if (s === '#iq') C.q = Math.min(50, Math.max(1, parseInt(this.value, 10) || 1)); renderCfg(); });
});

/* ================= остальные блоки ================= */
function renderSpec() {
  $('#spec').innerHTML = T[lang].svc.map(function (s) {
    return '<div class="row"><div class="ic"><svg viewBox="0 0 64 64"><use href="#' + s[0] + '"/></svg></div><h3>' + esc(s[1]) + '</h3><p>' + esc(s[2]) + '</p>' +
      (s[3] ? '<button class="go" type="button" data-pick="' + s[3] + '">' + t('calcIt') + '</button>' : '<button class="go" type="button" data-zamer>' + t('orderIt') + '</button>') + '</div>';
  }).join('');
}
var wcat = 'all';
function renderWorks() {
  var cats = ['all', 'window', 'door', 'commercial', 'partition'].filter(function (cc) { return cc === 'all' || D.works.some(function (w) { return w.cat === cc; }); });
  if (cats.indexOf(wcat) < 0) wcat = 'all';
  $('#wf').innerHTML = cats.length > 2 ? cats.map(function (cc) { return '<button type="button" class="chip" data-wcat="' + cc + '" aria-pressed="' + (cc === wcat) + '">' + t('w_' + cc) + '</button>'; }).join('') : '';
  var list = D.works.filter(function (w) { return wcat === 'all' || w.cat === wcat; });
  $('#gal').innerHTML = list.map(function (w, i) { var cap = L(w, 'cap') || ''; return '<figure tabindex="0" role="button" data-wi="' + i + '" aria-label="' + esc(cap) + '"><img src="' + esc(Store.img(w.img)) + '" alt="' + esc(cap) + '" loading="lazy" decoding="async" width="640" height="800">' + (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + '</figure>'; }).join('');
  lbList = list;
}
$('#wf').addEventListener('click', function (e) { var b = e.target.closest('[data-wcat]'); if (b) { wcat = b.dataset.wcat; renderWorks(); } });
var lbList = [], lbI = 0;
function showLb() { var w = lbList[lbI]; if (!w) return; $('#lbi').src = Store.img(w.img); $('#lbi').alt = L(w, 'cap') || ''; $('#lbc').textContent = L(w, 'cap') || ''; }
function openLb(i) { lbI = i; showLb(); $('#lb').showModal(); }
$('#gal').addEventListener('click', function (e) { var f = e.target.closest('[data-wi]'); if (f) openLb(+f.dataset.wi); });
$('#gal').addEventListener('keydown', function (e) { var f = e.target.closest('[data-wi]'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openLb(+f.dataset.wi); } });
$('#lbp').onclick = function () { lbI = (lbI - 1 + lbList.length) % lbList.length; showLb(); };
$('#lbn').onclick = function () { lbI = (lbI + 1) % lbList.length; showLb(); };
$('#lb').addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') $('#lbp').click(); if (e.key === 'ArrowRight') $('#lbn').click(); });
var tx0 = null; $('#lb').addEventListener('touchstart', function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
$('#lb').addEventListener('touchend', function (e) { if (tx0 == null) return; var dx = e.changedTouches[0].clientX - tx0; tx0 = null; if (Math.abs(dx) > 50) (dx > 0 ? $('#lbp') : $('#lbn')).click(); });

function renderReviews() {
  $('#revs').innerHTML = D.reviews.map(function (r) { return '<article class="rv"><div class="stars" aria-label="5 из 5">' + '<svg><use href="#i-star"/></svg>'.repeat(Math.min(5, Math.max(1, +r.stars || 5))) + '</div><blockquote>' + esc(r.text) + '</blockquote><div class="who">' + esc(r.name) + (r.date ? '<small>' + esc(r.date) + '</small>' : '') + '</div></article>'; }).join('');
  $('#reviews').hidden = !D.reviews.length;
}
function renderFaq() { $('#faqList').innerHTML = T[lang].faq.map(function (q) { return '<details><summary>' + esc(q[0]) + '</summary><p>' + esc(q[1]) + '</p></details>'; }).join(''); }

function waUrl(text) { return 'https://wa.me/' + String(S.wa || '77478653002').replace(/\D/g, '') + '?text=' + encodeURIComponent(text); }
function applySettings() {
  S = D.settings;
  $$('[data-s]').forEach(function (el) { var k = el.getAttribute('data-s'), kk = el.getAttribute('data-skk'); var v = (lang === 'kk' && kk && S[kk]) ? S[kk] : S[k]; if (v != null && v !== '') el.textContent = v; });
  $$('[data-s-href]').forEach(function (a) { var v = S[a.getAttribute('data-s-href')]; if (v) { a.href = v; a.hidden = false; } else a.hidden = true; });
  var tel = 'tel:+' + String(S.phone || '').replace(/\D/g, '');
  $('#telLink').href = tel; $('#telBar').href = tel;
  $$('[data-wa]').forEach(function (a) { a.href = waUrl(t('waHello')); a.target = '_blank'; a.rel = 'noopener'; });
  var an = lang === 'kk' && S.announce_kk ? S.announce_kk : S.announce;
  $('#ann').hidden = !an; $('#ann').textContent = an || '';
}

/* ================= язык и тема ================= */
function setLang(l) {
  lang = l; store('bj-lang', l); document.documentElement.lang = l === 'kk' ? 'kk' : 'ru';
  $$('[data-t]').forEach(function (el) { var v = T[l][el.getAttribute('data-t')]; if (v != null && typeof v === 'string') el.textContent = v; });
  $$('[data-tp]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-tp')); });
  $$('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l); });
  document.title = l === 'kk' ? 'BJ PLAST — Астанадағы терезе, есік, витраж және тамбур | өлшеу тегін' : 'BJ PLAST — окна, двери, витражи и тамбуры в Астане | замер бесплатно';
  renderHero(); renderSpec(); renderFaq();
  if (D) { applySettings(); renderWorks(); renderCfg(); renderReviews(); }
}
function setTheme(m) {
  store('bj-theme', m);
  if (m === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', m);
  $$('#th button').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-th') === m); });
}
$$('[data-lang]').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
$$('#th button').forEach(function (b) { b.onclick = function () { setTheme(b.getAttribute('data-th')); }; });
setTheme(store('bj-theme') || 'auto');

function renderHero() {
  $('#heroDraw').innerHTML = drawSVG({ kind: 'window', W: 1500, H: 1400, n: 2, open: ['fix', 'tt'], color: '#F4F6F8', scene: true, heroAnim: true, label: t('cap') });
}

/* ================= заявки ================= */
function phoneOk(p) { return String(p || '').replace(/\D/g, '').length >= 10; }
function toast(m) { var el = $('#toast'); el.textContent = m; el.classList.add('on'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('on'); }, 3000); }
function finish(box, ok, waText) {
  var body = box.querySelector('[id$="body"]'), msg = box.querySelector('.okmsg');
  body.hidden = true; msg.hidden = false;
  msg.querySelector('h3').textContent = ok ? t('okh') : t('failH');
  var p = msg.querySelector('p'); if (!ok) p.textContent = t('fail'); else p.textContent = box.id === 'oform' ? t('okt2') : t('okt');
  var wa = msg.querySelector('.wa-go');
  if (!wa) { wa = document.createElement('a'); wa.className = 'btn p wa-go'; wa.target = '_blank'; wa.rel = 'noopener'; wa.innerHTML = '<svg><use href="#i-wa"/></svg><span></span>'; msg.insertBefore(wa, msg.querySelector('[data-close]') || null); }
  wa.querySelector('span').textContent = t('waGo'); wa.href = waUrl(waText);
  var old = msg.querySelector('a[data-wa]'); if (old) old.remove();
}
function resetForm(box) { var body = box.querySelector('[id$="body"]'), msg = box.querySelector('.okmsg'); body.hidden = false; msg.hidden = true; box.querySelector('.err').textContent = ''; }
function submitOrder(form, kind) {
  var f = form.elements, err = form.querySelector('.err');
  if (!phoneOk(f.phone.value)) { err.textContent = t('errPhone'); f.phone.focus(); return; }
  err.textContent = '';
  var o = { kind: kind, name: f.name.value.trim(), phone: f.phone.value.trim(), address: f.address.value.trim(), hp: f.hp.value, lang: lang };
  var lines;
  if (kind === 'calc') {
    var pr = calcPrice(), tp = typeObj();
    o.item = describe(); o.size = C.w + ' × ' + C.h + ' мм'; o.opts = pr.names.join(', '); o.price = D.calc.showPrice ? money(pr.lo).replace(/ ₸$/, '') + ' – ' + money(pr.hi) : '';
    lines = [t('waCalc') + ':', o.item + (o.opts ? '. ' + t('lOpts') + ': ' + o.opts : '')];
    if (o.price) lines.push(t('lPrice') + ': ' + o.price);
  } else { o.comment = f.comment.value.trim(); lines = [t('waZamer')]; if (o.comment) lines.push(o.comment); }
  if (o.name) lines.push(t('lName') + ': ' + o.name);
  lines.push(t('lPhone') + ': ' + o.phone);
  if (o.address) lines.push(t('lAddr') + ': ' + o.address);
  var btn = form.querySelector('button[type=submit]'), lbl = btn.querySelector('span'), keep = lbl.textContent;
  btn.disabled = true; lbl.textContent = t('sending');
  Store.createOrder(o).then(function (id) {
    btn.disabled = false; lbl.textContent = keep;
    if (id && id !== true) lines.unshift(t('waNo') + id);
    finish(form, !!id, lines.join('\n'));
    if (id) { form.reset(); }
  });
}
$('#zform').addEventListener('submit', function (e) { e.preventDefault(); submitOrder(this, 'zamer'); });
$('#oform').addEventListener('submit', function (e) { e.preventDefault(); submitOrder(this, 'calc'); });
$('#sendCalc').onclick = function () { resetForm($('#oform')); $('#recap').textContent = describe() + (D.calc.showPrice ? '. ' + $('#sum').textContent : ''); $('#dlgOrder').showModal(); };
document.addEventListener('click', function (e) {
  var z = e.target.closest('[data-zamer]'); if (z) { e.preventDefault(); resetForm($('#zform')); $('#contacts').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); setTimeout(function () { $('#zform [name=phone]').focus({ preventScroll: true }); }, 600); return; }
  var p = e.target.closest('[data-pick]'); if (p) { pickType(p.dataset.pick); $('#calc').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); return; }
  var c = e.target.closest('[data-close]'); if (c) { var d = c.closest('dialog'); if (d) d.close(); }
});
$$('dialog').forEach(function (d) { d.addEventListener('click', function (e) { if (e.target === d) d.close(); }); });
$('#gear').onclick = $('#gear2').onclick = function () { $('#dlgSet').showModal(); };

/* шапка и нижняя панель */
var hdr = $('#hdr'), bar = $('#bar');
function onScroll() { var y = window.scrollY; hdr.classList.toggle('sc', y > 8); bar.classList.toggle('on', y > 520); }
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* старт */
setLang(lang);
Store.load().then(function (d) {
  D = d;
  var first = D.calc.types.filter(function (x) { return x.on; })[0];
  D.calc.extras.forEach(function (x) { if (x.def) C.ex[x.id] = true; });
  if (first) pickType(first.id);
  setLang(lang);
}).catch(function () { toast('Не удалось загрузить данные'); });
})();
