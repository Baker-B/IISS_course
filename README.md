# Respiratory Diseases Expert System

## Як працювати з проектом

1. Перевірити версію NodeJS. В терміналі набрати команду: `node -v`
2. Якщо NodeJS не встановлено, потрібно встановити її за допомогою менеджера версій:
   _Debian_ [nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-debian-10#installing-node-using-the-node-version-manager)
   _Windows_ [nvm](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-windows#step-1-installing-node-js-using-node-version-manager)

### Оточення

`nvm -v`
0.39.1
`node -v`
v16.15.0
`npm -v`
9.5.1

## Налаштування та запуск проекта

1. В каталозі проекта виконати команду `npm install && npm audit fix`.
2. Для запуску проекта виконати команду `npm run devstart`
3. Далі потрібно відкрити в браузері сторінку за адресою [http://localhost:3000](http://localhost:3000).

## Як працює система

- База знань розташована в файлі `./lib/data.json`.
- Логику розташовано в файлі `./lib/es.js`.
- В файлі `./public/js/main.js` можна налаштувати переклад назв хвороб. В цьому ж файлі розташовано логика обробки форм спілкування з пацієнтом та запитів до бази даних.
- В файлі `./public/js/main.js` міститься налаштування зовнішнього вигляду та інтерфейсу застосунка
- Точкою входу застосунку є файл `./lib/app.js`.
- Керування залежностями, версіями та налаштування команд запуску застосунку розташовано в файлі `./package.json`.
- Фронт зроблено на view engine `handlebars`. Статичні файлі фронта розташовано в каталозі `./public/`.
- Всі програми-залежності розташовано в каталозі `./node_modules/` (це є стандартом в проектах на NodeJS)

## :notebook: Опис системи

Проста експертна система для діагностики респіраторних захворювань, написана на JavaScript.

- Застосунок розроблено на базі [Express](https://expressjs.com/uk/), фреймворк для веб-застосунків, побудованих на Node.js.
- Експертна система розроблена з використанням пакету [rools](https://github.com/frankthelen/rools), невеликого рішення для побудови та обробки правил для Node.js, та [Handlebars.js](https://github.com/handlebars-lang/handlebars.js), мови семантичних шаблонів для JavaScript.

![Інтерфейс експертної системи](/docs/img/ui.png){ width="800" height="600" style="display: block; margin: 0 auto" }
Інтерфейс експертної системи

Для диференціальної діагностики було відібрано 16 респіраторних захворювань:

- Гострий бронхіт
- Астма
- Бронхоектази
- Бронхіоліт
- Хронічне обструктивне захворювання легень (ХОЗЛ)
- Застуда
- COVID-19
- Круп
- Муковісцидоз
- Грип
- Рак легенів
- Професійні захворювання легень
- Коклюш
- Пневмонія
- Риносинусит
- Туберкульоз

Диференціальний діагноз ґрунтується на сукупності 13 факторів, які поділяються на категорії:

- **Епідеміологічні фактори**
  - Вікова група
  - Стать
  - Сімейний анамнез
  - Тютюнопаління в анамнезі
- **Клінічні фактори**
  - Тривалість
  - Біль у грудях
  - Кашель
  - Кашель з кров'ю (кровохаркання)
  - Лихоманка
  - Прискорене дихання (тахіпное)
  - Прискорене серцебиття (тахікардія)
  - Задишка (диспное)
  - Хрипи

## :evergreen_tree: Побудова дерева рішень за допомогою алгоритму ID3

Для генерації дерева рішень для експертної системи використовується алгоритм [Iterative Dichotomiser 3 (ID3)](<https://uk.wikipedia.org/wiki/ID3_(%D0%B0%D0%BB%D0%B3%D0%BE%D1%80%D0%B8%D1%82%D0%BC)>).
Дерево рішень може бути перетворено на порівнянний набір правил, в якому кожне правило відповідає можливому шляху від кореневого вузла до будь-якого листового вузла. Набір правил використовується як механізм правил для експертної системи.

![Дерево рішень](/docs/img/decision_tree.png){ width="800" height="600" style="display: block; margin: 0 auto" }

Дерево рішень

:unlock: \*\*Зауважте, що лише 9 з 13 факторів використовуються для отримання правил прийняття рішень.

Це пов'язано з 2 причинами:

- Ці 9 факторів:
  куріння в анамнезі, біль у грудях, кашель, кашель з кров'ю, лихоманка, прискорене дихання, прискорене серцебиття, задишка і хрипи -
  є первинними предикторами або індикаторами респіраторних захворювань.
  Ці предиктори є симптомами, які викликані безпосередньо певним респіраторним захворюванням.
  Куріння в анамнезі є винятком. Це не симптом, але він є "провідною причиною" більшості респіраторних захворювань.
- 4 виключені фактори:
  вікова група, стать, сімейний анамнез і тривалість куріння -
  вважаються факторами ризику респіраторних захворювань.
  Фактори ризику є _кореляційними_ і _не обов'язково причинно-наслідковими_, а кореляція не означає причинно-наслідковий зв'язок.
  Ці фактори ризику можуть підвищувати ризик розвитку респіраторних захворювань, але вони не є _прямими_ або _провідними причинами_ цих захворювань.

## Copyright (c) 2020 Ray Jasson

[Respiratory Diseases Expert System](https://github.com/rayjasson98/Respiratory-Diseases-Expert-System)

## :black_nib: Посилання

- [WikiDoc for Respiratory Disease Differential Diagnosis](https://www.wikidoc.org/index.php/Respiratory_disease_differential_diagnosis)
- [WikiDoc for COVID-19 Differential Diagnosis](https://www.wikidoc.org/index.php/COVID-19_differential_diagnosis)
- [An expert system for diagnosis of diabetes](https://github.com/ZenHuzaini/node-js-expert-system-diabetes)
- [rools - a small rule engine for Node.js](https://github.com/frankthelen/rools)
- [Python scripts for generating decision trees](https://github.com/Erikfather/Decision_tree-python)
- [Handlebars.js - a simple semantic templating langauge](https://github.com/handlebars-lang/handlebars.js)
