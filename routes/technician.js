var express = require('express');
var router = express.Router();
var authentication = require('../controllers/authenticationController');

router.post('/create-technician', authentication.createTechnician);
router.post('/user-login', authentication.userLogin);
router.post('/send-reset-password-email', authentication.sendResetPasswordEmail);
router.put('/password-update', authentication.passwordUpdate);
router.get('/logout', authentication.logout);

module.exports = router;
