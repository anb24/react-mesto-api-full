const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
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
  next();
};

// const jwt = require('jsonwebtoken');

// const { NODE_ENV, JWT_SECRET } = process.env;

// const UnauthorizedError = require('../errors/UnauthorizedError');

// function auth(req, res, next) {
//   const token = req.cookies.jwt;

//   if (!token) {
//     throw new UnauthorizedError('Ошибка авторизации: не найден req.cookies.jwt');
//   }

//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret');
//   } catch (err) {
//     throw new UnauthorizedError('Требуется авторизация');
//   }

//   req.user = payload;
//   next();
// }

// module.exports = { auth };
