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
  const { name, lastname, email, password, token } = req.body;

  try {
    db.query(
      `INSERT INTO users (name, lastname, email, password, token) VALUES ('${name}', '${lastname}', '${email}', '${password}', '${token}')`,
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
    // hash

    // token
    await db.query(
      `UPDATE users SET token='1234' WHERE email='${email}' AND password='${password}';`,
      function (error) {
        if (error) return res.status(400).json({ msg: 'Ups' });
      }
    );

    await db.query(
      `SELECT u.name, u.id, u.token FROM users AS u WHERE '${email}' = u.email AND '${password}' = u.password`,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
          return res.status(200).json({
            loginSuccess: true,
            token: results.token,
            id: results._id,
          });
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
