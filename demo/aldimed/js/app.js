(function () {
  var S = window.AStore, D = S.load(), st = D.settings, $ = function (id) { return document.getElementById(id); }, esc = S.esc;
  var DAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
  var ICONS = {
    gyn: '<circle cx="12" cy="9" r="5"/><path d="M12 14v8M9 19h6"/>',
    uzi: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 12c1.5-4 3-4 5 0s3.5 4 5 0M8 20h8M12 16v4"/>',
    uro: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
    gastro: '<path d="M9 3v4c0 2-3 3-3 7a6 6 0 0 0 6 6c4 0 6-3 6-6 0-2-1.5-3-3.5-3S12 12 12 9V3"/>',
    derm: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3"/>',
    endo: '<path d="M3 12h4l2-5 4 10 2-5h6"/>',
    nephro: '<path d="M15 4c-4 0-7 3-7 8s3 8 7 8c2.5 0 4-2 4-4 0-1.5-1-2.5-2.5-3 1.5-.5 2.5-1.5 2.5-3 0-3-1.5-6-4-6z"/><path d="M8 12H4"/>',
    surg: '<rect x="4" y="4" width="16" height="16" rx="4"/><path d="M12 8v8M8 12h8"/>',
    trauma: '<path d="M8 4a2.5 2.5 0 0 0-3.5 3.5L6 9l9 9 1.5 1.5A2.5 2.5 0 0 0 20 16l-1.5-1.5L9 5 8 4z"/><path d="M15 6l3-3M6 15l-3 3"/>',
    lab: '<path d="M9 2h6M10 2v13a2 2 0 0 0 4 0V2M10 9h4M5 22h14"/>',
    cosmo: '<path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>'
  };
  var icon = function (k, s) { return '<svg width="' + (s || 24) + '" height="' + (s || 24) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[k] || ICONS.surg) + '</svg>'; };
  var initials = function (n) { var p = n.replace(/\./g, ' ').split(/\s+/).filter(Boolean); return (p[0] || '')[0] + ((p[1] || '')[0] || ''); };
  var short = function (n) { var p = n.split(/\s+/); return p.length >= 3 ? p[0] + ' ' + p[1][0] + '. ' + p[2][0] + '.' : n; };
  var waMain = function (t) { return S.wa(st.wa, t); };
  var toast = function (t) { var el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(function () { el.classList.remove('on'); }, 2200); };
  var groupOf = {}; D.groups.forEach(function (g) { groupOf[g.id] = g; });
  var svcById = {}; D.services.forEach(function (s) { svcById[s.id] = s; });
  var docs = D.doctors.filter(function (d) { return d.on !== false; });
  var docById = {}; docs.forEach(function (d) { docById[d.id] = d; });
  var promos = S.activePromos(D), promoBySvc = {}; promos.forEach(function (p) { if (p.service) promoBySvc[p.service] = p; });
  var dirName = {}; D.directions.forEach(function (d) { dirName[d.id] = d.name; });

  /* ---------- шапка, контакты ---------- */
  var mainPhone = st.phones[0] ? st.phones[0].value : '';
  if (st.notice && st.notice.on && st.notice.text) { $('notice').textContent = st.notice.text; $('notice').hidden = false; }
  var live = function () { var s = S.status(st.hours); $('live').className = 'live' + (s.open ? ' on' : ''); $('live').lastChild.textContent = s.text; };
  live(); setInterval(live, 60000);
  $('topAddr').textContent = st.city + ', ' + st.address;
  var land = st.phones[2] || st.phones[0];
  $('topTel').textContent = land.value; $('topTel').href = S.tel(land.value);
  $('hdrTel').innerHTML = esc(mainPhone) + '<small>WhatsApp · запись</small>'; $('hdrTel').href = S.tel(mainPhone);
  $('mTel').href = S.tel(land.value);
  ['heroWa', 'mWa', 'cWa'].forEach(function (id) { $(id).href = waMain('Здравствуйте! Пишу с сайта ALDIMED.'); });
  window.addEventListener('scroll', function () { $('hdr').classList.toggle('sc', scrollY > 10); }, { passive: true });
  $('burger').onclick = function () { $('mnav').classList.add('on'); };
  $('mnav').onclick = function (e) { if (e.target === this || e.target.id === 'mnavX' || e.target.tagName === 'A') this.classList.remove('on'); };

  /* ---------- hero ---------- */
  $('hRating').textContent = st.rating + ' в 2ГИС';
  $('hEyebrow').textContent = D.hero.eyebrow;
  $('hTitle').innerHTML = D.hero.title;
  $('hText').textContent = D.hero.text;
  $('hImg').src = D.hero.img; $('hImg2').src = D.hero.img2; $('hImg3').src = D.hero.img3;
  $('cRating').textContent = st.rating + ' из 5'; $('cCount').textContent = st.ratingCount + ' оценок в 2ГИС';
  var uziCount = D.services.filter(function (s) { return groupOf[s.g] && groupOf[s.g].cat === 'uzi'; }).length;
  $('stats').innerHTML = [[st.rating + ' ★', st.ratingCount + ' оценок в 2ГИС'], [docs.length, 'врачей разных профилей'], [uziCount + '+', 'видов УЗИ, включая 3D/4D'], ['Пн–Сб', 'анализы INVIVO без записи']]
    .map(function (s) { return '<div class="rv"><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></div>'; }).join('');

  /* ---------- акции ---------- */
  $('promos').innerHTML = promos.map(function (p) {
    var left = '';
    if (p.until) { var ms = new Date(p.until + 'T23:59:59+05:00') - new Date(); var dd = Math.ceil(ms / 864e5); left = dd <= 1 ? 'Последний день акции' : 'До ' + S.fmtDate(p.until) + ' · осталось ' + dd + ' ' + (dd % 10 === 1 && dd % 100 !== 11 ? 'день' : dd % 10 >= 2 && dd % 10 <= 4 && (dd % 100 < 10 || dd % 100 >= 20) ? 'дня' : 'дней'); }
    return '<div class="promo rv"><span class="tag">Акция</span><div style="position:relative;z-index:1"><h3>' + esc(p.title) + '</h3><p>' + esc(p.text) + '</p><div class="left">' + esc(left) + '</div></div>' +
      '<div style="position:relative;z-index:1"><div class="pr">' + (p.oldPrice ? '<s>' + S.money(p.oldPrice) + '</s>' : '') + (p.price ? '<b>' + S.money(p.price) + '</b>' : '') + '</div>' +
      '<button class="btn btn-white" style="margin-top:12px" data-book="' + (p.service ? 'svc:' + esc(p.service) : '') + '" data-promo="' + esc(p.id) + '">Записаться по акции</button></div></div>';
  }).join('');

  /* ---------- направления ---------- */
  $('dirs').innerHTML = D.directions.map(function (d) {
    var n = docs.filter(function (x) { return x.dir === d.id; }).length, sub;
    if (d.id === 'lab') sub = 'Без записи, INVIVO'; else if (d.id === 'cosmo') sub = D.services.filter(function (s) { return s.g === 'cos'; }).length + ' процедур';
    else if (d.id === 'uzi') sub = uziCount + ' видов исследований'; else sub = n ? n + ' ' + (n === 1 ? 'врач' : n < 5 ? 'врача' : 'врачей') : 'Консультации';
    return '<button class="dir rv" data-dir="' + d.id + '"><span class="di">' + icon(d.icon) + '</span><span><b>' + esc(d.name) + '</b><small>' + esc(sub) + '</small></span></button>';
  }).join('');
  $('dirs').onclick = function (e) {
    var b = e.target.closest('[data-dir]'); if (!b) return; var id = b.dataset.dir;
    if (id === 'lab') { setTab('lab'); go('prices'); } else if (id === 'cosmo') { setTab('cosmo'); go('prices'); } else if (id === 'uzi') { go('uzi'); }
    else { docFilter = id; renderDocs(); go('doctors'); }
  };
  var go = function (id) { var el = $(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  /* ---------- врачи ---------- */
  var docFilter = 'all';
  var dirsWithDocs = D.directions.filter(function (d) { return docs.some(function (x) { return x.dir === d.id; }); });
  function renderDocs() {
    $('docChips').innerHTML = [{ id: 'all', name: 'Все врачи' }].concat(dirsWithDocs).map(function (d) { return '<button data-f="' + d.id + '" aria-pressed="' + (docFilter === d.id) + '">' + esc(d.name) + '</button>'; }).join('');
    var list = docs.filter(function (d) { return docFilter === 'all' || d.dir === docFilter; });
    $('docs').innerHTML = list.map(function (d) {
      return '<article class="doc"><div class="tp"><div class="av">' + (d.photo ? '<img src="' + esc(d.photo) + '" alt="' + esc(d.name) + '" loading="lazy">' : esc(initials(d.name))) + '</div><div><h3>' + esc(d.name) + '</h3><span class="role">' + esc(d.role) + '</span></div></div>' +
        '<p>' + esc(d.about) + '</p><div class="meta">' + (d.price ? '<span><svg class="ico" style="width:16px;height:16px"><use href="#i-card"/></svg>Приём — ' + S.money(d.price) + '</span>' : '') + (d.days ? '<span><svg class="ico" style="width:16px;height:16px"><use href="#i-cal"/></svg>' + esc(d.days) + '</span>' : '') + '</div>' +
        '<div class="act"><button class="btn btn-main btn-sm" data-book="doc:' + d.id + '">Записаться</button><a class="btn btn-ghost btn-sm" style="flex:none" href="' + waMain('Здравствуйте! Вопрос по приёму врача: ' + d.name + ' (' + d.role + ')') + '" target="_blank" rel="noopener" aria-label="Задать вопрос в WhatsApp"><svg class="ico"><use href="#i-wa"/></svg></a></div></article>';
    }).join('');
  }
  $('docChips').onclick = function (e) { var b = e.target.closest('[data-f]'); if (b) { docFilter = b.dataset.f; renderDocs(); } };
  renderDocs();

  /* ---------- прайс ---------- */
  $('uziImg').src = D.photos.preg; $('labImg').src = D.photos.lab;
  var pcat = 'uzi', pq = '';
  var priceHtml = function (s) {
    var pr = promoBySvc[s.id];
    if (pr && pr.price) return '<s>' + S.money(pr.oldPrice || s.price) + '</s><b>' + S.money(pr.price) + '</b>';
    if (s.price) return '<b>' + S.money(s.price) + '</b>';
    return '<button class="ask" data-ask="' + s.id + '">Узнать цену</button>';
  };
  function renderPrices() {
    var q = pq.toLowerCase(), total = 0;
    $('pgrid').innerHTML = D.groups.filter(function (g) { return g.cat === pcat; }).map(function (g) {
      var items = D.services.filter(function (s) { return s.g === g.id && (s.on !== false) && (!q || (s.name + ' ' + s.note).toLowerCase().indexOf(q) >= 0); });
      total += items.length; if (!items.length) return '';
      return '<div class="pgroup"><h3>' + esc(g.name) + '<small>' + items.length + '</small></h3>' + items.map(function (s) {
        return '<div class="prow"><div><div class="nm">' + esc(s.name) + (s.hit ? '<span class="hit">ХИТ</span>' : '') + (promoBySvc[s.id] ? '<span class="hit">АКЦИЯ</span>' : '') + '</div>' + (s.note ? '<div class="nt">' + esc(s.note) + '</div>' : '') + '</div>' +
          '<div class="pv">' + priceHtml(s) + '<button class="bk" data-book="svc:' + s.id + '">' + (pcat === 'lab' ? 'Оставить заявку' : 'Записаться') + '</button></div></div>';
      }).join('') + '</div>';
    }).join('') || '<p class="pnote">Ничего не нашли. Напишите нам в WhatsApp — подскажем.</p>';
    $('pcount').textContent = total + ' ' + (total % 10 === 1 && total % 100 !== 11 ? 'услуга' : total % 10 >= 2 && total % 10 <= 4 && (total % 100 < 10 || total % 100 >= 20) ? 'услуги' : 'услуг');
  }
  function setTab(c) { pcat = c; document.querySelectorAll('#ptabs button').forEach(function (b) { b.setAttribute('aria-selected', b.dataset.c === c); }); renderPrices(); }
  $('ptabs').onclick = function (e) { var b = e.target.closest('[data-c]'); if (b) setTab(b.dataset.c); };
  $('pq').oninput = function () { pq = this.value.trim(); renderPrices(); };
  $('pgrid').addEventListener('click', function (e) { var a = e.target.closest('[data-ask]'); if (a) window.open(waMain('Здравствуйте! Подскажите, пожалуйста, стоимость: ' + svcById[a.dataset.ask].name), '_blank'); });
  document.addEventListener('click', function (e) { var t = e.target.closest('[data-tab]'); if (t) setTab(t.dataset.tab); var p = e.target.closest('[data-prep]'); if (p) setPrep(p.dataset.prep); });
  renderPrices();

  /* ---------- подготовка ---------- */
  var prepKeys = Object.keys(D.prep), prepCur = prepKeys[0];
  function setPrep(k) {
    prepCur = k;
    $('prepNav').innerHTML = prepKeys.map(function (x) { return '<button role="tab" data-p="' + x + '" aria-selected="' + (x === k) + '">' + esc(D.prep[x].t) + '</button>'; }).join('');
    var p = D.prep[k], rel = D.services.filter(function (s) { return s.prep === k; }).slice(0, 6);
    $('prepBody').innerHTML = '<h3 style="font-size:24px">' + esc(p.t) + '</h3><ol>' + p.items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ol>' +
      (rel.length ? '<p class="hint" style="margin-top:20px">Подходит для: ' + rel.map(function (s) { return esc(s.name); }).join(', ') + (D.services.filter(function (s) { return s.prep === k; }).length > 6 ? ' и др.' : '') + '</p>' : '') +
      '<div class="warn">Это общие рекомендации. Если врач назначил особую подготовку — следуйте ей. Есть вопросы — <a href="' + waMain('Здравствуйте! Вопрос по подготовке: ' + p.t) + '" target="_blank" rel="noopener" style="font-weight:700;text-decoration:underline">напишите регистратору</a>.</div>';
  }
  $('prepNav').onclick = function (e) { var b = e.target.closest('[data-p]'); if (b) setPrep(b.dataset.p); };
  setPrep(prepCur);

  /* ---------- отзывы, FAQ ---------- */
  $('rsum').href = st.gis + '/tab/reviews';
  $('rsum').innerHTML = '<b>' + esc(st.rating) + '</b><div><span class="st">★★★★★</span><small>' + esc(st.ratingCount) + ' оценок · ' + esc(st.reviewsCount) + ' отзывов в 2ГИС →</small></div>';
  $('revs').innerHTML = D.reviews.map(function (r) { return '<div class="rev"><span class="st">★★★★★</span><p>' + esc(r.text) + '</p><div class="who"><span class="ini">' + esc(r.name[0]) + '</span><span>' + esc(r.name) + '<small>2ГИС · ' + esc(r.date) + '</small></span></div></div>'; }).join('');
  $('faqList').innerHTML = D.faq.map(function (f, i) { return '<details' + (i === 0 ? ' open' : '') + '><summary>' + esc(f.q) + '</summary><p>' + esc(f.a) + '</p></details>'; }).join('');

  /* ---------- контакты ---------- */
  var today = S.now().getDay();
  $('hrs').innerHTML = S.hoursText(st.hours).map(function (h) { return '<div><span>' + esc(h.days) + '</span><b>' + esc(h.time) + '</b></div>'; }).join('');
  $('clist').innerHTML = '<a href="' + st.gis + '" target="_blank" rel="noopener"><span class="ci"><svg class="ico"><use href="#i-pin"/></svg></span><span><small>' + esc(st.city) + '</small><b>' + esc(st.address) + '</b><small>' + esc(st.addressNote) + '</small></span></a>' +
    st.phones.map(function (p) { var isWa = /whatsapp/i.test(p.label); return '<a href="' + (isWa ? S.wa(p.value, 'Здравствуйте!') : S.tel(p.value)) + '"' + (isWa ? ' target="_blank" rel="noopener"' : '') + '><span class="ci"><svg class="ico"><use href="#' + (isWa ? 'i-wa' : 'i-phone') + '"/></svg></span><span><small>' + esc(p.label) + '</small><b>' + esc(p.value) + '</b></span></a>'; }).join('') +
    '<a href="https://instagram.com/' + esc(st.instagram) + '" target="_blank" rel="noopener"><span class="ci"><svg class="ico"><use href="#i-ig"/></svg></span><span><small>Instagram</small><b>@' + esc(st.instagram) + '</b></span></a>';
  var dl = 0.006, dt = 0.0032;
  $('map').innerHTML = '<iframe title="ALDIMED на карте" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=' + (st.lon - dl) + ',' + (st.lat - dt) + ',' + (st.lon + dl) + ',' + (st.lat + dt) + '&layer=mapnik&marker=' + st.lat + ',' + st.lon + '"></iframe>' +
    '<div class="mb"><a class="btn btn-main btn-sm" href="' + st.gis + '" target="_blank" rel="noopener"><svg class="ico"><use href="#i-pin"/></svg>Маршрут в 2ГИС</a><a class="btn btn-white btn-sm" href="https://yandex.kz/maps/?pt=' + st.lon + ',' + st.lat + '&z=17&l=map" target="_blank" rel="noopener">Яндекс Карты</a></div>';
  $('fLic').textContent = st.license + '.';
  $('fAddr').textContent = st.city + ', ' + st.address;
  $('fTel').innerHTML = st.phones.map(function (p) { return '<p><a href="' + S.tel(p.value) + '">' + esc(p.value) + '</a></p>'; }).join('');
  $('fIg').href = 'https://instagram.com/' + st.instagram; $('fGis').href = st.gis;
  $('yr').textContent = new Date().getFullYear();

  /* ---------- поиск ---------- */
  var index = docs.map(function (d) { return { t: 'doc', id: d.id, name: d.name, sub: d.role, tag: 'Врач', hay: (d.name + ' ' + d.role + ' ' + (dirName[d.dir] || '')).toLowerCase() }; })
    .concat(D.services.filter(function (s) { return s.on !== false; }).map(function (s) { var g = groupOf[s.g]; return { t: 'svc', id: s.id, name: s.name, sub: (g ? g.name : '') + (s.price ? ' · ' + S.money((promoBySvc[s.id] || {}).price || s.price) : ''), tag: g && g.cat === 'lab' ? 'Анализ' : g && g.cat === 'cosmo' ? 'Процедура' : 'УЗИ', hay: (s.name + ' ' + s.note + ' ' + (g ? g.name : '')).toLowerCase() }; }));
  var sres = $('sres'), sAct = 0, sList = [];
  function search() {
    var q = $('q').value.trim().toLowerCase();
    if (q.length < 2) { sres.classList.remove('on'); return; }
    var words = q.split(/\s+/).map(function (w) { return w.slice(0, Math.max(3, w.length - 2)); });
    sList = index.filter(function (x) { return words.every(function (w) { return x.hay.indexOf(w) >= 0; }); }).slice(0, 8); sAct = 0;
    sres.innerHTML = sList.length ? sList.map(function (x, i) { return '<button role="option" data-i="' + i + '" class="' + (i === 0 ? 'act' : '') + '"><span><b>' + esc(x.name) + '</b><small>' + esc(x.sub) + '</small></span><span class="tg">' + x.tag + '</span></button>'; }).join('') : '<div class="empty">Не нашли? Напишите в WhatsApp — регистратор подскажет врача.</div>';
    sres.classList.add('on');
  }
  function pick(i) { var x = sList[i]; if (!x) return; sres.classList.remove('on'); openBooking(x.t === 'doc' ? 'doc:' + x.id : 'svc:' + x.id); }
  $('q').addEventListener('input', search);
  $('q').addEventListener('keydown', function (e) {
    if (!sres.classList.contains('on')) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); sAct = (sAct + (e.key === 'ArrowDown' ? 1 : -1) + sList.length) % Math.max(sList.length, 1); sres.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('act', i === sAct); }); }
    if (e.key === 'Enter') { e.preventDefault(); pick(sAct); }
    if (e.key === 'Escape') sres.classList.remove('on');
  });
  sres.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) pick(+b.dataset.i); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) sres.classList.remove('on'); });

  /* ---------- онлайн-запись ---------- */
  var B, step;
  var CATS = [{ id: 'doc', name: 'Приём врача', ic: 'surg' }, { id: 'uzi', name: 'УЗИ', ic: 'uzi' }, { id: 'lab', name: 'Анализы', ic: 'lab' }, { id: 'cosmo', name: 'Косметология', ic: 'cosmo' }];
  var catOfSvc = function (s) { var g = groupOf[s.g]; return g ? g.cat : 'uzi'; };
  function itemsOf(cat) {
    if (cat === 'doc') return docs.map(function (d) { return { v: d.id, t: d.role + ' — ' + short(d.name) }; });
    return D.services.filter(function (s) { return s.on !== false && catOfSvc(s) === cat; }).map(function (s) { return { v: s.id, t: s.name + (s.note && s.note.length < 30 ? ' (' + s.note + ')' : ''), g: groupOf[s.g].name }; });
  }
  function itemLabel() {
    if (!B.item) return '';
    if (B.cat === 'doc') { var d = docById[B.item]; return d ? 'Приём: ' + d.name + ' (' + d.role.toLowerCase() + ')' : ''; }
    var s = svcById[B.item]; return s ? s.name + (s.note ? ' — ' + s.note : '') : '';
  }
  function openBooking(arg) {
    B = { cat: 'doc', item: '', date: '', time: '', name: '', phone: '', note: '', promo: '' };
    arg = arg || '';
    if (arg.indexOf('doc:') === 0) { B.cat = 'doc'; B.item = arg.slice(4); }
    else if (arg.indexOf('svc:') === 0) { var s = svcById[arg.slice(4)]; if (s) { B.cat = catOfSvc(s); B.item = s.id; } }
    else if (['uzi', 'lab', 'cosmo', 'doc'].indexOf(arg) >= 0) B.cat = arg;
    step = 1; renderBk(); $('bkOv').classList.add('on'); document.body.style.overflow = 'hidden';
    setTimeout(function () { var f = $('bkBody').querySelector('select,input'); if (f && matchMedia('(min-width:700px)').matches) f.focus(); }, 60);
  }
  function closeBk() { $('bkOv').classList.remove('on'); document.body.style.overflow = ''; }
  $('bkX').onclick = closeBk;
  $('bkOv').addEventListener('click', function (e) { if (e.target === this) closeBk(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('bkOv').classList.contains('on')) closeBk(); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-book]'); if (!b) return; e.preventDefault(); $('mnav').classList.remove('on');
    openBooking(b.getAttribute('data-book')); if (b.dataset.promo) B.promo = b.dataset.promo;
  });

  function slots(ymd) {
    var d = new Date(ymd + 'T00:00:00'), h = st.hours[d.getDay()]; if (!h) return [];
    var out = [], from = S.mins(h[0]), to = S.mins(h[1]) - 30, n = S.now(), isToday = ymd === S.ymd(n), minNow = n.getHours() * 60 + n.getMinutes() + 60;
    for (var m = from; m <= to; m += 30) out.push({ t: String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'), off: isToday && m < minNow });
    return out;
  }
  function days() {
    var out = [], n = S.now();
    for (var i = 0; i < 14; i++) { var d = new Date(n.getFullYear(), n.getMonth(), n.getDate() + i), y = S.ymd(d); var sl = slots(y); out.push({ y: y, d: d, off: !sl.some(function (s) { return !s.off; }) }); }
    return out;
  }
  function renderBk() {
    $('bkProg').style.width = (step === 4 ? 100 : step * 33.3) + '%';
    var h = '', lab = B.cat === 'lab';
    if (step === 1) {
      $('bkTitle').textContent = 'Запись на приём';
      var its = itemsOf(B.cat), groups = {};
      h += '<div class="seg" id="bkCat">' + CATS.map(function (c) { return '<button type="button" data-cat="' + c.id + '" aria-pressed="' + (B.cat === c.id) + '">' + icon(c.ic, 22) + c.name + '</button>'; }).join('') + '</div>';
      h += '<label for="bkItem">' + (B.cat === 'doc' ? 'Врач' : B.cat === 'lab' ? 'Анализ или комплекс' : 'Услуга') + '</label><select id="bkItem"><option value="">— выберите —</option>';
      if (B.cat === 'doc') h += its.map(function (o) { return '<option value="' + o.v + '"' + (o.v === B.item ? ' selected' : '') + '>' + esc(o.t) + '</option>'; }).join('');
      else { its.forEach(function (o) { (groups[o.g] = groups[o.g] || []).push(o); }); Object.keys(groups).forEach(function (g) { h += '<optgroup label="' + esc(g) + '">' + groups[g].map(function (o) { return '<option value="' + o.v + '"' + (o.v === B.item ? ' selected' : '') + '>' + esc(o.t) + '</option>'; }).join('') + '</optgroup>'; }); }
      h += '</select><div class="hint" id="bkHint"></div>';
      if (lab) h += '<div class="warn" style="margin-top:14px;padding:12px 14px;border-radius:12px;background:#eef7ff;color:#14427f;font-size:14px">Анализы можно сдать <b>без записи</b> в часы работы. Заявка нужна, если хотите, чтобы регистратор уточнил подготовку и стоимость.</div>';
      h += '<div class="err" id="bkErr"></div><div class="bk-f"><button class="btn btn-main" id="bkNext">Далее</button></div>';
    } else if (step === 2) {
      $('bkTitle').textContent = 'Дата и время';
      var ds = days(); if (!B.date) { var f = ds.filter(function (x) { return !x.off; })[0]; B.date = f ? f.y : ''; }
      h += '<label>' + (lab ? 'Когда планируете прийти? (необязательно)' : 'Дата') + '</label><div class="days" id="bkDays">' + ds.map(function (x) { return '<button type="button" data-d="' + x.y + '" aria-pressed="' + (B.date === x.y) + '"' + (x.off ? ' disabled' : '') + '>' + DAYS[x.d.getDay()] + '<b>' + x.d.getDate() + '</b>' + ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'][x.d.getMonth()] + '</button>'; }).join('') + '</div>';
      var sl = B.date ? slots(B.date) : [];
      h += '<label>Желаемое время</label><div class="times" id="bkTimes">' + sl.map(function (s) { return '<button type="button" data-t="' + s.t + '" aria-pressed="' + (B.time === s.t) + '"' + (s.off ? ' disabled' : '') + '>' + s.t + '</button>'; }).join('') + '</div>';
      h += '<p class="hint">Регистратор подтвердит время в WhatsApp или предложит ближайшее свободное.</p><div class="err" id="bkErr"></div><div class="bk-f"><button class="btn btn-ghost" id="bkBack">Назад</button><button class="btn btn-main" id="bkNext">Далее</button></div>';
    } else if (step === 3) {
      $('bkTitle').textContent = 'Ваши контакты';
      h += '<div class="sum">' + sumRows() + '</div>';
      h += '<label for="bkName">Имя</label><input id="bkName" autocomplete="name" placeholder="Как к вам обращаться" value="' + esc(B.name) + '">';
      h += '<label for="bkPhone">Телефон (WhatsApp)</label><input id="bkPhone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+7 7__ ___ __ __" value="' + esc(B.phone) + '">';
      h += '<label for="bkNote">Комментарий</label><textarea id="bkNote" placeholder="Жалобы, срок беременности, вопросы — по желанию">' + esc(B.note) + '</textarea>';
      h += '<div class="err" id="bkErr"></div><div class="bk-f"><button class="btn btn-ghost" id="bkBack">Назад</button><button class="btn btn-main" id="bkSend"><svg class="ico"><use href="#i-wa"/></svg>Отправить заявку</button></div><p class="hint">Нажимая «Отправить», вы соглашаетесь на обработку персональных данных для записи на приём.</p>';
    } else {
      $('bkTitle').textContent = 'Заявка отправлена';
      h += '<div class="done"><div class="ok"><svg width="36" height="36"><use href="#i-check"/></svg></div><h3 style="font-size:22px">Спасибо, ' + esc(B.name) + '!</h3><p style="color:var(--mute);margin:10px 0 18px">Заявка открылась в WhatsApp — отправьте сообщение, и регистратор подтвердит время.</p></div><div class="sum">' + sumRows() + '</div>';
      h += '<div class="bk-f"><a class="btn btn-wa" href="' + B.link + '" target="_blank" rel="noopener"><svg class="ico"><use href="#i-wa"/></svg>Открыть WhatsApp ещё раз</a><button class="btn btn-ghost" id="bkClose">Готово</button></div>';
    }
    $('bkBody').innerHTML = h; wire();
  }
  function sumRows() {
    var r = [['Услуга', itemLabel()]];
    if (B.date) r.push(['Дата', S.fmtDate(B.date) + ', ' + DAYS[new Date(B.date + 'T00:00:00').getDay()] + (B.time ? ' · ' + B.time : '')]);
    var s = svcById[B.item], pr = s && promoBySvc[s.id];
    if (pr && pr.price) r.push(['Цена по акции', S.money(pr.price)]); else if (s && s.price) r.push(['Стоимость', S.money(s.price)]); else if (B.cat === 'doc' && docById[B.item] && docById[B.item].price) r.push(['Стоимость приёма', S.money(docById[B.item].price)]);
    if (step === 4) r.push(['Пациент', B.name + ', ' + B.phone]);
    return r.map(function (x) { return '<div><span>' + esc(x[0]) + '</span><b>' + esc(x[1]) + '</b></div>'; }).join('');
  }
  function fmtPhone(v) {
    var d = S.digits(v), r = d;
    if (r[0] === '7' || r[0] === '8') r = r.slice(1);
    if (r.length > 10 && (r[0] === '8' || r[0] === '7')) r = r.slice(1);
    r = r.slice(0, 10);
    var o = '+7'; if (r.length) o += ' ' + r.slice(0, 3); if (r.length > 3) o += ' ' + r.slice(3, 6); if (r.length > 6) o += ' ' + r.slice(6, 8); if (r.length > 8) o += ' ' + r.slice(8, 10); return o;
  }
  function err(t) { $('bkErr').textContent = t; }
  function wire() {
    var q = function (id) { return $(id); };
    if (step === 1) {
      q('bkCat').onclick = function (e) { var b = e.target.closest('[data-cat]'); if (b && b.dataset.cat !== B.cat) { B.cat = b.dataset.cat; B.item = ''; renderBk(); } };
      var upd = function () {
        B.item = q('bkItem').value; var s = svcById[B.item], txt = '';
        if (s) { var pr = promoBySvc[s.id]; txt = (pr && pr.price ? 'Цена по акции: ' + S.money(pr.price) + ' · ' : s.price ? 'Стоимость: ' + S.money(s.price) + ' · ' : '') + 'Подготовка: ' + D.prep[s.prep].t.toLowerCase(); }
        else if (docById[B.item]) txt = docById[B.item].about;
        q('bkHint').textContent = txt;
      };
      q('bkItem').onchange = upd; upd();
      q('bkNext').onclick = function () { if (!B.item) return err('Выберите ' + (B.cat === 'doc' ? 'врача' : 'услугу')); step = 2; renderBk(); };
    } else if (step === 2) {
      q('bkDays').onclick = function (e) { var b = e.target.closest('[data-d]'); if (b && !b.disabled) { B.date = b.dataset.d; B.time = ''; renderBk(); } };
      q('bkTimes').onclick = function (e) { var b = e.target.closest('[data-t]'); if (b && !b.disabled) { B.time = b.dataset.t; q('bkTimes').querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); }); err(''); } };
      var sel = q('bkDays').querySelector('[aria-pressed=true]'); if (sel) sel.scrollIntoView({ block: 'nearest', inline: 'center' });
      q('bkBack').onclick = function () { step = 1; renderBk(); };
      q('bkNext').onclick = function () { if (B.cat !== 'lab' && !B.time) return err('Выберите удобное время'); step = 3; renderBk(); };
    } else if (step === 3) {
      q('bkPhone').oninput = function () { this.value = fmtPhone(this.value); };
      q('bkPhone').onfocus = function () { if (!this.value) this.value = '+7 '; };
      q('bkBack').onclick = function () { B.name = q('bkName').value; B.phone = q('bkPhone').value; B.note = q('bkNote').value; step = 2; renderBk(); };
      q('bkSend').onclick = function () {
        B.name = q('bkName').value.trim(); B.phone = q('bkPhone').value.trim(); B.note = q('bkNote').value.trim();
        if (B.name.length < 2) return err('Укажите имя');
        if (S.digits(B.phone).length !== 11) return err('Укажите номер телефона полностью');
        var pr = B.promo ? (D.promos || []).filter(function (p) { return p.id === B.promo; })[0] : promoBySvc[B.item];
        var lines = ['Здравствуйте! Запись с сайта ALDIMED:', '• ' + itemLabel()];
        if (B.date) lines.push('• Дата: ' + S.fmtDate(B.date) + ' (' + DAYS[new Date(B.date + 'T00:00:00').getDay()] + ')' + (B.time ? ', ' + B.time : ''));
        if (pr) lines.push('• Акция: «' + pr.title + '»');
        lines.push('• Пациент: ' + B.name + ', ' + B.phone);
        if (B.note) lines.push('• Комментарий: ' + B.note);
        lines.push('', 'Подтвердите, пожалуйста, время.');
        B.link = waMain(lines.join('\n'));
        S.addBooking({ id: S.uid(), created: new Date().toISOString(), status: 'new', cat: B.cat, item: B.item, label: itemLabel(), date: B.date, time: B.time, name: B.name, phone: S.normPhone(B.phone), note: B.note, promo: pr ? pr.title : '', source: 'сайт' });
        window.open(B.link, '_blank');
        step = 4; renderBk();
      };
    } else {
      q('bkClose').onclick = closeBk;
    }
  }

  /* ---------- анимации ---------- */
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' }) : null;
  document.querySelectorAll('.rv').forEach(function (el) { io ? io.observe(el) : el.classList.add('in'); });
  if (location.hash === '#book') openBooking('');
})();
