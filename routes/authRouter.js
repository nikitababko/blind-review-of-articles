const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/register', authCtrl.register);

router.post('/login', authCtrl.login);

router.post('/logout', authCtrl.logout);

router.post('/refresh_token', authCtrl.generateAccessToken);

router.post('/reviewers', authCtrl.reviewers);

router.post('/authors', authCtrl.authors);

router.post('/articles', authCtrl.articles);

module.exports = router;
