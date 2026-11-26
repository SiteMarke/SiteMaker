# -*- coding: utf-8 -*-
"""Собирает /kz/index.html (казахская главная) из /index.html.
После правок русской главной запустите:  python3 _tools/make_kz.py
Если какой-то русский фрагмент изменился — скрипт остановится и покажет, какой: обновите пару ниже."""
import os, re, sys, json
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()


def R(old, new, cnt=1):
    global s
    n = s.count(old)
    if n != cnt:
        sys.exit('make_kz: фрагмент найден %d раз (нужно %d): %r' % (n, cnt, old[:120]))
    s = s.replace(old, new)


def RX(pat, new):
    global s
    s2, n = re.subn(pat, new, s, count=1, flags=re.S)
    if n != 1: sys.exit('make_kz: шаблон не найден: %r' % pat[:120])
    s = s2


# ---------- head ----------
R('<html lang="ru">', '<html lang="kk">')
RX(r'<title>.*?</title>', '<title>Бүкіл Қазақстан бойынша сайт жасау — 6 000 ₸-ден, 1–3 күнде | sitemaker</title>')
RX(r'<meta name="description" content="[^"]*">', '<meta name="description" content="Бизнеске сайт жасау: кафе, мейрамхана, жеткізу, дүкен, қызмет пен қонақүй сайттары. 6 000 ₸-ден, 10 сағаттан бастап іске қосу, әкімшілік панель, WhatsApp пен Telegram-ға өтінімдер.">')
RX(r'<meta name="keywords" content="[^"]*">', '<meta name="keywords" content="сайт жасау, сайт жасау Қазақстан, сайтқа тапсырыс беру, интернет-дүкен жасау, лендинг жасау, бизнеске сайт, sitemaker">')
R('<link rel="canonical" href="https://sitemakerkz.com/">', '<link rel="canonical" href="https://sitemakerkz.com/kz/">')
R('<meta property="og:locale" content="ru_RU">', '<meta property="og:locale" content="kk_KZ">')
R('<meta property="og:locale:alternate" content="kk_KZ">', '<meta property="og:locale:alternate" content="ru_RU">')
R('<meta property="og:url" content="https://sitemakerkz.com/">', '<meta property="og:url" content="https://sitemakerkz.com/kz/">')
R('<meta property="og:title" content="sitemaker — сайты для бизнеса">', '<meta property="og:title" content="sitemaker — бизнеске арналған сайттар">')
RX(r'<meta property="og:description" content="[^"]*">', '<meta property="og:description" content="6 000 ₸-ден, 10 сағаттан бастап іске қосу. 22 жұмыс істеп тұрған жоба: мейрамханалар, жеткізу, қызметтер, қонақүйлер.">')
m = re.search(r'<script type="application/ld\+json">(.*?)</script>', s, re.S)
ld = json.loads(m.group(1))
ld.append({"@context": "https://schema.org", "@type": "WebPage", "@id": "https://sitemakerkz.com/kz/#webpage", "url": "https://sitemakerkz.com/kz/", "name": "Бүкіл Қазақстан бойынша сайт жасау — sitemaker",
           "inLanguage": "kk", "isPartOf": {"@id": "https://sitemakerkz.com/#website"}, "about": {"@id": "https://sitemakerkz.com/#business"}})
s = s[:m.start(1)] + json.dumps(ld, ensure_ascii=False) + s[m.end(1):]

# ---------- шапка ----------
R('<a class="logo" href="#top" aria-label="sitemaker — наверх">', '<a class="logo" href="#top" aria-label="sitemaker — жоғарыға">')
R('<nav class="links" aria-label="Разделы"><a href="/uslugi/">услуги</a><a href="#works">работы</a><a href="#demos">демо</a><a href="#prices" class="lw">цены</a><a href="#calc">калькулятор</a><a href="#how" class="lw">как работаю</a><a href="/blog/">блог</a></nav>',
  '<nav class="links" aria-label="Бөлімдер"><a href="/kz/qyzmetter/">қызметтер</a><a href="#works">жұмыстар</a><a href="#demos">демо</a><a href="#prices" class="lw">бағалар</a><a href="#calc">калькулятор</a><a href="#how" class="lw">қалай жұмыс істеймін</a><a href="/kz/portfolio/">портфолио</a></nav>')
