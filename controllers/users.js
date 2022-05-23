const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // импортируем модуль jsonwebtoken
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRquestError = require('../errors/BadRequestError');

const { NODE_ENV, JWT_SECRET } = process.env;

exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((passwordHash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    }))
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send(err));
};

exports.getUserById = (req, res) => {
  const userId = req.user && req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      } else {
        res.send(user);
      }
    })
    .catch((err) => res.status(err.statusCode).send(err));
};

exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRquestError('Переданы некорректные данные при обновлении пользователя'));
      } else {
        next(err);
      }
    });
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта (или пароль)')); // Неправильные почта
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          // хеши не совпали — отклоняем промис
          return Promise.reject(new Error('Неправильные (почта или) пароль')); // хеши не совпали у пароля
        }
        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(400).send({ message: err.message });
    });
};
