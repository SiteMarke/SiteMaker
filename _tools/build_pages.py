# -*- coding: utf-8 -*-
"""Сборка внутренних страниц sitemaker.
Запуск из корня репозитория:  python3 _tools/build_pages.py
Создаёт: услуги (RU/KZ), новые города, /uslugi/, /kz/qyzmetter/, портфолио (RU/KZ) с кейсами, блог, 404, js/cases.js, sitemap.xml, robots.txt
и обновляет перелинковку на существующих страницах городов и сфер (их тексты не трогает)."""
import os, re, sys, json, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from engine import *
from content_services_ru import SERVICES
from content_cities_ru import CITIES
from content_blog_ru import POSTS
from content_kk import SERVICES_KK, WORK_KK

OUT = []   # (path, lastmod, priority, changefreq, alt)


def reg(path, prio='0.7', freq='monthly', alt=None, lastmod=TODAY):
    OUT.append((path, lastmod, prio, freq, alt))


# ---------------- услуги ----------------
def build_service(s, lang):
    u = UI[lang]
    fh, fld = faq(lang, s['faq'])
    body = '<h1>%s</h1>\n<p class="lead">%s</p>\n<div class="cta"><a class="btn" href="%s" rel="noopener">%s%s</a><a class="btn g" href="https://t.me/%s" rel="noopener">%s</a><a class="btn g" href="%s">%s</a></div>\n' % (
        s['h1'], s['lead'], e(wa(s['wa'])), ICON_WA, u['wa_talk'], TG, u['tg'], calc_url(lang, s['type']), u['calc'])
    body += s['body']
    body += '<h2>%s</h2>' % u['prices'] + prices(lang, s['prices'], s.get('hit'), s.get('prices_extra', ''))
    body += '<h2>%s</h2>' % s.get('examples_title', u['examples']) + examples(lang, s['examples'])
    body += adv(lang)
    body += '<h2>%s</h2>' % u['faq'] + fh
    body += box(lang, s['wa'])
    body += related(lang, s['path'], ('serv', 'city', 'ind', 'blog') if lang == 'ru' else ('serv',))
    low = min(TYPES[t]['price'] for t in s['prices'])
    ld = [service_ld(s['h1'], s['desc'], s['path'], None, low, lang), fld]
    html_ = page(lang, s['path'], s['title'], s['desc'], body, [(None, s['crumb'])] if False else [('/uslugi/' if lang == 'ru' else '/kz/qyzmetter/', 'Услуги' if lang == 'ru' else 'Қызметтер'), (s['path'], s['crumb'])],
                 alt=s.get('alt'), ld=ld, og_img='/' + (WBY[s['examples'][0]].get('d') or WBY[s['examples'][0]]['m']))
    write(s['path'], html_); reg(s['path'], '0.9', alt=s.get('alt'))


# ---------------- города ----------------
def build_city(c):
    lang = 'ru'; u = UI[lang]
    fh, fld = faq(lang, c['faq'])
    body = '<h1>%s</h1>\n<p class="lead">%s</p>\n<div class="cta"><a class="btn" href="%s" rel="noopener">%sОбсудить сайт в WhatsApp</a><a class="btn g" href="https://t.me/%s" rel="noopener">Написать в Telegram</a><a class="btn g" href="/#calc">Рассчитать цену</a></div>\n' % (
        c['h1'], c['lead'], e(wa(c['wa'])), ICON_WA, TG)
    body += c['body']
    body += '<h2>Цены %s</h2>' % c['in'] + prices(lang, c['prices'], c.get('hit'))
    body += '<h2>Примеры моих работ</h2>' + examples(lang, c['examples'])
    body += adv(lang)
    body += '<h2>Вопросы</h2>' + fh + box(lang, c['wa'])
    body += related(lang, c['path'], ('serv', 'city', 'ind'))
    ld = [service_ld('Создание сайтов ' + c['in'], c['desc'], c['path'], c['city'], P['land']), fld]
    write(c['path'], page(lang, c['path'], c['title'], c['desc'], body, [(c['path'], 'Создание сайтов ' + c['in'])], ld=ld, og_img='/' + WBY[c['examples'][0]]['d']))
    reg(c['path'], '0.9')


