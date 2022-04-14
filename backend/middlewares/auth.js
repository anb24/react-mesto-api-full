const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  // const token = req.cookies.jwt;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('Ошибка авторизации: не найден token');
  }

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret');
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация');
  }

  req.user = payload;
  next();
}

module.exports = { auth };