R('<a class="lng" href="/kz/" hreflang="kk" lang="kk" aria-label="Қазақ тіліндегі нұсқа">KZ</a>', '<a class="lng" href="/" hreflang="ru" lang="ru" aria-label="Версия на русском языке">RU</a>')
R('data-wa="Здравствуйте! Хочу сайт для своего бизнеса." aria-label="Написать в WhatsApp"><svg><use href="#i-wa"/></svg><span class="nt">Написать</span>', 'data-wa="Сәлеметсіз бе! Бизнесіме сайт қажет." aria-label="WhatsApp-қа жазу"><svg><use href="#i-wa"/></svg><span class="nt">Жазу</span>')
R('data-order>Заказать</a>', 'data-order>Тапсырыс</a>')
R('aria-controls="mnav" aria-label="Меню">', 'aria-controls="mnav" aria-label="Мәзір">')
R('<nav class="mnav" id="mnav" aria-label="Меню" hidden><div class="wrap"><a href="/uslugi/">Услуги</a><a href="#works">Работы</a><a href="/portfolio/">Портфолио с фильтрами</a><a href="#demos">Демо по нишам</a><a href="#prices">Цены</a><a href="#calc">Калькулятор</a><a href="/blog/">Блог</a><a href="/kz/" hreflang="kk" lang="kk">Қазақша</a></div></nav>',
  '<nav class="mnav" id="mnav" aria-label="Мәзір" hidden><div class="wrap"><a href="/kz/qyzmetter/">Қызметтер</a><a href="#works">Жұмыстар</a><a href="/kz/portfolio/">Сүзгілері бар портфолио</a><a href="#demos">Салалар бойынша демо</a><a href="#prices">Бағалар</a><a href="#calc">Калькулятор</a><a href="/" hreflang="ru" lang="ru">На русском</a></div></nav>')

# ---------- бірінші экран ----------
R('<b>акция</b><span class="l" id="offL">Все доп. опции бесплатно + хостинг 3 месяца в подарок</span><span class="s" id="offS">Опции бесплатно + хостинг в подарок</span>',
  '<b>акция</b><span class="l" id="offL">Барлық қосымша опциялар тегін + 3 ай хостинг сыйлыққа</span><span class="s" id="offS">Опциялар тегін + хостинг сыйлыққа</span>')
R('<span class="h1s">создание сайтов по всему Казахстану</span>', '<span class="h1s">бүкіл Қазақстан бойынша сайт жасау</span>')
R('<p id="heroSub">Сайты для бизнеса, которые приносят заявки.<br>От 6 000 ₸ · запуск от 10 часов · с админкой.</p>', '<p id="heroSub">Өтінім әкелетін бизнес сайттары.<br>6 000 ₸-ден · 10 сағаттан бастап іске қосу · әкімшілік панельмен.</p>')
R('<a class="pill big" href="#calc">Рассчитать сайт</a>', '<a class="pill big" href="#calc">Сайтты есептеу</a>')
R('<a class="pill big gh" href="#works">Смотреть работы</a>', '<a class="pill big gh" href="#works">Жұмыстарды көру</a>')
R('aria-label="К работам"', 'aria-label="Жұмыстарға"')

# ---------- жұмыстар ----------
R('<h2 class="h2 disp">мои работы</h2><p><span id="wCount">22 живых сайта</span> в Петропавловске, Астане, Кокшетау и Актобе. Откройте любой — всё работает по-настоящему.</p>',
  '<h2 class="h2 disp">менің жұмыстарым</h2><p>Петропавл, Астана, Көкшетау және Ақтөбедегі <span id="wCount">22 жұмыс істеп тұрған сайт</span>. Кез келгенін ашыңыз — бәрі шынымен жұмыс істейді.</p>')
R('<a class="pill gh big" href="/portfolio/">Всё портфолио: фильтры и подробные кейсы <svg>', '<a class="pill gh big" href="/kz/portfolio/">Толық портфолио: сүзгілер мен кейстер <svg>')