# ---------------- хабы услуг ----------------
def build_hubs():
    body = '<h1>Услуги sitemaker</h1><p class="lead">Создаю сайты и Telegram-ботов для бизнеса по всему Казахстану. Выберите, что нужно, — на каждой странице есть цены, примеры и ответы на вопросы. Не уверены — спросите консультанта в углу экрана.</p>'
    body += '<h2>Типы сайтов</h2><ul class="f">' + ''.join('<li><b><a href="%s">%s</a></b><span>%s</span></li>' % (s['path'], e(s['crumb']), e(s['desc'].split('. ')[0] + '.')) for s in SERVICES) + '</ul>'
    body += '<h2>Сайты для сфер бизнеса</h2><div class="rel">' + ''.join('<a href="%s">%s</a>' % (h, n) for h, n in IND_RU) + '</div>'
    body += '<h2>Города</h2><div class="rel">' + ''.join('<a href="%s">Создание сайтов: %s</a>' % (h, n) for h, n in CITY_RU) + '</div>'
    body += '<h2>Цены</h2>' + prices('ru', ['land', 'cafe', 'bot', 'cat', 'biz', 'shop', 'prem'], 'biz')
    body += '<h2>Пакеты</h2><ul class="f"><li><b>Сайт + Telegram-бот</b><span>Бот для заявок и записей со скидкой в пакете — выберите в калькуляторе.</span></li><li><b>Сайт + настройка рекламы</b><span>Запуск рекламы в Instagram или 2GIS с переходом на сайт; бюджет на рекламу — отдельно.</span></li><li><b>Домен и хостинг</b><span>Хостинг 3 месяца в подарок, помогу купить и подключить домен.</span></li></ul>'
    body += box('ru', 'Здравствуйте! Хочу сайт для своего бизнеса.')
    write('/uslugi/', page('ru', '/uslugi/', 'Услуги по созданию сайтов в Казахстане — цены от 5 500 ₸ | sitemaker', 'Все услуги sitemaker: лендинги, интернет-магазины, сайты для бизнеса, визитки, корпоративные сайты, редизайн и Telegram-боты. Цены, сроки и примеры работ.',
                          body, [('/uslugi/', 'Услуги')], alt='/kz/qyzmetter/', active='/uslugi/'))
    reg('/uslugi/', '0.8', alt='/kz/qyzmetter/')
    body = '<h1>sitemaker қызметтері</h1><p class="lead">Бүкіл Қазақстан бойынша бизнеске сайттар мен Telegram-боттар жасаймын. Керегін таңдаңыз — әр бетте бағалар, үлгілер және сұрақтарға жауап бар.</p>'
    body += '<h2>Сайт түрлері</h2><ul class="f">' + ''.join('<li><b><a href="%s">%s</a></b><span>%s</span></li>' % (s['path'], e(s['crumb']), e(s['desc'].split(': ')[0] + '.')) for s in SERVICES_KK) + '</ul>'
    body += '<h2>Бағалар</h2>' + prices('kk', ['land', 'cafe', 'bot', 'cat', 'biz', 'shop', 'prem'], 'biz')
    body += '<h2>Пакеттер</h2><ul class="f"><li><b>Сайт + Telegram-бот</b><span>Өтінімдер мен жазылуға арналған бот пакетте жеңілдікпен — калькуляторда таңдаңыз.</span></li><li><b>Сайт + жарнаманы баптау</b><span>Instagram не 2GIS-те сайтқа өтетін жарнама; жарнама бюджеті — бөлек.</span></li><li><b>Домен және хостинг</b><span>Хостинг 3 ай сыйлыққа, доменді сатып алуға және қосуға көмектесемін.</span></li></ul>'
    body += box('kk', 'Сәлеметсіз бе! Бизнесіме сайт қажет.')
    write('/kz/qyzmetter/', page('kk', '/kz/qyzmetter/', 'Сайт жасау қызметтері — 5 500 ₸-ден | sitemaker', 'sitemaker қызметтері: лендинг, интернет-дүкен, бизнеске сайт, визитка, корпоративтік сайт, редизайн және Telegram-боттар. Бағалар, мерзімдер, жұмыс үлгілері.',
                                 body, [('/kz/qyzmetter/', 'Қызметтер')], alt='/uslugi/', active='/kz/qyzmetter/'))
    reg('/kz/qyzmetter/', '0.8', alt='/uslugi/')


# ---------------- портфолио ----------------
CATS = {c['id']: c['title'] for c in DATA['cats']}
CATS_KK = {'food': 'мейрамханалар мен банкеттер', 'shop': 'жеткізу және дүкендер', 'serv': 'қызметтер мен қонақүйлер'}
GLOSS = {'ru': {'Бронь дат': 'Календарь свободных дат и заявка на бронь', 'Админка': 'Админ-панель для владельца: цены, меню и заявки', 'Telegram': 'Уведомления о заявках в Telegram',
                'Меню': 'Меню с фото и ценами', 'Заказ': 'Заказ прямо с сайта', 'Бронь': 'Бронь стола', 'Бизнес-ланч': 'Бизнес-ланч и сеты', 'Банкеты': 'Тои и банкеты', 'Караоке': 'Караоке',
                'VIP': 'VIP-комнаты', 'Подбор стола': 'Подбор стола под количество гостей', 'Калькулятор': 'Калькулятор стоимости', '2 языка': 'Две языковые версии', '3 языка': 'Три языковые версии',
                'Заявка': 'Заявка на мероприятие', 'Услуги': 'Услуги с ценами', 'WhatsApp': 'Заявки и заказы в WhatsApp', 'Галерея': 'Галерея', 'Корзина': 'Корзина', 'Промокоды': 'Промокоды',
                'Доставка': 'Доставка и акции', 'Каталог': 'Каталог товаров', 'Фильтры': 'Фильтры', 'Бронирование': 'Онлайн-бронирование', 'Номера': 'Номера и цены', 'Расчёт': 'Расчёт стоимости брони',
                'Запись': 'Онлайн-запись', 'Отзывы': 'Отзывы', 'Цены': 'Цены', 'Праздники': 'Праздничные программы'}}
