# react-mesto-api-full-gha
-----------------------------------------------------------------------------------------
## Frontend
### Функционал
* пользователь получает сообщение в случае любой ошибки.
* доступен на мобильных устройствах.
* сетка карточек зависит от ширины экрана.
* регистрация и авторизация пользователя.
* у всех интерактивных элементов есть анимация.
* редактирование профиля (имя, описание).
* при попытке перейти на любой защищённый роут происходит редирект на главную.
* поля формы заблокированы во время отправки запросов, и у пользователя нет возможности отправить новый запрос до завершения предыдущего.
* все формы валидируются на стороне клиента, пользователь не может отправить запрос с невалидными данными.
* если пользователь был авторизован и закрыл вкладку, он может вернуться сразу на любую страницу приложения по URL-адресу, кроме страниц авторизации и регистрации.
* реализован функционал добавления и удаления карточек

### Технологии
* HTML
* CSS
  - Flexbox
  - Grid Layout
  - Adaptive UI
  - Media Queries
  - БЭМ
* JavaScript
  - Rest API
  - Асинхронность
  - использование локального хранилища
* React
  - Портирование разметки в JSX
  - Функциональные компоненты
  - React Router
  - работа с API
  - Хуки (useState, useEffect, useContext)
* Webpack

## Backend
### Функционал
* написан на JavaScript, Node.js,
* использована база данных Mongo,
* централизованная обработка ошибок,
* реализована регистрация и авторизация пользователя,
* валидация запросов приходящих на сервер,
* валидация введённых пользователем данных.

### Технологии
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MongoDB](https://img.shields.io/badge/nginx-%234ea94b.svg?style=for-the-badge&logo=nginx&logoColor=white)

### Инструкция
* Создайте папку и перейдите в неё:
  `cd <Имя-папки>`
* Склонируйте этот репозиторий:
  `git clone https://github.com/famovkin/react-mesto-api-full-gha.git`
* Установите все зависимости:
  `yarn или npm install`
* Теперь можете запустить проект:
  `npm start или yarn start`

## Ссылки на проект

IP 84.252.142.80

Frontend https://tim27.nomoreparties.sbs/

Backend https://api.tim27.nomoreparties.sbs/