# ---------- демо по нишам (блок целиком; русская версия — в index.html) ----------
DEMOS_KK = '<section id="demos">\n  <div class="wrap">\n    <div class="head rv"><h2 class="h2 disp">салалар бойынша демо</h2><p>Әртүрлі бизнеске арналған дайын мысалдар. Телефоннан ашыңыз — себет, жазылу және әкімшілік панелі шынымен жұмыс істейді.</p></div>\n    <div class="dgrid">\n      <a class="dcard rv" href="/demo/la-bella-sweets/" target="_blank" rel="noopener" data-demo="la-bella-sweets"><span class="dph"><img src="/img/demo/konditer.webp" width="640" height="400" alt="Демо-сайт: кондитерлік" loading="lazy"></span><small>кондитерлік</small><h3>себеті бар каталог</h3><p>Бағалары бар 62 позиция: торттар, бенто, жиынтықтар. Тапсырыс WhatsApp-қа бір хабарламамен кетеді.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n      <a class="dcard rv" href="/demo/chocostrawberry/" target="_blank" rel="noopener" data-demo="chocostrawberry"><span class="dph"><img src="/img/demo/klubnika.webp" width="640" height="400" alt="Демо-сайт: шоколадтағы құлпынай" loading="lazy"></span><small>шоколадтағы құлпынай</small><h3>сыйлық жиынтықтары</h3><p>Өлшемі мен бағасы бойынша жиынтықтар, себет, жеткізу немесе өзі алып кету.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n      <a class="dcard rv" href="/demo/minard/" target="_blank" rel="noopener" data-demo="minard"><span class="dph"><img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&amp;fit=crop&amp;w=640&amp;h=400&amp;q=62" width="640" height="400" alt="Демо-сайт: сұлулық салоны" loading="lazy"></span><small>сұлулық салоны</small><h3>қызметтер мен жазылу</h3><p>Қызметтер, жұмыс уақыты, мекенжай және таңдалған қызметпен WhatsApp-қа жазылу.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n      <a class="dcard rv" href="/demo/alpha-trim/" target="_blank" rel="noopener" data-demo="alpha-trim"><span class="dph"><img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&amp;fit=crop&amp;w=640&amp;h=400&amp;q=62" width="640" height="400" alt="Демо-сайт: барбершоп" loading="lazy"></span><small>барбершоп</small><h3>шаш қию және жазылу</h3><p>Қызметтер, рейтинг, карта және бір басумен жазылу.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n      <a class="dcard rv" href="/demo/shafran/" target="_blank" rel="noopener" data-demo="shafran"><span class="dph"><img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&amp;fit=crop&amp;w=640&amp;h=400&amp;q=62" width="640" height="400" alt="Демо-сайт: мейрамхана" loading="lazy"></span><small>мейрамхана</small><h3>мәзір және тапсырыс</h3><p>Бөлімдер бойынша мәзір, жұмыс уақыты және WhatsApp арқылы тапсырыс.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n      <a class="dcard rv" href="/demo/terma-nova/" target="_blank" rel="noopener" data-demo="terma-nova"><span class="dph"><img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&amp;fit=crop&amp;w=640&amp;h=400&amp;q=62" width="640" height="400" alt="Демо-сайт: spa және монша" loading="lazy"></span><small>spa және монша</small><h3>демалысты брондау</h3><p>Бу бөлмелері, бассейн және демалыс аймақтары, WhatsApp арқылы брондау.</p><span class="arrow"><svg><use href="#i-arr"/></svg></span></a>\n    </div>\n    <div class="dcta rv"><div><b>сіздің салаңыз жоқ па?</b><p>Бизнесіңіздің Instagram немесе 2GIS сілтемесін жіберіңіз — 24 сағат ішінде сайттың тегін мысалын жасаймын.</p></div><a class="pill big" href="#" data-wa="Сәлеметсіз бе! Бизнесіме сайттың тегін мысалын алғым келеді. Instagram немесе 2GIS сілтемесі: "><svg><use href="#i-wa"/></svg>Тегін мысал алғым келеді</a></div>\n  </div>\n</section>'
RX(r'<section id="demos">.*?</section>', DEMOS_KK.replace('\\', r'\\'))
R('aria-label="Коротко в цифрах"', 'aria-label="Қысқаша сандармен"')
R('<span>живых сайтов клиентов</span>', '<span>клиенттердің жұмыс істеп тұрған сайты</span>')
R('data-pre="от " data-suf=" ч">от 10 ч</b><span>от заявки до запуска</span>', 'data-suf=" сағ">10 сағ</b><span>өтінімнен іске қосуға дейін (ең азы)</span>')
R('<span>правок бесплатно</span>', '<span>тегін түзету</span>')
R('data-suf=" дн">30 дн</b><span>поддержки после запуска</span>', 'data-suf=" күн">30 күн</b><span>іске қосқаннан кейін қолдау</span>')

