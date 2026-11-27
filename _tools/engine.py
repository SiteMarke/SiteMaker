# -*- coding: utf-8 -*-
"""Общий шаблон внутренних страниц sitemaker (RU/KZ).
Папка _tools не публикуется GitHub Pages (Jekyll пропускает папки с «_»)."""
import json, os, html, re
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://sitemakerkz.com'
WA = '77476128411'
TG = 'Gg124255'
PHONE = '+7 747 612 84 11'
TEL = '+77476128411'
TODAY = '2026-11-24'
V = '30'
AV = '31'  # версия js/analytics.js (поднять при смене ID)

DATA = json.load(open(os.path.join(ROOT, 'data/site.json'), encoding='utf-8'))
TYPES = {t['id']: t for t in DATA['types']}
P = {k: t['price'] for k, t in TYPES.items()}
P['admin'] = DATA['calc']['admin']
WORKS = []
for c in DATA['cats']:
    for w in c['works']:
        if not w.get('hide'):
            w = dict(w); w['cat'] = c['id']; WORKS.append(w)
WBY = {w['id']: w for w in WORKS}


def e(s):
    return html.escape(str(s), quote=True)


def money(n):
    return '{:,}'.format(int(n)).replace(',', ' ') + ' ₸'


def wa(text):
    return 'https://wa.me/%s?text=%s' % (WA, quote(text))


def calc_url(lang, tid, extra=''):
    return ('/kz/' if lang == 'kk' else '/') + '?type=' + tid + extra + '#calc'


ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6l.5-.5.3-.5v-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 2.5 1 3 .8 3.6.8.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM20.5 3.5A11.8 11.8 0 0 0 1.9 17.7L.2 24l6.4-1.7A11.8 11.8 0 0 0 24 12a11.7 11.7 0 0 0-3.5-8.5z"/></svg>'

