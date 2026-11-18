/* Abramenko Studio — данные сайта (демо).
   В демо всё, что меняется в админке, хранится в браузере (localStorage).
   В рабочей версии те же данные живут в облаке, а записи приходят в Telegram. */
(function () {
  var KEY = 'abramenko_demo_data_v1';
  var BKEY = 'abramenko_demo_bookings_v1';

  var DEFAULT = {
  "settings": {
    "name": "ABRAMENKO",
    "tagline": "studio",
    "slogan": "Уникальные оттенки и здоровье ваших волос",
    "wa": "77074865437",
    "phone": "+7 707 486 54 37",
    "address": "Петропавловск: Букетова, 61 и Жабаева, 127",
    "hours": "По записи",
    "open": "09:00",
    "close": "20:00",
    "instagram": "studio_abramenkomariia",
    "men": "studio_abramenkomariia",
    "gis": "https://2gis.kz/petropavlovsk/firm/70000001102457336",
    "rating": "5,0",
    "reviews": "178"
  },
  "promo": {
    "on": true,
    "title": "Консультация колориста",
    "text": "Подберём оттенок и план окрашивания до записи на сложную работу"
  },
  "cats": [
    {
      "id": "color",
      "name": "Окрашивание"
    },
    {
      "id": "cut",
      "name": "Стрижки и укладки"
    },
    {
      "id": "epil",
      "name": "Лазерная эпиляция"
    }
  ],
  "services": [
    {
      "id": "s1",
      "cat": "color",
      "name": "Сложное окрашивание (AirTouch, шатуш)",
      "time": "5–7 ч",
      "price": 45000,
      "from": true,
      "on": true,
      "hit": true
    },
    {
      "id": "s2",
      "cat": "color",
      "name": "Мелирование",
      "time": "3–4 ч",
      "price": 25000,
      "from": true,
      "on": true
    },
    {
      "id": "s3",
      "cat": "color",
      "name": "Блонд, осветление",
      "time": "4–6 ч",
      "price": 30000,
      "from": true,
      "on": true
    },
    {
      "id": "s4",
      "cat": "color",
      "name": "Окрашивание в один тон",
      "time": "2–3 ч",
      "price": 15000,
      "from": true,
      "on": true
    },
    {
      "id": "s5",
      "cat": "color",
      "name": "Тонирование",
      "time": "1 ч 30 мин",
      "price": 10000,
      "from": true,
      "on": true
    },
    {
      "id": "s6",
      "cat": "color",
      "name": "Восстановление и уход",
      "time": "60 мин",
      "price": 7000,
      "from": true,
      "on": true
    },
    {
      "id": "s7",
      "cat": "cut",
      "name": "Женская стрижка",
      "time": "60 мин",
      "price": 8000,
      "from": true,
      "on": true,
      "hit": true
    },
    {
      "id": "s8",
      "cat": "cut",
      "name": "Чёлка",
      "time": "20 мин",
      "price": 3000,
      "on": true
    },
    {
      "id": "s9",
      "cat": "cut",
      "name": "Мужская стрижка",
      "time": "45 мин",
      "price": 5000,
      "on": true
    },
    {
      "id": "s10",
      "cat": "cut",
      "name": "Детская стрижка",
      "time": "40 мин",
      "price": 4000,
      "on": true
    },
    {
      "id": "s11",
      "cat": "cut",
      "name": "Укладка",
      "time": "45 мин",
      "price": 6000,
      "from": true,
      "on": true
    },
    {
      "id": "s12",
      "cat": "epil",
      "name": "Подмышки",
      "time": "15 мин",
      "price": 5000,
      "on": true
    },
    {
      "id": "s13",
      "cat": "epil",
      "name": "Голени",
      "time": "30 мин",
      "price": 10000,
      "on": true
    },
    {
      "id": "s14",
      "cat": "epil",
      "name": "Глубокое бикини",
      "time": "30 мин",
      "price": 12000,
      "on": true
    },
    {
      "id": "s15",
      "cat": "epil",
      "name": "Мужская эпиляция: спина",
      "time": "40 мин",
      "price": 15000,
      "from": true,
      "on": true
    }
  ],
  "masters": [
    {
      "id": "m1",
      "name": "Мария Абраменко",
      "role": "Арт-директор, колорист-стилист",
      "note": "Чемпион Азии, судья парикмахерских конкурсов, обучает колористике"
    },
    {
      "id": "m2",
      "name": "Яна",
      "role": "Колорист",
      "note": "Сложные оттенки и бережная работа с волосами"
    },
    {
      "id": "m3",
      "name": "Наталья",
      "role": "Колорист",
      "note": "«Спасибо мастеру Наталье за AirTouch» — из отзыва в 2ГИС"
    },
    {
      "id": "m4",
      "name": "Олеся",
      "role": "Мастер студии",
      "note": "Принимает в студии, запись через администратора"
    }
  ],
  "works": [
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMmQxYzE0Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiNiMDdhNGEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmM2RjYWUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDk3IEMgMTYwIDIyOCwgMzgwIC0zMSwgNjQwIDQyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA0NDMgQyAxNjAgNDc3LCAzODAgMzkwLCA2NDAgMzQ3IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEzIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA0MDMgQyAxNjAgNTU0LCAzODAgMjQ0LCA2NDAgNDYxIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEyIiBzdHJva2Utd2lkdGg9IjciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAxOTQgQyAxNjAgMzM2LCAzODAgODYsIDY0MCAzMDQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIC0xNCBDIDE2MCAxMDMsIDM4MCAtMTcwLCA2NDAgMTA2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE4IiBzdHJva2Utd2lkdGg9IjciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAxODEgQyAxNjAgMjM3LCAzODAgMzUsIDY0MCAxOTYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDQ2NyBDIDE2MCA1OTAsIDM4MCA0MjYsIDY0MCA0MzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDczOSBDIDE2MCA4MTQsIDM4MCA3MjcsIDY0MCA4NTYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDYiIHN0cm9rZS13aWR0aD0iNiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDYxNyBDIDE2MCA1MDgsIDM4MCA1NTIsIDY0MCA2NTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMjAiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDgzIEMgMTYwIDkzLCAzODAgMTc5LCA2NDAgMjAyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIwIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA2NDYgQyAxNjAgNTgzLCAzODAgNjQxLCA2NDAgNTk4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE0IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=",
      "cap": "AirTouch"
    },
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZTljZjljIi8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiNkMmE1NWUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhODc0M2EiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDE3IEMgMTYwIC05NywgMzgwIC0xMDAsIDY0MCAtMTEiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTgiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDY0NSBDIDE2MCA2NDIsIDM4MCA2MTMsIDY0MCA2ODAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDU1NSBDIDE2MCA0NzYsIDM4MCA2MTUsIDY0MCA1OTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTIiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDQ4MSBDIDE2MCA1MTEsIDM4MCA1OTksIDY0MCA2MDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTIiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIC00IEMgMTYwIC0xNTAsIDM4MCAyMiwgNjQwIC01IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE5IiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAzOTMgQyAxNjAgNTAyLCAzODAgMzE3LCA2NDAgNDE2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAtMTYgQyAxNjAgLTg2LCAzODAgLTEwLCA2NDAgLTkyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAzMjggQyAxNjAgNDMxLCAzODAgNDU0LCA2NDAgMjU0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIwIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA3NzUgQyAxNjAgODI3LCAzODAgODgzLCA2NDAgODg3IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE5IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA3NjggQyAxNjAgOTExLCAzODAgNzg5LCA2NDAgNzQwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIwIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAxMjUgQyAxNjAgMTY5LCAzODAgMjAxLCA2NDAgMTcyIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEzIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz48L3N2Zz4=",
      "cap": "Тёплый блонд"
    },
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjM2IyNDE4Ii8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM2YjQ0MzAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhMjcyNGYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDIwMyBDIDE2MCAzNDYsIDM4MCAzMjEsIDY0MCAxMTYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTEiIHN0cm9rZS13aWR0aD0iNiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDQ0NSBDIDE2MCA2MDUsIDM4MCA1ODIsIDY0MCAzNDEiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTQiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDIyNSBDIDE2MCAzNDcsIDM4MCAxODQsIDY0MCAxNTQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMjAiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDUxMyBDIDE2MCA2MzQsIDM4MCA1OTYsIDY0MCA0OTQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDE5NyBDIDE2MCAxMTQsIDM4MCAzMDQsIDY0MCAxNzYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDc1NSBDIDE2MCA2MjcsIDM4MCA2NzYsIDY0MCA4MjkiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDI2OCBDIDE2MCAxMjMsIDM4MCAyNDUsIDY0MCAyNjkiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTQiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDY5MSBDIDE2MCA3NDksIDM4MCA3MzMsIDY0MCA3NTciIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTciIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDk3IEMgMTYwIDEyNCwgMzgwIC0xNCwgNjQwIC0xNCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wOCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgMjI0IEMgMTYwIDI4NywgMzgwIDM4NCwgNjQwIDMyMiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xMCIgc3Ryb2tlLXdpZHRoPSI2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgMzU1IEMgMTYwIDQ4OCwgMzgwIDM3NCwgNjQwIDM3MSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNCIgc3Ryb2tlLXdpZHRoPSI2IiBmaWxsPSJub25lIi8+PC9zdmc+",
      "cap": "Шоколад и кофе"
    },
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOGEzYjFkIi8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiNjNDYyMmIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNlOWEwNjYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDIwMSBDIDE2MCAxOTYsIDM4MCA5MywgNjQwIDI2NSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xMiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgNTIgQyAxNjAgLTc0LCAzODAgLTk4LCA2NDAgMzQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTQiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDc3OSBDIDE2MCA2NDksIDM4MCA3MzIsIDY0MCA3OTIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTQiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDc1OCBDIDE2MCA2ODYsIDM4MCA2NTIsIDY0MCA3MDUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDYxNiBDIDE2MCA1ODksIDM4MCA1OTUsIDY0MCA1NDUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDgiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDYwMiBDIDE2MCA2MzIsIDM4MCA0ODYsIDY0MCA2OTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTQiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDM1NyBDIDE2MCA0NTYsIDM4MCAzMjQsIDY0MCAyODIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDUxIEMgMTYwIDE3MSwgMzgwIDQ0LCA2NDAgLTY4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE5IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA2ODEgQyAxNjAgNjgwLCAzODAgNzgxLCA2NDAgNjEwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEyIiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAyNTUgQyAxNjAgMzE1LCAzODAgMzI2LCA2NDAgMTc2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjA5IiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA3NzYgQyAxNjAgNjM4LCAzODAgNjU3LCA2NDAgNjY3IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEyIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiLz48L3N2Zz4=",
      "cap": "Медный"
    },
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjY2ZjZGQwIi8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiM5ZGEwYTgiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1ZDYwNjgiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDU5NyBDIDE2MCA1NjcsIDM4MCA2MjAsIDY0MCA2ODAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTYiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDYyNyBDIDE2MCA3MzgsIDM4MCA0ODEsIDY0MCA3MjIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTMiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDYyNCBDIDE2MCA0OTAsIDM4MCA1NDQsIDY0MCA1MzIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTEiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDM0OSBDIDE2MCA0NjcsIDM4MCAyNDEsIDY0MCAzNzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iNyIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDE4MSBDIDE2MCAyMjksIDM4MCAxNjQsIDY0MCAxMDciIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTkiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIDEyMyBDIDE2MCAtMSwgMzgwIDM0LCA2NDAgMTYxIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE1IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA5NSBDIDE2MCAtNjUsIDM4MCAtNjMsIDY0MCAyOCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNyIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgMTMwIEMgMTYwIDExOCwgMzgwIDEzMCwgNjQwIDYwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE0IiBzdHJva2Utd2lkdGg9IjciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA2MDAgQyAxNjAgNTQ0LCAzODAgNTMzLCA2NDAgNzIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIwIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAzNTIgQyAxNjAgMzQ0LCAzODAgMjAzLCA2NDAgMzI0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEyIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAyMzAgQyAxNjAgMTAzLCAzODAgMjM5LCA2NDAgMTg3IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE3IiBzdHJva2Utd2lkdGg9IjYiIGZpbGw9Im5vbmUiLz48L3N2Zz4=",
      "cap": "Пепельный"
    },
    {
      "img": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBzbGljZSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmE0YTMzIi8+PHN0b3Agb2Zmc2V0PSIuNTUiIHN0b3AtY29sb3I9IiNlMGJmOGUiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNmNmU5Y2YiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9Ijc1MCIgZmlsbD0idXJsKCNnKSIvPjxwYXRoIGQ9Ik0gLTMwIDc3MiBDIDE2MCA5MDUsIDM4MCA2NTMsIDY0MCA3NzYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMTciIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0gLTMwIC00MCBDIDE2MCAtMTI2LCAzODAgMTAwLCA2NDAgLTQwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjIwIiBzdHJva2Utd2lkdGg9IjciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCAzNDIgQyAxNjAgMzQ1LCAzODAgMTkzLCA2NDAgMjkxIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjEzIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA3MDcgQyAxNjAgNzU4LCAzODAgODIyLCA2NDAgNzI1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE2IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA1MzYgQyAxNjAgNjU5LCAzODAgNTExLCA2NDAgNTg1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjE3IiBzdHJva2Utd2lkdGg9IjciIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNIC0zMCA1MCBDIDE2MCAxMDcsIDM4MCA2MSwgNjQwIC00NyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xMSIgc3Ryb2tlLXdpZHRoPSI1IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgMjE2IEMgMTYwIDI4MywgMzgwIDEwNCwgNjQwIDI4OSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wOSIgc3Ryb2tlLXdpZHRoPSI3IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgNzc1IEMgMTYwIDc2NCwgMzgwIDY2NCwgNjQwIDY2NiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xNCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgNjMxIEMgMTYwIDY1NSwgMzgwIDcyMCwgNjQwIDc0OSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xOCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgNDg3IEMgMTYwIDYyMSwgMzgwIDU4NCwgNjQwIDYwMSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4wNiIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTSAtMzAgMjEwIEMgMTYwIDM1OCwgMzgwIDI3MCwgNjQwIDE2NyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4xMSIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9zdmc+",
      "cap": "Мелирование"
    }
  ],
  "reviews": [
    {
      "name": "Настя",
      "text": "Салон супер. Мастера все вежливые, находят подход к любому пожеланию. Спасибо мастеру Наталье за AirTouch и Марии за чёлку."
    },
    {
      "name": "Клиентка",
      "text": "После мелирования волосы выглядят на миллион! Блеск нереальный, форма стрижки держится отлично. Спасибо за моё преображение!"
    }
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