# ---------- бағалар ----------
R('<h2 class="h2 disp">сколько стоит</h2><p>Цена «от» — точную скажу после короткого разговора. Нажмите на строку — она подставится в калькулятор.</p>',
  '<h2 class="h2 disp">қанша тұрады</h2><p>Баға «бастап» — нақтысын қысқа әңгімеден кейін айтамын. Жолды басыңыз — ол калькуляторға қойылады.</p>')
R('<span class="chip" id="pFree">до 10 страниц — бесплатно</span><span class="chip">все доп. опции — в подарок</span><span class="chip">русский и казахский — без доплаты</span><span class="chip">хостинг 3 месяца — в подарок</span>',
  '<span class="chip" id="pFree">10 бетке дейін — тегін</span><span class="chip">барлық қосымша опциялар — сыйлыққа</span><span class="chip">қазақша және орысша — қосымша ақысыз</span><span class="chip">3 ай хостинг — сыйлыққа</span>')

# ---------- калькулятор ----------
R('<h2 class="h2 disp">калькулятор</h2><p>Выберите тип сайта, срок и опции — цена считается сразу. Оставьте заявку или отправьте расчёт в WhatsApp.</p>',
  '<h2 class="h2 disp">калькулятор</h2><p>Сайт түрін, мерзімін және опцияларын таңдаңыз — баға бірден есептеледі. Өтінім қалдырыңыз немесе есепті WhatsApp-қа жіберіңіз.</p>')
for ru, kk in [('01 <i>/</i> тип сайта', '01 <i>/</i> сайт түрі'), ('02 <i>/</i> срок', '02 <i>/</i> мерзім'), ('03 <i>/</i> админ-панель', '03 <i>/</i> әкімшілік панель'), ('04 <i>/</i> страниц', '04 <i>/</i> беттер'),
               ('05 <i>/</i> дизайн', '05 <i>/</i> дизайн'), ('06 <i>/</i> стиль', '06 <i>/</i> стиль'), ('07 <i>/</i> анимации', '07 <i>/</i> анимациялар'), ('08 <i>/</i> оплата на сайте', '08 <i>/</i> сайттағы төлем'),
               ('09 <i>/</i> пакеты', '09 <i>/</i> пакеттер'), ('10 <i>/</i> домен', '10 <i>/</i> домен'), ('11 <i>/</i> хостинг', '11 <i>/</i> хостинг'), ('12 <i>/</i> промокод', '12 <i>/</i> промокод')]:
    R(ru, kk)
