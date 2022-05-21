const userRouter = require('express').Router();
const { getUserAuth, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUserAuth);
userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