# ---------------- тексты интерфейса ----------------
UI = {
    'ru': {
        'home': 'Главная', 'nav': [('/uslugi/', 'Услуги'), ('/portfolio/', 'Портфолио'), ('/#prices', 'Цены'), ('/#calc', 'Калькулятор'), ('/blog/', 'Блог')],
        'wa_btn': 'WhatsApp', 'wa_hi': 'Здравствуйте! Хочу сайт для своего бизнеса.', 'other_lang': 'KZ', 'other_lang_label': 'Қазақ тіліндегі нұсқа',
        'calc': 'Рассчитать цену', 'tg': 'Написать в Telegram', 'wa_talk': 'Обсудить в WhatsApp',
        'from': 'от ', 'to_calc': 'Рассчитать', 'faq': 'Вопросы и ответы', 'prices': 'Цены', 'examples': 'Примеры работ',
        'all_works': 'Все работы с фильтрами — в <a href="/portfolio/">портфолио</a>.',
        'box_t': 'Есть проект?', 'box_p': 'Напишите, что нужно, — отвечу с идеей, ценой и сроком в течение 15 минут. Можно просто прислать ссылку на ваш Instagram.',
        'pnote': 'Цена «от» — разовая оплата, без абонплаты. До 10 страниц и доп. опции — без доплаты, хостинг 3 месяца в подарок. Точный расчёт — в <a href="/#calc">калькуляторе</a>, его можно скачать как коммерческое предложение в PDF.',
        'adv_t': 'Почему sitemaker',
        'adv': [('Напрямую с разработчиком', 'Делаю сам — от дизайна до запуска. Вы общаетесь со мной, а не с менеджером.'),
                ('Быстро', 'Запуск от 10 часов. Обычный срок — 1–5 дней в зависимости от тарифа.'),
                ('Честная оплата', 'Предоплата на Kaspi, остаток — после запуска. 5 правок бесплатно, поддержка 30 дней.'),
                ('Заявки сразу к вам', 'WhatsApp, Telegram, форма заявки и админ-панель со статусами — клиент не потеряется.'),
                ('Сами меняете цены', 'Админ-панель: меню, цены, фото и тексты правите с телефона (+%s или уже в тарифе).' % money(P['admin'])),
                ('Русский и казахский', 'Две языковые версии сайта — без доплаты.')],
        'rel_serv': 'Услуги', 'rel_city': 'Создание сайтов в городах', 'rel_ind': 'Сайты для разных сфер', 'rel_blog': 'Полезные статьи',
        'foot': [('Услуги', [('/sozdanie-lendinga/', 'Лендинги'), ('/razrabotka-internet-magazina/', 'Интернет-магазины'), ('/sayt-dlya-biznesa/', 'Сайты для бизнеса'), ('/sayt-vizitka/', 'Сайты-визитки'), ('/korporativnyy-sayt/', 'Корпоративные сайты'), ('/redizayn-sayta/', 'Редизайн')]),
                 ('Города', [('/sozdanie-saitov-astana/', 'Астана'), ('/sozdanie-saitov-almaty/', 'Алматы'), ('/sozdanie-saitov-shymkent/', 'Шымкент'), ('/sozdanie-saitov-karaganda/', 'Караганда'), ('/sozdanie-saitov-aktobe/', 'Актобе'), ('/sozdanie-saitov-kostanay/', 'Костанай'), ('/sozdanie-saitov-petropavlovsk/', 'Петропавловск')]),
                 ('Сферы', [('/sayt-dlya-restorana/', 'Рестораны и кафе'), ('/sayt-dlya-dostavki-edy/', 'Доставка еды'), ('/sayt-dlya-salona-krasoty/', 'Салоны красоты'), ('/sayt-dlya-kliniki/', 'Клиники'), ('/sayt-dlya-otelya/', 'Отели'), ('/sayt-dlya-uslug/', 'Компании услуг')]),
                 ('sitemaker', [('/', 'Главная'), ('/portfolio/', 'Портфолио'), ('/blog/', 'Блог'), ('/uslugi/', 'Все услуги'), ('/#calc', 'Калькулятор')])],
        'copy': '© 2026 sitemaker · создание сайтов по всему Казахстану',
        'tnames': {'land': 'Лендинг / визитка', 'cafe': 'Сайт для кафе', 'bot': 'Telegram-бот заявки', 'cat': 'Каталог', 'biz': 'Бизнес-сайт', 'shop': 'Интернет-магазин', 'prem': 'Премиум «всё включено»'},
        'tdesc': {k: t['desc'] for k, t in TYPES.items()},
        'days': 'срок',
    },
    'kk': {
        'home': 'Басты бет', 'nav': [('/kz/qyzmetter/', 'Қызметтер'), ('/kz/portfolio/', 'Портфолио'), ('/kz/#prices', 'Бағалар'), ('/kz/#calc', 'Калькулятор')],
        'wa_btn': 'WhatsApp', 'wa_hi': 'Сәлеметсіз бе! Бизнесіме сайт қажет.', 'other_lang': 'RU', 'other_lang_label': 'Версия на русском языке',
        'calc': 'Бағаны есептеу', 'tg': 'Telegram-ға жазу', 'wa_talk': 'WhatsApp-та талқылау',
        'from': '', 'to_calc': 'Есептеу', 'faq': 'Сұрақтар мен жауаптар', 'prices': 'Бағалар', 'examples': 'Жұмыс үлгілері',
        'all_works': 'Барлық жұмыстар сүзгілерімен — <a href="/kz/portfolio/">портфолиода</a>.',
        'box_t': 'Жобаңыз бар ма?', 'box_p': 'Не керек екенін жазыңыз — 15 минут ішінде идея, баға және мерзіммен жауап беремін. Instagram парақшаңыздың сілтемесін жіберсеңіз де болады.',
        'pnote': 'Баға «бастап» — бір реттік төлем, абоненттік ақысыз. 10 бетке дейін және қосымша опциялар — қосымша ақысыз, хостинг 3 ай сыйлыққа. Нақты есеп — <a href="/kz/#calc">калькуляторда</a>, оны PDF коммерциялық ұсыныс ретінде жүктеуге болады.',
        'adv_t': 'Неге sitemaker',
        'adv': [('Әзірлеушімен тікелей', 'Дизайннан іске қосуға дейін бәрін өзім жасаймын. Менеджермен емес, менімен сөйлесесіз.'),
                ('Жылдам', '10 сағаттан бастап іске қосу. Әдеттегі мерзім — тарифке қарай 1–5 күн.'),
                ('Әділ төлем', 'Алдын ала төлем Kaspi арқылы, қалғаны — іске қосылғаннан кейін. 5 түзету тегін, 30 күн қолдау.'),
                ('Өтінімдер бірден сізге', 'WhatsApp, Telegram, өтінім формасы және мәртебелері бар әкімшілік панель — клиент жоғалмайды.'),
                ('Бағаны өзіңіз өзгертесіз', 'Әкімшілік панель: мәзір, баға, сурет пен мәтінді телефоннан түзетесіз (+%s немесе тарифке кіреді).' % money(P['admin'])),
                ('Қазақ және орыс тілінде', 'Сайттың екі тілдік нұсқасы — қосымша ақысыз.')],
        'rel_serv': 'Қызметтер', 'rel_city': 'Қалалардағы сайттар', 'rel_ind': 'Салаларға арналған сайттар', 'rel_blog': 'Пайдалы мақалалар',
        'foot': [('Қызметтер', [('/kz/lending-jasau/', 'Лендинг'), ('/kz/internet-dukenin-jasau/', 'Интернет-дүкен'), ('/kz/biznes-ushin-sait/', 'Бизнеске арналған сайт'), ('/kz/sait-vizitka/', 'Сайт-визитка'), ('/kz/korporativtik-sait/', 'Корпоративтік сайт'), ('/kz/sait-redizainy/', 'Редизайн')]),
                 ('sitemaker', [('/kz/', 'Басты бет'), ('/kz/portfolio/', 'Портфолио'), ('/kz/qyzmetter/', 'Барлық қызметтер'), ('/kz/#calc', 'Калькулятор')]),
                 ('Байланыс', [('https://t.me/' + TG, 'Telegram'), ('tel:' + TEL, PHONE), ('https://www.instagram.com/sitemarkertam', 'Instagram')]),
                 ('Орысша', [('/', 'Главная'), ('/blog/', 'Блог'), ('/uslugi/', 'Услуги')])],
        'copy': '© 2026 sitemaker · бүкіл Қазақстан бойынша сайт жасау',
        'tnames': {'land': 'Лендинг / визитка', 'cafe': 'Кафеге арналған сайт', 'bot': 'Өтінімдерге Telegram-бот', 'cat': 'Каталог', 'biz': 'Бизнес-сайт', 'shop': 'Интернет-дүкен', 'prem': '«Бәрі кіреді» премиум'},
        'tdesc': {'land': 'Сіз туралы бір бет: қызметтер, бағалар, пікірлер, WhatsApp және Telegram батырмалары.', 'cafe': 'Онлайн-мәзір мен QR-мәзір, үстел брондау, 2GIS картасы, WhatsApp арқылы тапсырыс.',
                  'bot': 'Мәзір мен батырмалар, жазылу не тапсырыс, әкімшіге тәулік бойы хабарлама.', 'cat': 'Сүзгісі мен іздеуі бар тауарлар, WhatsApp, Instagram және 2GIS арқылы тапсырыс.',
                  'biz': '10 бетке дейін, сататын мәтіндер, өтінім формасы, галерея, базалық SEO, әкімшілік панель.',
                  'shop': 'Себет және Kaspi / картамен төлем, әкімшілік панель, аналитика.', 'prem': 'Бәрі кіреді: жеке дизайн, әкімшілік панель, Telegram-ботқа тапсырыс пен бронь, Frontpad интеграциясы, промокодтар, Google үшін SEO.'},
        'days': 'мерзімі',
    }
}
for lang in UI:
    UI[lang]['ti'] = lambda tid, lang=lang: UI[lang]['tnames'].get(tid, TYPES[tid]['name'])


