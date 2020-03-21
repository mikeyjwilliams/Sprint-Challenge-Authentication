/**
 * /*
 *   complete the middleware code to check if the user is logged in
 *   before granting access to the next middleware/route handler
 *
 * @format
 */
const secret = require('../Secret/secret');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token, 'token');
  if (!token) {
    console.log('1st');
    return res.status(401).json({ you: 'shall not pass!' });
  }
  jwt.verify(token, secret.jwtSecret, (err, decoded) => {
    if (err) {
      console.log('2nd');
      return res.status(401).json({ you: 'shall not pass!' });
    } else {
      req.token = decoded;
      console.log('D ', decoded);
      next();
    }
  });
};
