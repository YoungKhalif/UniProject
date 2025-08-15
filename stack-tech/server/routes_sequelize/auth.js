const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers_sequelize/authController');

// @route   POST api/auth/register
// @desc    Register a new user
router.post('/register', [
  body('firstName', 'First name is required').notEmpty(),
  body('lastName', 'Last name is required').notEmpty(),
  body('username', 'Username is required').notEmpty(),
  body('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 8 characters with uppercase, lowercase, number, and special character')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  authController.register(req, res);
});

// @route   POST api/auth/login
// @desc    Login user
router.post('/login', [
  body('emailOrUsername', 'Email or username is required').notEmpty(),
  body('password', 'Password is required').exists()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  authController.login(req, res);
});

// @route   GET api/auth/me
// @desc    Get logged in user
router.get('/me', require('../middleware/auth'), (req, res) => {
  authController.getMe(req, res);
});

// @route   GET api/auth/refresh
// @desc    Refresh user token
router.get('/refresh', require('../middleware/auth'), (req, res) => {
  authController.refreshToken(req, res);
});

// @route   POST api/auth/forgot-password
// @desc    Send password reset email
router.post('/forgot-password', [
  body('email', 'Please include a valid email').isEmail()
], (req, res) => {
  authController.forgotPassword(req, res);
});

// @route   POST api/auth/reset-password
// @desc    Reset password with token
router.post('/reset-password', [
  body('token', 'Token is required').notEmpty(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
], (req, res) => {
  authController.resetPassword(req, res);
});

// @route   GET api/auth/verify-email/:token
// @desc    Verify email address
router.get('/verify-email/:token', (req, res) => {
  authController.verifyEmail(req, res);
});

// @route   POST api/auth/resend-verification
// @desc    Resend email verification
router.post('/resend-verification', [
  body('email', 'Please include a valid email').isEmail()
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  authController.resendEmailVerification(req, res);
});

// @route   GET api/auth/verify-reset-token/:token
// @desc    Verify password reset token
router.get('/verify-reset-token/:token', (req, res) => {
  authController.verifyResetToken(req, res);
});

// @route   POST api/auth/reset-password/:token
// @desc    Reset password with token
router.post('/reset-password/:token', [
  body('password', 'Password must be at least 8 characters with uppercase, lowercase, number, and special character')
    .isLength({ min: 8 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  authController.resetPassword(req, res);
});

module.exports = router;
