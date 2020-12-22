const router = require('express').Router();
const comment = require('../controllers/comment');
const auth = require('../middleware/auth');

router.post('/saveComment', auth, comment.saveComment);
router.post('/getComments', auth, comment.getComments);

module.exports = router;