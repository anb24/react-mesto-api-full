const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

function auth(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith('Bearer ')) {
    return new UnauthorizedError('Требуется авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret');
  } catch (err) {
    return new UnauthorizedError('Требуется авторизация');
  }
  req.user = payload;
  return next();
}

module.exports = { auth };

// const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const { UnauthorizedError } = require('../errors/UnauthorizedError');

// function auth(req, res, next) {
//   const token = req.cookies.jwt;

//   if (!token) {
//     throw new UnauthorizedError('Ошибка авторизации: не найден req.cookies.jwt');
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     throw new UnauthorizedError('Ошибка верификации токена');
//   }

//   req.user = payload;
//   next();
// }

// module.exports = { auth };