R('<span><b>Админ-панель</b><small>Сами меняете цены, меню и фото, видите заявки, отчёт в Excel</small></span>', '<span><b>Әкімшілік панель</b><small>Баға, мәзір мен суретті өзіңіз өзгертесіз, өтінімдерді көресіз, Excel есебі</small></span>')
R('aria-label="Меньше">', 'aria-label="Азырақ">'); R('aria-label="Больше">', 'aria-label="Көбірек">')
R('<span><b>Kaspi-перевод / QR</b><small>Кнопка оплаты и реквизиты Kaspi на сайте</small></span><span class="pr">входит</span>', '<span><b>Kaspi аударым / QR</b><small>Сайтта төлем батырмасы мен Kaspi деректемелері</small></span><span class="pr">кіреді</span>')
R('<span><b>Онлайн-оплата картой</b><small>Kaspi Pay, Halyk, Freedom и др. — по вашему договору с банком; комиссию берёт банк</small></span>', '<span><b>Картамен онлайн төлем</b><small>Kaspi Pay, Halyk, Freedom және т.б. — банкпен шартыңыз бойынша; комиссияны банк алады</small></span>')
R('<span><b>Сайт + Telegram-бот</b><small>Бот принимает заявки и записи 24/7 и присылает их вам — со скидкой в пакете</small></span>', '<span><b>Сайт + Telegram-бот</b><small>Бот өтінім мен жазылуды тәулік бойы қабылдап, сізге жібереді — пакетте жеңілдікпен</small></span>')
R('<span><b>Сайт + настройка рекламы</b><small>Запуск рекламы в Instagram или 2GIS с переходом на сайт. Рекламный бюджет оплачиваете отдельно</small></span>', '<span><b>Сайт + жарнаманы баптау</b><small>Instagram не 2GIS-те сайтқа өтетін жарнаманы іске қосу. Жарнама бюджетін бөлек төлейсіз</small></span>')
R('По правилам зоны .kz сайт должен размещаться на сервере в Казахстане. Подберу казахстанский хостинг — его тариф оплачивается отдельно.', '.kz аймағының ережесі бойынша сайт Қазақстандағы серверде орналасуы керек. Қазақстандық хостинг таңдап беремін — оның тарифі бөлек төленеді.')
R('placeholder="Например: PROWEB"', 'placeholder="Мысалы: PROWEB"')
R('style="height:46px">Применить</button>', 'style="height:46px">Қолдану</button>')
R('<div class="lbl">ваш расчёт</div>', '<div class="lbl">сіздің есебіңіз</div>')
R('<small>итого, разово</small>', '<small>барлығы, бір рет</small>')
R('<div class="lbl">регулярно</div>', '<div class="lbl">тұрақты</div>')
R('Коммерческое предложение (PDF)</button>', 'Коммерциялық ұсыныс (PDF)</button>')
R('<div class="lbl">оставить заявку</div>', '<div class="lbl">өтінім қалдыру</div>')
R('placeholder="Ваше имя" autocomplete="name" maxlength="60" aria-label="Ваше имя"', 'placeholder="Атыңыз" autocomplete="name" maxlength="60" aria-label="Атыңыз"')
R('aria-label="Телефон">', 'aria-label="Телефон">')
R('placeholder="Не заполняйте это поле"', 'placeholder="Бұл өрісті толтырмаңыз"')
R('<span>Я прочитал(а) и принимаю <button type="button" data-terms>пользовательское соглашение</button> и согласен(на) на обработку моего имени и телефона для связи по заказу</span>',
  '<span>Мен <button type="button" data-terms>пайдаланушы келісімін</button> оқып, қабылдаймын және тапсырыс бойынша байланысу үшін атым мен телефонымды өңдеуге келісемін</span>')
R('id="lBtn">Заказать сайт</button>', 'id="lBtn">Сайтқа тапсырыс беру</button>')
R('<p class="lmsg" id="lMsg">Перезвоню или напишу в WhatsApp в течение 15 минут.</p>', '<p class="lmsg" id="lMsg">15 минут ішінде қоңырау шаламын не WhatsApp-қа жазамын.</p>')
R('<strong id="okT">Заявка отправлена</strong><span>Свяжусь с вами в течение 15 минут.</span>', '<strong id="okT">Өтінім жіберілді</strong><span>15 минут ішінде хабарласамын.</span>')
R('<div class="sep">или сразу в мессенджер</div>', '<div class="sep">немесе бірден мессенджерге</div>')
R('<span>итого <b id="cBarT"></b></span><button type="button" class="pill" tabindex="-1">к заявке</button>', '<span>барлығы <b id="cBarT"></b></span><button type="button" class="pill" tabindex="-1">өтінімге</button>')

# ---------- қалай жұмыс істеймін, пікірлер, сұрақтар ----------
R('<h2 class="h2 disp">как я работаю</h2><p>Делаю сам — от дизайна до запуска. Вы общаетесь напрямую со мной, а не с менеджером.</p>', '<h2 class="h2 disp">қалай жұмыс істеймін</h2><p>Дизайннан іске қосуға дейін бәрін өзім жасаймын. Менеджермен емес, тікелей менімен сөйлесесіз.</p>')
R('<span class="chip">ответ — в течение 15 минут</span><span class="chip">предоплата на Kaspi, остаток — после запуска</span><span class="chip">5 правок бесплатно</span><span class="chip">поддержка 30 дней</span><span class="chip">индексация в Google</span>',
  '<span class="chip">жауап — 15 минут ішінде</span><span class="chip">алдын ала төлем Kaspi арқылы, қалғаны — іске қосқаннан кейін</span><span class="chip">5 түзету тегін</span><span class="chip">30 күн қолдау</span><span class="chip">Google-ға индекстеу</span>')
