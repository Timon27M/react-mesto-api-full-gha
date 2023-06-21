const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const {
  validatorLogin,
  validatorCreateUser,
} = require('./middlewares/validators');
const handlerError = require('./middlewares/handlerError');
const NotFoundError = require('./errors/NotFoundError');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

app.post('/signin', validatorLogin, login);
app.post('/signup', validatorCreateUser, createUser);

app.use(auth);
app.use('/', routesUser);
app.use('/', routesCard);

app.use('/', () => {
  throw new NotFoundError('Произошла ошибка: Неправильный путь');
});

app.use(errorLogger);

app.use(errors());
app.use(handlerError);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
