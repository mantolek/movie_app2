const db = require('../db/index');

const auth = async (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return;

  // token = unhash token ?

  req.user = {
    id: '',
    token: ''
  }
console.log(token)
  await db.query(
    `SELECT id, email, name, lastname, role FROM users WHERE token = '${token}'`,
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