GLOSS['kk'] = {k: TAGS_KK.get(k, k) for k in GLOSS['ru']}


def feats(w):
    t = set(w['tags']); d = w['desc'].lower(); f = []
    if 'Админка' in t or 'админк' in d: f.append('admin')
    if t & {'Бронь', 'Бронь дат', 'Бронирование'} or 'брон' in d: f.append('book')
    if 'Корзина' in t or 'корзин' in d: f.append('cart')
    if 'Калькулятор' in t or 'калькулятор' in d or 'расчёт' in d: f.append('calc')
    if 'Telegram' in t or 'telegram' in d: f.append('tg')
    if t & {'2 языка', '3 языка'} or 'ru/kz' in d: f.append('lang')
    return f


FEAT = {'ru': [('admin', 'Админ-панель'), ('book', 'Бронь'), ('cart', 'Корзина'), ('calc', 'Калькулятор'), ('tg', 'Telegram'), ('lang', 'Несколько языков')],
        'kk': [('admin', 'Әкімшілік панель'), ('book', 'Брондау'), ('cart', 'Себет'), ('calc', 'Калькулятор'), ('tg', 'Telegram'), ('lang', 'Бірнеше тіл')]}
CALC_T = {'food': 'cafe', 'shop': 'shop', 'serv': 'biz'}


def city_of(lang, w):
    return work_city(lang, w).split(' · ')


