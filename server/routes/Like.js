const router = require('express').Router();
const like = require('../controllers/like');
const auth = require('../middleware/auth');

// router.post('/getLikes', auth, like.getLikes);
rou?ter.post('/getDislikes', auth, like.getDislikes);
router.post('/upLike', auth, like.upLike);
// router.post('/unLike', auth, like.unLike);
// router.post('/upDisLike', auth, like.upDisLike);
// router.post('/unDisLike', auth, like.unDisLike);

module.exports = router;

