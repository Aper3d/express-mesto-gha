const jwt = require('jsonwebtoken');
require('dotenv').config();
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;

const handleAuthError = (next) => {
  next(new UnauthorizedError('Необходима авторизация'));
};

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(next);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    handleAuthError(next);
  }
  req.user = payload;
  next();
};