def build_portfolio(lang):
    pre = '/kz' if lang == 'kk' else ''
    base = pre + '/portfolio/'
    cats = CATS if lang == 'ru' else CATS_KK
    cities = []
    for w in WORKS:
        c = city_of(lang, w)[0]
        if c not in cities: cities.append(c)
    cards = ''
    for w in WORKS:
        cs, kind = city_of(lang, w)[0], ' · '.join(city_of(lang, w)[1:])
        img = w.get('d') or w['m']; mob = not w.get('d')
        demo = '/demo/' in w['url']
        cards += '<article data-cat="%s" data-f="%s" data-city="%s"><a class="im%s" href="%s%s/">%s<img src="/%s" alt="%s" width="%d" height="%d" loading="lazy" decoding="async"></a><div class="bd"><h2><a href="%s%s/">%s</a></h2><div class="c">%s</div><p>%s</p><div class="tags">%s</div><div class="ac"><a class="btn g" href="%s" target="_blank" rel="noopener" data-portfolio="%s">%s</a><a class="btn" href="%s%s/">%s</a></div></div></article>' % (
            w['cat'], ' '.join(feats(w)), e(cs), ' m' if mob else '', base, CASE_SLUG[w['id']], '<span class="badge">%s</span>' % ('демо' if lang == 'ru' else 'демо') if demo else '',
            img, e(('Сайт ' if lang == 'ru' else 'Сайт: ') + w['name']), 390 if mob else 960, 844 if mob else 600, base, CASE_SLUG[w['id']], e(w['name']), e(cs + (' · ' + kind if kind else '')),
            e(work_desc(lang, w)), ''.join('<span>%s</span>' % e(t if lang == 'ru' else TAGS_KK.get(t, t)) for t in w['tags']), e(w['url']), w['id'],
            'Открыть сайт ↗' if lang == 'ru' else 'Сайтты ашу ↗', base, CASE_SLUG[w['id']], 'Подробнее' if lang == 'ru' else 'Толығырақ')
    L = (lambda r, k: r) if lang == 'ru' else (lambda r, k: k)
    flt = '<div class="flbl">%s</div><div class="flt" data-g="cat"><button type="button" data-v="" aria-pressed="true">%s</button>%s</div>' % (L('Сфера', 'Сала'), L('Все', 'Барлығы'), ''.join('<button type="button" data-v="%s" aria-pressed="false">%s</button>' % (k, e(v[:1].upper() + v[1:])) for k, v in cats.items()))
    flt += '<div class="flbl">%s</div><div class="flt" data-g="f"><button type="button" data-v="" aria-pressed="true">%s</button>%s</div>' % (L('Возможности', 'Мүмкіндіктер'), L('Любые', 'Кез келген'), ''.join('<button type="button" data-v="%s" aria-pressed="false">%s</button>' % (k, v) for k, v in FEAT[lang]))
    flt += '<div class="flbl">%s</div><div class="flt" data-g="city"><button type="button" data-v="" aria-pressed="true">%s</button>%s</div>' % (L('Город', 'Қала'), L('Все', 'Барлығы'), ''.join('<button type="button" data-v="%s" aria-pressed="false">%s</button>' % (e(c), e(c)) for c in cities))
    script = '''<script>(function(){var S={cat:'',f:'',city:''},A=[].slice.call(document.querySelectorAll('.pf article')),n=document.getElementById('pfN'),em=document.getElementById('pfE');
function run(){var k=0;A.forEach(function(a){var ok=(!S.cat||a.dataset.cat===S.cat)&&(!S.f||(' '+a.dataset.f+' ').indexOf(' '+S.f+' ')>=0)&&(!S.city||a.dataset.city===S.city);a.hidden=!ok;if(ok)k++});n.textContent=k;em.hidden=k>0}
document.querySelectorAll('.flt').forEach(function(g){g.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;g.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed',String(x===b))});S[g.dataset.g]=b.dataset.v;run();try{window.smTrack&&smTrack('portfolio_filter',{group:g.dataset.g,value:b.dataset.v})}catch(_){}})});
var q=new URLSearchParams(location.search);['cat','f','city'].forEach(function(g){var v=q.get(g);if(v){var b=document.querySelector('.flt[data-g="'+g+'"] button[data-v="'+v+'"]');if(b)b.click()}})})();</script>'''
    if lang == 'ru':
        h1, lead = 'Портфолио: сайты для бизнеса', 'Все сайты ниже — живые: откройте любой и посмотрите, как он работает на телефоне. Рестораны и банкетные залы, доставка, магазины, отели и компании услуг из разных городов Казахстана. Отметка «демо» — пример сайта, подготовленный для бизнеса.'
        title, desc = 'Портфолио sitemaker — %d %s для бизнеса в Казахстане' % (len(WORKS), 'сайт' if len(WORKS) % 10 == 1 and len(WORKS) % 100 != 11 else 'сайта' if 2 <= len(WORKS) % 10 <= 4 and not 12 <= len(WORKS) % 100 <= 14 else 'сайтов'), 'Портфолио веб-студии sitemaker: сайты ресторанов, доставки, магазинов, отелей и услуг. Фильтры по сфере, городу и возможностям, подробные кейсы и ссылки на живые сайты.'
    else:
        h1, lead = 'Портфолио: бизнеске арналған сайттар', 'Төмендегі сайттардың бәрі жұмыс істеп тұр: кез келгенін ашып, телефонда қалай жұмыс істейтінін қараңыз. Мейрамханалар мен банкет залдары, жеткізу, дүкендер, қонақүйлер және Қазақстанның түрлі қалаларындағы қызмет компаниялары. «Демо» белгісі — бизнеске дайындалған сайт үлгісі.'
        title, desc = 'sitemaker портфолиосы — Қазақстандағы бизнеске %d сайт' % len(WORKS), 'sitemaker портфолиосы: мейрамханалар, жеткізу, дүкендер, қонақүйлер мен қызметтер сайттары. Сала, қала және мүмкіндік бойынша сүзгілер, толық кейстер және сайт сілтемелері.'
    body = '<h1>%s</h1><p class="lead">%s</p>%s<p class="meta" style="margin-top:14px">%s <b id="pfN">%d</b></p><div class="pf">%s</div><p class="empty" id="pfE" hidden>%s</p>' % (
        h1, lead, flt, L('Показано:', 'Көрсетілді:'), len(WORKS), cards, L('Под эти фильтры работ пока нет — сбросьте один из них или напишите, какой сайт нужен.', 'Бұл сүзгілерге жұмыс әзірге жоқ — біреуін алып тастаңыз немесе қандай сайт керек екенін жазыңыз.'))
    body += box(lang, L('Здравствуйте! Посмотрел портфолио — хочу похожий сайт.', 'Сәлеметсіз бе! Портфолионы көрдім — осындай сайт қалаймын.')) + script
    ld = [{"@context": "https://schema.org", "@type": "CollectionPage", "name": h1, "url": SITE + base, "inLanguage": lang,
           "mainEntity": {"@type": "ItemList", "numberOfItems": len(WORKS), "itemListElement": [{"@type": "ListItem", "position": i + 1, "url": SITE + base + CASE_SLUG[w['id']] + '/', "name": w['name']} for i, w in enumerate(WORKS)]}}]
    alt = '/kz/portfolio/' if lang == 'ru' else '/portfolio/'
    write(base, page(lang, base, title, desc, body, [(base, L('Портфолио', 'Портфолио'))], alt=alt, ld=ld, active=base, wide=True))
    reg(base, '0.8', 'weekly', alt=alt)
    for w in WORKS: build_case(lang, w)


