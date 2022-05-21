const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    });
};

module.exports.getUserAuth = (req, res) => {
  User.findById(req.user._id)// запрос одного
    .then((users) => {
      res.send({
        name: users.name,
        email: users.email,
      });
    })
    .catch((err) => console.log(err));
};

module.exports.updateUser = (req, res) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.log('Переданы некорректные данные при обновлении пользователя');
      } else {
        console.log(err);
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта (или пароль)'));// Неправильные почта
      }
      // сравниваем переданный пароль и хеш из базы
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // хеши не совпали — отклоняем промис
            return Promise.reject(new Error('Неправильные (почта или) пароль'));// хеши не совпали у пароля
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });// вернём токен
    })
    .catch((err) => {
      console.log(err);
    });
};
