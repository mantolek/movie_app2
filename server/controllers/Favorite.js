const db = require('../db/index');

/**
 * Check if movie is user favorited
 * POST
 */
exports.favorited = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID;
  try {
    await db.query(
      `SELECT f.movieTitle FROM 
        favorites AS f 
        INNER JOIN 
        users AS u ON f.userID = '${userID}'
        WHERE f.movieID = '${movieID}'
           `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });

        if (results[0] !== undefined) {
          return res.status(200).json({ success: true });
        } else {
          return res.status(200).json({ success: false });
        }
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Add a favorite movie
 * POST
 */
exports.addToFavorite = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID;
  let movieTitle = req.body.movieTitle;
  let moviePoster = req.body.moviePoster;
  let movieRunTime = req.body.movieRunTime;

  try {
    await db.query(
      `INSERT INTO favorites (userID, movieID, movieTitle, moviePoster, movieRunTime) VALUES ('${userID}', '${movieID}', '${movieTitle}', '${moviePoster}', '${movieRunTime}')`,
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
 * Remove a favorite movie
 * POST
 */
exports.removeFromFavorite = async (req, res) => {
  let userID = req.user.id;
  let movieID = req.body.movieID;
  try {
    await db.query(
      `DELETE FROM favorites WHERE movieID='${movieID}' AND userID='${userID}'`,
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
 * Get favorite movies
 * POST
 */
exports.getFavoredMovie = async (req, res) => {
  let userID = req.user.id;
  try {
    await db.query(
      `SELECT f.movieTitle FROM 
      favorites AS f 
      INNER JOIN 
      users AS u ON f.userID = '${userID}'
         `,
      function (error, results) {
        if (error) return res.status(400).json({ msg: 'Ups' });
        if (results)
          return res.status(200).json({
            results: results,
          });
      }
    );
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};