def build_case(lang, w):
    pre = '/kz' if lang == 'kk' else ''
    L = (lambda r, k: r) if lang == 'ru' else (lambda r, k: k)
    slug = CASE_SLUG[w['id']]; path = pre + '/portfolio/' + slug + '/'
    parts = city_of(lang, w); city = parts[0]; kind = ' · '.join(parts[1:])
    demo = '/demo/' in w['url']; gh = 'github.io' in w['url']
    f = feats(w)
    tech = ['HTML5, CSS3 и JavaScript — без конструкторов' if lang == 'ru' else 'HTML5, CSS3 және JavaScript — конструкторсыз',
            L('Адаптивная вёрстка под телефоны и планшеты', 'Телефон мен планшетке бейімделген беттеу')]
    if 'admin' in f: tech.append(L('Админ-панель sitemaker на облачном сервере: изменения сразу видны на сайте', 'Бұлттық сервердегі sitemaker әкімшілік панелі: өзгерістер сайтта бірден көрінеді'))
    if 'tg' in f: tech.append(L('Уведомления о заявках в Telegram', 'Өтінімдер туралы Telegram-ға хабарлама'))
    if 'lang' in f: tech.append(L('Несколько языковых версий', 'Бірнеше тілдік нұсқа'))
    if gh: tech.append(L('Хостинг: GitHub Pages', 'Хостинг: GitHub Pages'))
    elif demo: tech.append(L('Демо-версия размещена на sitemakerkz.com', 'Демо-нұсқа sitemakerkz.com сайтында орналасқан'))
    name = w['name']
    nm = name if lang == 'ru' else name + ' сайты'
    title = '%s — %s, %s | sitemaker' % (nm, kind, city)
    if len(title) > 70: title = '%s — %s | sitemaker' % (nm, kind)
    desc = L('Кейс: сайт %s (%s, %s). %s' % (name, kind, city, w['desc']), 'Кейс: %s сайты (%s, %s). %s' % (name, kind, city, work_desc(lang, w)))
    if len(desc) > 200: desc = desc[:197].rsplit(' ', 1)[0].rstrip(',;:') + '…'
    img_d, img_m = w.get('d'), w['m']
    shots = '<div class="shots">' + ('<img class="dsk" src="/%s" alt="%s" width="960" height="600" fetchpriority="high">' % (img_d, e(L('Сайт %s — версия для компьютера' % name, '%s сайты — компьютерге арналған нұсқа' % name))) if img_d else '') + \
            '<img src="/%s" alt="%s" width="390" height="844" loading="lazy">' % (img_m, e(L('Сайт %s — мобильная версия' % name, '%s сайты — мобильді нұсқа' % name))) + '</div>'
    calc_t = 'cat' if w['id'] == 'proyxod' else ('land' if w['id'] in ('samal', 'tulpar', 'kinderland', 'turan') else CALC_T[w['cat']])
    want = L('Здравствуйте! Хочу похожий сайт, как %s.' % name, 'Сәлеметсіз бе! %s сияқты сайт қалаймын.' % name)
    body = '<h1>%s</h1><p class="lead">%s</p>' % (e(name) + L(' — сайт: ', ' — сайт: ') + e(kind), e(work_desc(lang, w)))
    if demo:
        body += '<div class="note">%s</div>' % L('Это демо-версия: пример сайта, который я подготовил для бизнеса, чтобы показать, как может выглядеть его сайт.', 'Бұл демо-нұсқа: бизнеске оның сайты қалай көрінуі мүмкін екенін көрсету үшін дайындаған сайт үлгісі.')
    body += '<div class="cta"><a class="btn" href="%s" target="_blank" rel="noopener" data-portfolio="%s">%s</a><a class="btn g" href="%s" rel="noopener">%s%s</a><a class="btn g" href="%s">%s</a></div>' % (
        e(w['url']), w['id'], L('Открыть сайт ↗', 'Сайтты ашу ↗'), e(wa(want)), ICON_WA, L('Заказать похожий сайт', 'Осындай сайтқа тапсырыс'), calc_url(lang, calc_t), L('Рассчитать похожий', 'Ұқсасын есептеу'))
    body += shots
    body += '<div class="facts"><div><small>%s</small><b>%s</b></div><div><small>%s</small><b>%s</b></div><div><small>%s</small><b>%s</b></div><div><small>%s</small><b>%s</b></div></div>' % (
        L('Город', 'Қала'), e(city), L('Сфера', 'Сала'), e(kind), L('Категория', 'Санат'), e((CATS if lang == 'ru' else CATS_KK)[w['cat']]), L('Формат', 'Формат'), L('демо-версия', 'демо-нұсқа') if demo else L('живой сайт', 'жұмыс істеп тұрған сайт'))
    body += '<h2>%s</h2><ul class="f">%s</ul>' % (L('Что сделано на сайте', 'Сайтта не жасалды'), ''.join('<li><b>%s</b></li>' % e(GLOSS[lang].get(t, t)) for t in w['tags']))
    body += '<h2>%s</h2><ul>%s</ul>' % (L('Технологии', 'Технологиялар'), ''.join('<li>%s</li>' % e(x) for x in tech))
    same = [x for x in WORKS if x['cat'] == w['cat'] and x['id'] != w['id']][:4]
    body += '<h2>%s</h2>' % L('Похожие работы', 'Ұқсас жұмыстар') + examples(lang, [x['id'] for x in same])
    body += box(lang, want)
    if lang == 'ru':
        svc = {'food': ('/sayt-dlya-restorana/', 'Сайт для ресторана и кафе'), 'shop': ('/razrabotka-internet-magazina/', 'Разработка интернет-магазина'), 'serv': ('/sayt-dlya-biznesa/', 'Сайт для бизнеса')}[w['cat']]
        body += '<h2 style="font-size:18px">Услуги</h2><div class="rel"><a href="%s">%s</a><a href="/portfolio/">Всё портфолио</a><a href="/#calc">Калькулятор</a></div>' % svc
    else:
        body += '<h2 style="font-size:18px">Қызметтер</h2><div class="rel"><a href="/kz/qyzmetter/">Барлық қызметтер</a><a href="/kz/portfolio/">Барлық портфолио</a><a href="/kz/#calc">Калькулятор</a></div>'
    ld = [{"@context": "https://schema.org", "@type": "CreativeWork", "name": L('Сайт ', 'Сайт: ') + name, "description": work_desc(lang, w), "url": SITE + path, "inLanguage": lang,
           "image": SITE + '/' + (img_d or img_m), "creator": {"@id": SITE + "/#business", "@type": "ProfessionalService", "name": "sitemaker"}, "about": kind, "locationCreated": {"@type": "Place", "name": city},
           "sameAs": w['url']}]
    alt = ('/kz' if lang == 'ru' else '') + '/portfolio/' + slug + '/'
    write(path, page(lang, path, title, desc, body, [(pre + '/portfolio/', 'Портфолио'), (path, name)], alt=alt, ld=ld, og_img='/' + (img_d or img_m), og_type='article'))
    reg(path, '0.6', alt=alt)


