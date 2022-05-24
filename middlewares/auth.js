const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const sendError = () => res.status(401).send(new UnauthorizedError('Нужно авторизироваться'));

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendError();
  }

  const token = authorization.replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    return sendError();
  }

  return next();
};
