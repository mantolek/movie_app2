const db = require('../db/index');

/**
 * Save comment
 * POST
 */
exports.saveComment = async (req, res) => {
  let userID = req.user.id;
  let content = req.body.content;

  try {
    await db.query(
      `INSERT INTO comments (userID, content) VALUES ('${userID}', '${content}')`,
      function (error) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        return res.status(200).json({ success: true });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Get comments
 * POST
 */
exports.getComments = async (req, res) => {
  const { movieID } = req.body;

  try {
    await db.query(
      `SELECT c.content, u.name FROM comments AS c 
       INNER JOIN users AS u ON c.userID = u.id
       WHERE c.commentID = '${movieID}'
       `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
          return res.status(200).json({
            results: results[0],
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