# ---------------- блог ----------------
def build_blog():
    cards = ''
    for p in POSTS:
        cards += '<a href="/blog/%s/"><img src="/%s" alt="%s" width="960" height="600" loading="lazy" decoding="async"><span class="t"><b>%s</b><time datetime="%s">%s</time><p>%s</p></span></a>' % (
            p['slug'], p['img'], e(p['img_alt']), e(p['title']), p['date'], ru_date(p['date']), e(p['excerpt']))
    body = '<h1>Блог sitemaker</h1><p class="lead">Простыми словами о сайтах для бизнеса: сколько стоит, как заказать, что выбрать и как получать заявки. Без воды и «секретных техник».</p><div class="posts">%s</div>' % cards
    body += box('ru', 'Здравствуйте! Прочитал блог — хочу обсудить сайт.')
    ld = [{"@context": "https://schema.org", "@type": "Blog", "name": "Блог sitemaker", "url": SITE + "/blog/", "inLanguage": "ru", "publisher": {"@id": SITE + "/#business"},
           "blogPost": [{"@type": "BlogPosting", "headline": p['title'], "url": SITE + '/blog/%s/' % p['slug'], "datePublished": p['date']} for p in POSTS]}]
    write('/blog/', page('ru', '/blog/', 'Блог о создании сайтов для бизнеса в Казахстане | sitemaker', 'Статьи о сайтах для бизнеса: сколько стоит сайт в Казахстане, как заказать, лендинг или интернет-магазин, как выбрать домен и принимать заявки.', body, [('/blog/', 'Блог')], ld=ld, active='/blog/'))
    reg('/blog/', '0.7', 'weekly')
    for i, p in enumerate(POSTS):
        path = '/blog/%s/' % p['slug']
        toc = re.findall(r'<h2 id="([^"]+)">(.*?)</h2>', p['body'])
        words = len(re.sub(r'<[^>]+>', ' ', p['body']).split())
        mob = p.get('img_mobile')
        fig = '<figure><img src="/%s" alt="%s" width="%d" height="%d" fetchpriority="high"%s><figcaption>%s</figcaption></figure>' % (p['img'], e(p['img_alt']), 390 if mob else 960, 844 if mob else 600, ' style="max-width:320px"' if mob else '', e(p['img_alt']))
        body = '<article class="post"><h1>%s</h1><p class="meta"><time datetime="%s">%s</time> · %d мин чтения · sitemaker</p>%s' % (e(p['title']), p['date'], ru_date(p['date']), max(3, round(words / 180)), fig)
        body += '<nav class="toc" aria-label="Содержание"><b>Содержание</b><ol>%s</ol></nav>' % ''.join('<li><a href="#%s">%s</a></li>' % (a, re.sub(r'^\d+\.\s*', '', t)) for a, t in toc)
        body += p['body'] + '</article>'
        body += box('ru', 'Здравствуйте! Прочитал статью «%s» — хочу обсудить сайт.' % p['title'])
        rel_posts = [q for q in POSTS if q is not p][:3]
        body += '<h2 style="font-size:18px">Услуги по теме</h2><div class="rel">%s</div>' % ''.join('<a href="%s">%s</a>' % (h, dict(SERV_RU + [('/portfolio/', 'Портфолио'), ('/sayt-dlya-uslug/', 'Сайт для компании услуг')]).get(h, h)) for h in p['related'])
        body += '<h2 style="font-size:18px">Читайте также</h2><div class="rel">%s</div>' % ''.join('<a href="/blog/%s/">%s</a>' % (q['slug'], e(q['title'])) for q in rel_posts)
        ld = [{"@context": "https://schema.org", "@type": "BlogPosting", "headline": p['title'], "description": p['desc'], "image": SITE + '/' + p['img'], "datePublished": p['date'], "dateModified": p['date'],
               "inLanguage": "ru", "mainEntityOfPage": SITE + path, "author": {"@type": "Organization", "name": "sitemaker", "url": SITE + "/"}, "publisher": {"@id": SITE + "/#business", "@type": "Organization", "name": "sitemaker", "logo": {"@type": "ImageObject", "url": SITE + "/icon-512.png"}}}]
        write(path, page('ru', path, p['seo_title'], p['desc'], body, [('/blog/', 'Блог'), (path, p['title'])], ld=ld, og_img='/' + p['img'], og_type='article',
                         extra_head='<meta property="article:published_time" content="%s">\n' % p['date']))
        reg(path, '0.6', lastmod=p['date'])


MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']


def ru_date(d):
    y, m, dd = d.split('-'); return '%d %s %s' % (int(dd), MONTHS[int(m) - 1], y)


# ---------------- 404 ----------------
def build_404():
    body = '<div class="nf"><div class="big">404</div><h1 style="font-size:clamp(22px,4vw,30px)">Такой страницы нет</h1><p>Возможно, ссылка устарела или в адресе опечатка. Вот куда можно перейти:</p><div class="cta"><a class="btn" href="/">На главную</a><a class="btn g" href="/uslugi/">Услуги</a><a class="btn g" href="/portfolio/">Портфолио</a><a class="btn g" href="/#calc">Калькулятор</a></div>' \
           '<p lang="kk" style="margin-top:22px">Мұндай бет жоқ. <a href="/kz/">Басты бетке (қазақша)</a></p></div>'
    h = page('ru', '/404.html', 'Страница не найдена — 404 | sitemaker', 'Страница не найдена. Перейдите на главную sitemaker, к услугам или портфолио.', body, None, noindex=True)
    # GitHub Pages отдаёт 404.html с любого адреса — пути должны быть абсолютными
    write('/404.html', h)


# ---------------- существующие страницы: перелинковка, цены, скрипты ----------------
OLD = ['sozdanie-saitov-petropavlovsk', 'sozdanie-saitov-astana', 'sozdanie-saitov-kostanay', 'sozdanie-saitov-karaganda',
       'sayt-dlya-restorana', 'sayt-dlya-dostavki-edy', 'sayt-dlya-salona-krasoty', 'sayt-dlya-kliniki', 'sayt-dlya-otelya', 'sayt-dlya-uslug']
MARK = '<!--sm3-->'


