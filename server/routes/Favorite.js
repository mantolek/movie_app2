const router = require('express').Router();
const favorite = require('../controllers/favorite');
const auth = require('../middleware/auth');

router.post('/favorited', auth, favorite.favorited);
router.post('/addToFavorite', auth, favorite.addToFavorite);
router.post('/removeFromFavorite', auth, favorite.removeFromFavorite);
router.post('/getFavoredMovie', auth, favorite.getFavoredMovie);


module.exports = router;

