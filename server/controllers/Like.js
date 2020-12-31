const db = require('../db/index');

/**
 * Get likes
 * POST
 */
exports.getLikes = async (req, res) => {
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  try {
    db.query(
      `SELECT * FROM likes
       WHERE (movieID = '${movieID}') OR (commentID = '${commentID}')
       `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
        console.log(results , 'results')
          return res.status(200).json({
            results: results
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Get dislikes
 * POST
 */
exports.getDislikes = async (req, res) => {
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  try {
    db.query(
      `SELECT * FROM dislikes
       WHERE (movieID = '${movieID}') OR (commentID = '${commentID}')
       `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
        console.log(results , 'results')
          return res.status(200).json({
            results: results
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Add like
 * POST
 */
exports.upLike = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  // check if liked and dont like again ??

  try {
    db.query(
      `INSERT INTO likes (userID, commentID, movieID) VALUES ('${userID}', '${commentID}', '${movieID}')`,
      function (error) {
        if (error) return res.status(400).json({ msg: 'Ups' });

        db.query(
          `DELETE FROM dislikes WHERE (movieID='${movieID}' AND userID='${userID}') OR (commentID='${commentID}' AND userID='${userID}')`,
          function (error) {
            if (error) return res.status(400).json({ msg: 'Ups' });
            return res.status(200).json({ success: true });
          }
        );
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Delete like
 * POST
 */
exports.unLike = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  try {
    // If liked. Unlike
    db.query(
      `DELETE FROM likes WHERE (movieID='${movieID}' AND userID='${userID}') OR (commentID='${commentID}' AND userID='${userID}')`,
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
 * Add dislike
 * POST
 */
exports.upDisLike = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  // check if dizliked and dont dizlike again ??

  try {
    db.query(
      `INSERT INTO dislikes (userID, commentID, movieID) VALUES ('${userID}', '${commentID}', '${movieID}')`,
      function (error) {
        if (error) return res.status(400).json({ msg: 'Ups' });

        db.query(
          `DELETE FROM likes WHERE (movieID='${movieID}' AND userID='${userID}') OR (commentID='${commentID}' AND userID='${userID}')`,
          function (error) {
            if (error) return res.status(400).json({ msg: 'Ups' });
            return res.status(200).json({ success: true });
          }
        );
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Delete dislike
 * POST
 */
exports.unDisLike = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID | '';
  let commentID = req.body.commentID | '';

  try {
    // If disliked. Undislike
    db.query(
      `DELETE FROM likes WHERE (movieID='${movieID}' AND userID='${userID}') OR (commentID='${commentID}' AND userID='${userID}')`,
      function (error) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        return res.status(200).json({ success: true });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
