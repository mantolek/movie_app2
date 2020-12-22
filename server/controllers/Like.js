const db = require('../db/index');

/**
 * Get likes
 * POST
 */
// exports.getLikes = async (req, res) => {
//   let variable = {};
//   // Check if movie or comment
//   if (req.body.movieID) {
//     variable = { movieID: req.body.movieID };
//   } else {
//     variable = { commentID: req.body.commentID };
//   }

//   try {
//     const likes = await Like.find(variable);
//     if (!likes)
//       return res
//         .status(400)
//         .json({ msg: 'Something went wrong with getting like' });

//     return res.status(200).json({ success: true, likes });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

/**
 * Get dislikes
 * POST
 */
// exports.getDislikes = async (req, res) => {
//   let variable = {};
//   // Check if movie or comment
//   if (req.body.movieID) {
//     variable = { movieID: req.body.movieID };
//   } else {
//     variable = { commentID: req.body.commentID };
//   }
//   try {
//     const dislikes = await Dislike.find(variable);
//     if (!dislikes)
//       return res
//         .status(400)
//         .json({ msg: 'Something went wrong with getting dislikes' });
//     return res.status(200).json({ success: true, dislikes });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

/**
 * Add like
 * POST
 */
exports.upLike = async (req, res) => {
  let variable = {};
  if (req.body.movieID) {
    variable = { movieID: req.body.movieID, userID: req.user._id };
  } else {
    variable = { commentID: req.body.commentID, userID: req.user._id };
  }

  try {
    const like = await new Like(variable);
    if (!like)
      return res.status(400).json({ msg: 'Something went wrong with like.' });

    const newLike = await like.save();
    if (!newLike)
      return res
        .status(400)
        .json({ msg: 'Something went wrong with saving new like.' });

    // If previously disliked. Undislike.
    const disLikeExist = await Dislike.find(variable);
    if (disLikeExist.length > 0) {
      const disLike = await Dislike.findOneAndDelete(variable);
      if (!disLike)
        return res
          .status(400)
          .json({
            success: false,
            msg: 'Something went wrong with undisliking.',
          });
    }   

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

/**
 * Delete like
 * POST
 */
// exports.unLike = async (req, res) => {
//   let variable = {};
//   if (req.body.movieID) {
//     variable = { movieID: req.body.movieID, userID: req.user._id };
//   } else {
//     variable = { commentID: req.body.commentID, userID: req.user._id };
//   }

//   try {
//     // If liked. Unlike
//     const like = await Like.findOneAndDelete(variable);
//     if (!like)
//       return res.status(400).json({
//         success: false,
//         msg: 'Something went wrong with unlikind.',
//       });

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

/**
 * Add dislike
 * POST
 */
// exports.upDisLike = async (req, res) => {
//   let variable = {};
//   if (req.body.movieID) {
//     variable = { movieID: req.body.movieID, userID: req.user._id };
//   } else {
//     variable = { commentID: req.body.commentID, userID: req.user._id };
//   }

//   try {
//     // If liked. Unlike
//     const likeExist = await Like.find(variable);
//     if (likeExist.length > 0) {
//       const like = await Like.findOneAndDelete(variable);
//       if (!like) return res.status(400).json({ success: false, msg: 'error' });
//     }

//     const disLike = await new Dislike(variable);
//     if (!disLike)
//       return res.json({
//         success: false,
//         msg: 'Something went wrong with disLike.',
//       });

//     const newDisLike = await disLike.save();
//     if (!newDisLike)
//       return res
//         .status(400)
//         .json({ msg: 'Something went wrong with saving disLike.' });

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };

/**
 * Delete dislike
 * POST
 */
// exports.unDisLike = async (req, res) => {
//   let variable = {};
//   if (req.body.movieID) {
//     variable = { movieID: req.body.movieID, userID: req.user._id };
//   } else {
//     variable = { commentID: req.body.commentID, userID: req.user._id };
//   }

//   try {
//     const disLike = await Dislike.findOneAndDelete(variable);
//     if (!disLike)
//       return res.status(400).json({
//         success: false,
//         msg: 'Something went wrong with saving new user.',
//       });

//     return res.status(200).json({ success: true });
//   } catch (err) {
//     return res.status(400).json({ msg: err.message });
//   }
// };