def price_str(lang, n, frm=True):
    if lang == 'kk':
        return money(n) + ('-ден' if frm else '')
    return ('от ' if frm else '') + money(n)


# ---------------- блоки ----------------
def prices(lang, ids, hit=None, extra_html=''):
    u = UI[lang]
    out = '<div class="prices">'
    for tid in ids:
        t = TYPES[tid]
        out += '<div class="pc%s"><small>%s</small><b>%s</b><p>%s</p><a class="btn" href="%s">%s</a></div>' % (
            ' hit' if tid == hit else '', e(u['ti'](tid)), price_str(lang, t['price']), e(u['tdesc'][tid]), calc_url(lang, tid), u['to_calc'])
    return out + '</div>' + extra_html + '<p class="pnote">' + u['pnote'] + '</p>'


TAGS_KK = {'Бронь дат': 'Күн брондау', 'Админка': 'Әкімшілік панель', 'Telegram': 'Telegram', 'Меню': 'Мәзір', 'Заказ': 'Тапсырыс', 'Бронь': 'Брондау', 'Бизнес-ланч': 'Бизнес-ланч',
           'Банкеты': 'Банкеттер', 'Караоке': 'Караоке', 'VIP': 'VIP', 'Подбор стола': 'Үстел таңдау', 'Калькулятор': 'Калькулятор', '2 языка': '2 тіл', 'Заявка': 'Өтінім', 'Услуги': 'Қызметтер',
           'WhatsApp': 'WhatsApp', 'Галерея': 'Галерея', 'Корзина': 'Себет', 'Промокоды': 'Промокодтар', 'Доставка': 'Жеткізу', 'Каталог': 'Каталог', 'Фильтры': 'Сүзгілер', 'Бронирование': 'Брондау',
           '3 языка': '3 тіл', 'Номера': 'Бөлмелер', 'Расчёт': 'Есептеу', 'Запись': 'Жазылу', 'Отзывы': 'Пікірлер', 'Цены': 'Бағалар', 'Праздники': 'Мерекелер'}