def patch_old():
    for slug in OLD:
        fp = os.path.join(ROOT, slug, 'index.html'); s = open(fp, encoding='utf-8').read()
        path = '/%s/' % slug
        # цены (живые данные: кафе 7 000 ₸; бизнес-сайт — без админки, админка +5 000 ₸)
        s = s.replace('От 10 000 ₸', 'От 7 000 ₸').replace('от 10 000 ₸', 'от 7 000 ₸').replace('от 10&nbsp;000&nbsp;₸', 'от 7&nbsp;000&nbsp;₸').replace('— от 10&nbsp;000&nbsp;₸', '— от 7&nbsp;000&nbsp;₸')
        s = s.replace('бизнес-сайт с админкой и калькулятором — от 17 500 ₸', 'бизнес-сайт — от 17 500 ₸, админ-панель — плюс 5 000 ₸')
        s = s.replace('Бизнес-сайт с админкой и калькулятором — от 17&nbsp;500&nbsp;₸', 'Бизнес-сайт на несколько страниц — от 17&nbsp;500&nbsp;₸, админ-панель — плюс 5&nbsp;000&nbsp;₸')
        if MARK not in s:
            # шапка: разделы сайта
            s = s.replace('</style>', '.tn{display:flex;gap:18px;margin-left:auto;margin-right:14px;font-size:11.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#bdb8b0}.tn a{text-decoration:none}.tn a:hover{color:#fff}@media(max-width:760px){.tn{display:none}}\n</style>', 1)
            s = re.sub(r'(<header><div class="w"><a class="logo" href="\.\./">.*?sitemaker</a>)', r'\1<nav class="tn" aria-label="Разделы"><a href="/uslugi/">Услуги</a><a href="/portfolio/">Портфолио</a><a href="/blog/">Блог</a><a href="/#calc">Калькулятор</a></nav>', s, count=1, flags=re.S)
            # «Другие города»: полный список
            s = re.sub(r'<h2 style="font-size:18px">Другие города</h2>\s*<div class="rel">.*?</div>', '<h2 style="font-size:18px">Другие города</h2>\n<div class="rel">%s</div>' % ''.join('<a href="%s">Создание сайтов: %s</a>' % (h, n) for h, n in CITY_RU if h != path), s, count=1, flags=re.S)
            if 'Другие города' not in s:
                s = s.replace('</main>', '<h2 style="font-size:18px">Создание сайтов в городах</h2>\n<div class="rel">%s</div>\n</main>' % ''.join('<a href="%s">%s</a>' % (h, n) for h, n in CITY_RU), 1)
            s = s.replace('</main>', '<h2 style="font-size:18px">Услуги</h2>\n<div class="rel">%s</div>\n<h2 style="font-size:18px">Полезное</h2>\n<div class="rel"><a href="/portfolio/">Портфолио с фильтрами</a>%s</div>\n%s</main>' % (
                ''.join('<a href="%s">%s</a>' % (h, n) for h, n in SERV_RU), ''.join('<a href="%s">%s</a>' % (h, n) for h, n in BLOG_RU[:3]), MARK), 1)
            s = s.replace('<a href="../#works">в портфолио на главной</a>', '<a href="/portfolio/">в портфолио</a>')
            s = s.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="website">\n<meta property="og:site_name" content="sitemaker">', 1)
            s = s.replace('</body>', '<script src="/js/analytics.js?v=%s" defer></script>\n<script src="/js/consult.js?v=%s" defer></script>\n</body>' % (V, V), 1)
        open(fp, 'w', encoding='utf-8').write(s)
        reg(path, '0.9' if 'sozdanie' in slug else '0.8')


# ---------------- js/cases.js, sitemap, robots ----------------
def write_cases():
    m = {w['id']: CASE_SLUG[w['id']] for w in WORKS}
    open(os.path.join(ROOT, 'js/cases.js'), 'w', encoding='utf-8').write('/* страницы кейсов портфолио: id работы → адрес (генерируется _tools/build_pages.py) */\nwindow.SM_CASES=%s;\n' % json.dumps(m, ensure_ascii=False))


def write_sitemap():
    head = [('/', TODAY, '1.0', 'weekly', '/kz/'), ('/kz/', TODAY, '0.9', 'weekly', '/')]
    seen = set(); items = []
    for x in head + OUT:
        if x[0] in seen: continue
        seen.add(x[0]); items.append(x)
    out = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for path, lm, pr, fq, alt in items:
        out.append('  <url>\n    <loc>%s%s</loc>\n    <lastmod>%s</lastmod>\n    <changefreq>%s</changefreq>\n    <priority>%s</priority>' % (SITE, path, lm, fq, pr))
        if alt:
            ru, kk = (path, alt) if not path.startswith('/kz/') else (alt, path)
            out.append('    <xhtml:link rel="alternate" hreflang="ru" href="%s%s"/>\n    <xhtml:link rel="alternate" hreflang="kk" href="%s%s"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="%s%s"/>' % (SITE, ru, SITE, kk, SITE, ru))
        out.append('  </url>')
    out.append('</urlset>')
    open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
    return len(items)


def write_robots():
    open(os.path.join(ROOT, 'robots.txt'), 'w', encoding='utf-8').write('''User-agent: *
Allow: /
Disallow: /admin.html
Disallow: /crm/
Disallow: /demo/crm/
Disallow: /*/admin.html
Disallow: /_tools/

Sitemap: https://sitemakerkz.com/sitemap.xml
''')


if __name__ == '__main__':
    for s in SERVICES: build_service(s, 'ru')
    for s in SERVICES_KK: build_service(s, 'kk')
    for c in CITIES: build_city(c)
    build_hubs()
    build_portfolio('ru'); build_portfolio('kk')
    build_blog()
    build_404()
    patch_old()
    write_cases()
    n = write_sitemap()
    write_robots()
    print('pages registered:', len(OUT), 'sitemap urls:', n)