R('<h2 class="h2 disp" id="prT">отзывы и реклама</h2><p>Клиенты сами рекомендуют меня в своих сторис — смотрите и слушайте.</p>', '<h2 class="h2 disp" id="prT">пікірлер мен жарнама</h2><p>Клиенттер мені өз стористерінде ұсынады — көріңіз және тыңдаңыз. Пікірлер түпнұсқа тілінде.</p>')
R('<button class="plx" type="button" aria-label="Закрыть">', '<button class="plx" type="button" aria-label="Жабу">')
R('<h2 class="h2 disp">вопросы</h2><p>Не нашли ответ — напишите, отвечу лично.</p>', '<h2 class="h2 disp">сұрақтар</h2><p>Жауап таппасаңыз — жазыңыз, өзім жауап беремін.</p>')
R('<cite id="rvCite"><b>Хостел ATOM</b> · Астана · <a href="https://atom-hostel.github.io/Hostel-ATOM/" target="_blank" rel="noopener">смотреть сайт ↗</a></cite>', '<cite id="rvCite"><b>ATOM хостелі</b> · Астана · <a href="https://atom-hostel.github.io/Hostel-ATOM/" target="_blank" rel="noopener">сайтты көру ↗</a></cite>')

# ---------- SEO-блок: қазақша өз мәтіні ----------
RX(r'<section class="seo" aria-labelledby="seoT">.*?</section>', '''<section class="seo" aria-labelledby="seoT">
  <div class="wrap rv">
    <h2 class="h2 disp" id="seoT">бүкіл қазақстан бойынша сайттар</h2>
    <div class="seo-t">
      <p>sitemaker — бүкіл Қазақстан бойынша бизнеске сайт жасау. Кафе мен мейрамханаларға, банкет залдарына, тамақ жеткізуге, дүкендерге, салондарға, қызмет көрсету компаниялары мен қонақүйлерге сайт, сондай-ақ Telegram-боттар жасаймын.</p>
      <p class="seo-links" style="margin-top:14px">Қызметтер: <a href="/kz/lending-jasau/">лендинг жасау</a> · <a href="/kz/internet-dukenin-jasau/">интернет-дүкен жасау</a> · <a href="/kz/biznes-ushin-sait/">бизнеске арналған сайт</a> · <a href="/kz/sait-vizitka/">сайт-визитка</a> · <a href="/kz/korporativtik-sait/">корпоративтік сайт</a> · <a href="/kz/sait-redizainy/">сайт редизайны</a> · <a href="/kz/portfolio/">портфолио</a>.</p>
      <p>Кафеге онлайн-мәзір мен QR-мәзірі бар сайт — 7&nbsp;000&nbsp;₸-ден, лендинг-визитка — 6&nbsp;000&nbsp;₸-ден, өтінімдерге Telegram-бот — 5&nbsp;500&nbsp;₸-ден, каталог — 15&nbsp;000&nbsp;₸-ден, бизнес-сайт — 17&nbsp;500&nbsp;₸-ден, интернет-дүкен — 20&nbsp;000&nbsp;₸-ден, әкімшілік панелі, Telegram-боты және Frontpad-пен «бәрі кіреді» премиум — 30&nbsp;000&nbsp;₸-ден. Іске қосу — 10 сағаттан бірнеше күнге дейін.</p>
      <p>Әкімшілік панель арқылы баға, мәзір, сурет пен мәтінді телефоннан өзіңіз өзгертесіз. Тапсырыстар мен өтінімдер WhatsApp пен Telegram-ға келеді. Алматы, Астана, Шымкент, Қарағанды, Ақтөбе, Тараз, Павлодар, Өскемен, Семей, Атырау, Қостанай, Қызылорда, Орал, Петропавл, Ақтау, Түркістан, Көкшетау, Талдықорған және басқа қалалармен онлайн жұмыс істеймін. Бәрін WhatsApp не Telegram-да талқылаймыз, төлем Kaspi арқылы. <a href="#works">Жұмыстарымды</a> қарап, <a href="#calc">құнын есептеңіз</a>.</p>
      <p lang="ru">Создание сайтов для бизнеса по всему Казахстану — от 6&nbsp;000&nbsp;₸. <a href="/" hreflang="ru">Версия сайта на русском</a> · <a href="/blog/" hreflang="ru">блог</a>.</p>
    </div>
  </div>
</section>''')

