const express = require('express');
const {
  signupValidator,
  loginValidator,
} = require('../utils/validators/authvalidator');

const {
  signup,
  login,
  forgotPassword,
 verifyPassResetCode,
 resetPassword,
} = require('../services/authservice');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.get('/login', loginValidator, login);
router.post('/forgotPassword', forgotPassword);
 router.post('/verifyResetCode', verifyPassResetCode);
router.put('/resetPassword', resetPassword);

module.exports = router;
