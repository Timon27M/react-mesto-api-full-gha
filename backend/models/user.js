const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const bcrypt = require('bcryptjs');
const UnauthorizatedError = require('../errors/UnauthorizatedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (url) => isUrl(url),
      message: 'Неправильный адрес URL',
    },
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: 'Неправильный адрес почты',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizatedError('Неправильные почта и пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizatedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