# ---------- байланыс ----------
R('<h2 class="h2 disp">есть проект?</h2>\n    <p>Напишите, что нужно, — отвечу с идеей, ценой и сроком. Можно просто прислать ссылку на ваш Instagram.</p>',
  '<h2 class="h2 disp">жобаңыз бар ма?</h2>\n    <p>Не керек екенін жазыңыз — идея, баға және мерзіммен жауап беремін. Instagram сілтемесін жіберсеңіз де болады.</p>')
R('<a class="pill big" href="#" data-wa="Здравствуйте! Хочу сайт для своего бизнеса."><svg><use href="#i-wa"/></svg>WhatsApp</a>', '<a class="pill big" href="#" data-wa="Сәлеметсіз бе! Бизнесіме сайт қажет."><svg><use href="#i-wa"/></svg>WhatsApp</a>')

# ---------- подвал ----------
RX(r'<div class="wrap fnav">.*?</div></div>\n', '<div class="wrap fnav"><div><b>Қызметтер</b><a href="/kz/lending-jasau/">Лендинг</a><a href="/kz/internet-dukenin-jasau/">Интернет-дүкен</a><a href="/kz/biznes-ushin-sait/">Бизнеске сайт</a><a href="/kz/sait-vizitka/">Сайт-визитка</a><a href="/kz/korporativtik-sait/">Корпоративтік сайт</a><a href="/kz/sait-redizainy/">Редизайн</a></div><div><b>sitemaker</b><a href="/kz/portfolio/">Портфолио</a><a href="/kz/qyzmetter/">Барлық қызметтер</a><a href="#calc">Калькулятор</a></div><div><b>Байланыс</b><a href="https://t.me/Gg124255" target="_blank" rel="noopener">Telegram</a><a href="tel:+77476128411">+7 747 612 84 11</a><a href="https://www.instagram.com/sitemarkertam" target="_blank" rel="noopener">Instagram</a></div><div><b>Орысша</b><a href="/" hreflang="ru">Главная</a><a href="/uslugi/" hreflang="ru">Услуги</a><a href="/blog/" hreflang="ru">Блог</a></div></div>\n')
R('<span>© <span id="yr"></span> sitemaker · сайты для бизнеса · Казахстан</span>', '<span>© <span id="yr"></span> sitemaker · бизнеске арналған сайттар · Қазақстан</span>')
R('<a href="#" data-terms>соглашение</a>', '<a href="#" data-terms>келісім</a>')
R('rel="nofollow">админка</a>', 'rel="nofollow">әкімшілік</a>')

# ---------- скрипты: казахский словарь до main.js ----------
R('<script src="/js/main.js?v=31"></script>', '<script src="/js/i18n-kk.js?v=31"></script>\n<script src="/js/main.js?v=31"></script>')
R('<link rel="preload" href="/js/main.js?v=31" as="script">', '<link rel="preload" href="/js/main.js?v=31" as="script">\n<link rel="preload" href="/js/i18n-kk.js?v=31" as="script">')

left = [t for t in re.findall(r'>([^<>]*[А-Яа-яЁё][^<>]*)<', s[s.find('<body'):]) if not re.search(r'[әіңғүұқөһӘІҢҒҮҰҚӨҺ]', t) and t.strip()]
os.makedirs(os.path.join(ROOT, 'kz'), exist_ok=True)
open(os.path.join(ROOT, 'kz/index.html'), 'w', encoding='utf-8').write(s)
print('kz/index.html ok; русские фрагменты, оставшиеся без казахских букв (проверьте):', left)
