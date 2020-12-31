const jwt = require('jsonwebtoken');
const db = require('../db/index');

const auth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return;

  const decode = jwt.verify(token, 'secret');

  req.user = {
    id: '',
    token: ''
  }

  await db.query(
    `SELECT id, email, name, lastname, role FROM users WHERE id = '${decode}'`,
    function (error, results) {
      if (error) return res.status(400).json({ msg: 'Ups' });
      if (results) {
        req.user = results[0];
        req.token = token;

        return next();
      }
    }
  );
};

module.exports = auth;