def work_city(lang, w):
    if lang == 'kk':
        from content_kk import WORK_KK
        return WORK_KK[w['id']]['city']
    return w['city']


def work_desc(lang, w):
    if lang == 'kk':
        from content_kk import WORK_KK
        return WORK_KK[w['id']]['desc']
    return w['desc']


def examples(lang, ids):
    out = '<div class="ex">'
    for i in ids:
        w = WBY[i]
        img = w.get('d') or w.get('m')
        out += '<a href="%s/portfolio/%s/"><img src="/%s" alt="%s" width="%d" height="%d" loading="lazy" decoding="async"><span class="t"><b>%s</b><em>%s</em><span>%s</span></span></a>' % (
            '/kz' if lang == 'kk' else '', CASE_SLUG[i], img, e(('Сайт ' if lang == 'ru' else 'Сайт: ') + w['name']), 960 if w.get('d') else 390, 600 if w.get('d') else 844,
            e(w['name']), e(work_city(lang, w)), e(work_desc(lang, w)))
    return out + '</div><p style="margin-top:14px">' + UI[lang]['all_works'] + '</p>'


def faq(lang, items):
    h = ''.join('<details><summary>%s</summary><p>%s</p></details>' % (e(q), a) for q, a in items)
    ld = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": re.sub(r'<[^>]+>', '', a)}} for q, a in items]}
    return h, ld


def adv(lang):
    u = UI[lang]
    return '<h2>%s</h2><ul class="f">%s</ul>' % (u['adv_t'], ''.join('<li><b>%s</b><span>%s</span></li>' % (e(a), e(b)) for a, b in u['adv']))


