const express = require('express');
const router = express.Router();
const { TryCatch } = require('../utils.js');
const { isLoggedIn } = require('../middleware');
const auth = require('../controllers/auth');


router.post('/account-activation', TryCatch(auth.accountActivation));

router.post('/login', TryCatch(auth.login));

router.get('/logout', isLoggedIn, TryCatch(auth.logout));

router.get('/userprofile', isLoggedIn, auth.userprofile);


module.exports = router;