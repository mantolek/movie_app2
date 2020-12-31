const db = require('../db/index');

/**
 * Save comment
 * POST
 * postID is equal to movieID
 */
exports.saveComment = async (req, res) => {
  let userID = req.user.id;
  let postID = req.body.postID
  let content = req.body.content;

  try {
    db.query(
      `INSERT INTO comments (userID, postID, content) VALUES ('${userID}', '${postID}', '${content}')`,
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
    db.query(
      `SELECT c.content, u.name FROM comments AS c 
       INNER JOIN users AS u ON c.userID = u.id
       WHERE c.postID = '${movieID}'
       `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
          return res.status(200).json({
            results: results
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