def box(lang, watext):
    u = UI[lang]
    return '<div class="box"><b style="font-size:18px">%s</b><p style="margin-top:8px">%s</p><div class="cta" style="margin-bottom:0"><a class="btn" href="%s" rel="noopener">%s%s</a><a class="btn g" href="https://t.me/%s" rel="noopener">Telegram</a><a class="btn g" href="%s">%s</a></div></div>' % (
        u['box_t'], u['box_p'], e(wa(watext)), ICON_WA, u['wa_btn'], TG, '/kz/#calc' if lang == 'kk' else '/#calc', u['calc'])


SERV_RU = [('/sozdanie-lendinga/', 'Создание лендингов'), ('/razrabotka-internet-magazina/', 'Разработка интернет-магазинов'), ('/sayt-dlya-biznesa/', 'Сайт для бизнеса под ключ'),
           ('/sayt-vizitka/', 'Сайт-визитка'), ('/korporativnyy-sayt/', 'Корпоративный сайт'), ('/redizayn-sayta/', 'Редизайн сайта')]
CITY_RU = [('/sozdanie-saitov-astana/', 'Астана'), ('/sozdanie-saitov-almaty/', 'Алматы'), ('/sozdanie-saitov-shymkent/', 'Шымкент'), ('/sozdanie-saitov-karaganda/', 'Караганда'),
           ('/sozdanie-saitov-aktobe/', 'Актобе'), ('/sozdanie-saitov-kostanay/', 'Костанай'), ('/sozdanie-saitov-petropavlovsk/', 'Петропавловск'),
           ('/sozdanie-saitov-pavlodar/', 'Павлодар'), ('/sozdanie-saitov-kokshetau/', 'Кокшетау'), ('/sozdanie-saitov-semey/', 'Семей'), ('/sozdanie-saitov-ust-kamenogorsk/', 'Усть-Каменогорск')]
IND_RU = [('/sayt-dlya-restorana/', 'Рестораны и кафе'), ('/sayt-dlya-dostavki-edy/', 'Доставка еды'), ('/sayt-dlya-salona-krasoty/', 'Салоны красоты'), ('/sayt-dlya-kliniki/', 'Клиники и медцентры'),
          ('/sayt-dlya-otelya/', 'Отели и хостелы'), ('/sayt-dlya-uslug/', 'Компании услуг')]
BLOG_RU = [('/blog/skolko-stoit-sozdanie-sayta-v-kazahstane/', 'Сколько стоит сайт в Казахстане'), ('/blog/skolko-stoit-sayt-dlya-salona-krasoty/', 'Сколько стоит сайт для салона красоты'),
           ('/blog/sayt-dlya-restorana-ili-kafe/', 'Сайт для ресторана или кафе'), ('/blog/kak-zakazat-sayt-dlya-biznesa/', 'Как заказать сайт для бизнеса'),
           ('/blog/lending-ili-internet-magazin/', 'Лендинг или интернет-магазин'), ('/blog/kak-vybrat-domen-dlya-sayta/', 'Как выбрать домен'),
           ('/blog/zachem-biznesu-sobstvennyy-sayt/', 'Зачем бизнесу свой сайт'), ('/blog/kak-prinimat-zayavki-cherez-sayt/', 'Как принимать заявки через сайт')]
SERV_KK = [('/kz/lending-jasau/', 'Лендинг жасау'), ('/kz/internet-dukenin-jasau/', 'Интернет-дүкен жасау'), ('/kz/biznes-ushin-sait/', 'Бизнеске арналған сайт'),
           ('/kz/sait-vizitka/', 'Сайт-визитка'), ('/kz/korporativtik-sait/', 'Корпоративтік сайт'), ('/kz/sait-redizainy/', 'Сайт редизайны')]


