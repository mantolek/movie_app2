const jwt = require('jsonwebtoken');
const db = require('../db/index');

/**
 * Auth
 * GET
 */
exports.auth = (req, res) => {
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role !== 0,
    loginSuccess: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
  });
};

/**
 * Register
 * POST
 */
exports.register = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  try {
    db.query(
      `INSERT INTO users (name, lastname, email, password) VALUES ('${name}', '${lastname}', '${email}', '${password}')`,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results) return res.status(200).json({ success: true });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Login
 * POST
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query(
      `SELECT id FROM users WHERE '${email}' = email AND '${password}' = password`,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results) {
          let id = results[0].id;
          let token = jwt.sign(id, 'secret')

          db.query(
            `UPDATE users SET token='${token}' WHERE email='${email}' AND password='${password}';`,
            function (error) {
              if (error) return res.status(400).json({ msg: 'Ups' });
            }
          );

          db.query(
            `SELECT name, id, token FROM users WHERE '${email}' = email AND '${password}' = password`,
            function (error, results) {
              if (error) return res.status(400).json({ msg: 'Ups' });
              if (results)
                return res.status(200).json({
                  loginSuccess: true,
                  token: results[0].token,
                  id: results[0]._id,
                });
            }
          );
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Logout
 * GET
 */
exports.logout = async (req, res) => {
  let id = req.user.id;

  try {
    db.query(
      `UPDATE users SET token='' WHERE id='${id}';`,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
          return res.status(200).json({
            loginSuccess: false,
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
