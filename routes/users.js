const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUserById, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUserById);
userRouter.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  updateUser,
);

module.exports = userRouter;