def related(lang, cur, groups=('serv', 'city', 'ind', 'blog')):
    u = UI[lang]; out = ''
    G = {'serv': (u['rel_serv'], SERV_RU if lang == 'ru' else SERV_KK), 'city': (u['rel_city'], CITY_RU), 'ind': (u['rel_ind'], IND_RU), 'blog': (u['rel_blog'], BLOG_RU)}
    for g in groups:
        t, links = G[g]
        ls = [(h, n) for h, n in links if h != cur]
        if not ls: continue
        if g == 'city': ls = [(h, 'Создание сайтов: ' + n) for h, n in ls]
        out += '<h2 style="font-size:18px">%s</h2><div class="rel">%s</div>' % (t, ''.join('<a href="%s">%s</a>' % (h, e(n)) for h, n in ls))
    return out


# ---------------- страница ----------------
def crumbs_html(lang, crumbs):
    items = [(('/kz/' if lang == 'kk' else '/'), UI[lang]['home'])] + crumbs
    h = '<nav class="bc" aria-label="%s"><ol class="bcl">' % ('Хлебные крошки' if lang == 'ru' else 'Навигация')
    for i, (href, name) in enumerate(items):
        h += '<li>' + ('<a href="%s">%s</a>' % (href, e(name)) if i < len(items) - 1 else '<span aria-current="page">%s</span>' % e(name)) + '</li>'
    h += '</ol></nav>'
    ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": i + 1, "name": n, "item": SITE + h2} for i, (h2, n) in enumerate(items)]}
    return h, ld


PROVIDER = {"@type": "ProfessionalService", "@id": SITE + "/#business", "name": "sitemaker", "url": SITE + "/", "telephone": TEL, "logo": SITE + "/icon-512.png", "image": SITE + "/icon-512.png",
            "address": {"@type": "PostalAddress", "addressLocality": "Петропавловск", "addressCountry": "KZ"}, "areaServed": {"@type": "Country", "name": "Казахстан"}}


def service_ld(name, desc, url, area=None, low=None, lang='ru'):
    d = {"@context": "https://schema.org", "@type": "Service", "name": name, "serviceType": name, "description": desc, "url": SITE + url, "inLanguage": lang,
         "provider": PROVIDER, "areaServed": {"@type": "City", "name": area} if area else {"@type": "Country", "name": "Казахстан"}}
    if low:
        d["offers"] = {"@type": "Offer", "priceCurrency": "KZT", "price": low, "priceSpecification": {"@type": "PriceSpecification", "minPrice": low, "priceCurrency": "KZT"}, "url": SITE + url}
    return d


