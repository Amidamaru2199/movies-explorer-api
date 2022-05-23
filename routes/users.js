const userRouter = require('express').Router();
const { getUserById, updateUser } = require('../controllers/users');

userRouter.get('/users/me', getUserById);
userRouter.patch('/users/me', updateUser);

module.exports = userRouter;
