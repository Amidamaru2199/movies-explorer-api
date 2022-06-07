const router = require('express').Router();

const userRouter = require('./users');
const authRouter = require('./auth');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');

router.use(authRouter);

router.use(auth);
router.use(userRouter);
router.use(moviesRouter);

module.exports = router;