def page(lang, path, title, desc, body, crumbs, alt=None, ld=(), og_img='/img/w/emirat-d.webp', og_type='website', active=None, extra_head='', noindex=False, wide=False):
    u = UI[lang]
    url = SITE + path
    ch, cld = crumbs_html(lang, crumbs) if crumbs is not None else ('', None)
    lds = list(ld) + ([cld] if cld else [])
    other = alt if alt else ('/' if lang == 'kk' else '/kz/')
    hl = ''
    if alt:
        ru, kk = (path, alt) if lang == 'ru' else (alt, path)
        hl = '<link rel="alternate" hreflang="ru" href="%s%s">\n<link rel="alternate" hreflang="kk" href="%s%s">\n<link rel="alternate" hreflang="x-default" href="%s%s">\n' % (SITE, ru, SITE, kk, SITE, ru)
    nav = ''.join('<a href="%s"%s>%s</a>' % (h, ' aria-current="page"' if active == h else '', n) for h, n in u['nav'])
    foot = ''.join('<div><b>%s</b>%s</div>' % (t, ''.join('<a href="%s"%s>%s</a>' % (h, ' rel="noopener"' if h.startswith('http') else '', e(n)) for h, n in ls)) for t, ls in u['foot'])
    kkjs = '<script src="/js/i18n-kk.js?v=%s" defer></script>\n' % V if lang == 'kk' else ''
    return '''<!DOCTYPE html>
<html lang="%(hl_lang)s">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(url)s">
%(hreflang)s<meta name="robots" content="%(robots)s">
<meta name="theme-color" content="#07070a">
<meta property="og:type" content="%(og_type)s">
<meta property="og:site_name" content="sitemaker">
<meta property="og:locale" content="%(locale)s">
<meta property="og:url" content="%(url)s">
<meta property="og:title" content="%(title)s">
<meta property="og:description" content="%(desc)s">
<meta property="og:image" content="%(site)s%(og)s">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Unbounded:wght@700;800&family=Manrope:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/page.css?v=%(v)s">
%(extra_head)s<script type="application/ld+json">%(ld)s</script>
</head>
<body>
<header class="top"><div class="w"><a class="logo" href="%(home)s"><img src="/favicon.svg" alt="" width="24" height="24">sitemaker</a><nav class="tn" aria-label="%(navl)s">%(nav)s</nav><a class="lng hd-a" href="%(other)s" hreflang="%(olang)s" lang="%(olang)s" aria-label="%(olabel)s">%(otext)s</a><a class="btn s" href="%(wa)s" rel="noopener">%(icon)s%(wabtn)s</a></div></header>
<main class="w%(wide)s">
%(crumbs)s
%(body)s
</main>
<footer class="ft"><div class="cols">%(foot)s</div><div class="bt"><span>%(copy)s</span><span><a href="tel:%(tel)s">%(phone)s</a> · <a href="https://t.me/%(tg)s" rel="noopener">telegram</a></span></div></footer>
<script src="/js/analytics.js?v=%(av)s" defer></script>
%(kkjs)s<script src="/js/consult.js?v=%(v)s" defer></script>
</body>
</html>
''' % dict(hl_lang='kk' if lang == 'kk' else 'ru', title=e(title), desc=e(desc), url=url, hreflang=hl, robots='noindex,follow' if noindex else 'index,follow,max-image-preview:large',
           og_type=og_type, locale='kk_KZ' if lang == 'kk' else 'ru_RU', site=SITE, og=og_img, v=V, av=AV, extra_head=extra_head,
           ld=json.dumps(lds, ensure_ascii=False), home='/kz/' if lang == 'kk' else '/', navl='Разделы' if lang == 'ru' else 'Бөлімдер', nav=nav, other=other,
           olang='ru' if lang == 'kk' else 'kk', olabel=u['other_lang_label'], otext=u['other_lang'], wa=e(wa(u['wa_hi'])), icon=ICON_WA, wabtn=u['wa_btn'],
           wide=' wide' if wide else '', crumbs=ch, body=body, foot=foot, copy=u['copy'], tel=TEL, phone=PHONE, tg=TG, kkjs=kkjs)


def write(path, html_text):
    fp = os.path.join(ROOT, path.lstrip('/'))
    if fp.endswith('/'): fp += 'index.html'
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    open(fp, 'w', encoding='utf-8').write(html_text)
    return fp


# слаги кейсов портфолио
CASE_SLUG = {'emirat': 'emirat', 'sezim': 'sezim-family-restobar', 'pinocchio': 'pinocchio', 'tumar': 'tumar', 'moon': 'the-moon', 'jamaica': 'jamaica-bar', 'han': 'han-dastarhan',
             'petro': 'petro-povar', 'samal': 'samal-chef', 'turan': 'turan-el', 'sushi': 'sensei-sushi', 'bigsushi': 'big-sushi', 'chicken': 'chicken-hot', 'proyxod': 'pro-yxod',
             'five': 'fivehotel', 'ag': 'ag-proekt', 'potolki': 'potolkisk', 'atom': 'hostel-atom', 'astoria': 'astoria-hotel', 'tulpar': 'avtoshkola-tulpar', 'kinderland': 'kinder-land', 'woman': 'woman-beauty-space'}
