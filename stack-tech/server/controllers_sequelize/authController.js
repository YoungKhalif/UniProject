// controllers_sequelize/authController.js
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { User } = require('../models_sequelize');
const { Op } = require('sequelize');
const emailService = require('../services/emailService');

exports.register = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email, 
    username, 
    password,
    phoneNumber 
  } = req.body;

  try {
    // Check if user exists by email
    let existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    // Check if username is taken
    let existingUserByUsername = await User.findOne({ where: { username } });
    if (existingUserByUsername) {
      return res.status(400).json({ msg: 'Username already taken' });
    }

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create new user
    const user = await User.create({ 
      name: `${firstName} ${lastName}`,
      firstName, 
      lastName,
      username,
      email, 
      password,
      phoneNumber: phoneNumber || null,
      emailVerificationToken,
      emailVerificationExpires,
      isEmailVerified: false
    });

    // Send welcome email with verification link
    await emailService.sendWelcomeEmail(user, emailVerificationToken);

    // Create JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token, 
          message: 'Registration successful! Please check your email to verify your account.' 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if login is with email or username
    const user = await User.findOne({
      where: {
        [emailOrUsername.includes('@') ? 'email' : 'username']: emailOrUsername
      }
    });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Generate a random token for password reset
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // We still return a success message even if the email doesn't exist
      // This prevents enumeration attacks
      return res.status(200).json({ msg: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate a random token
    const buffer = await randomBytes(20);
    const token = buffer.toString('hex');

    // Set token and expiration on the user
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    console.log(`Password reset token for ${email}: ${token}`);
    
    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(user, token);
      console.log(`Password reset email sent to ${email}`);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
      // Continue execution - don't fail the request if email fails
    }

    res.status(200).json({ 
      msg: 'If an account with that email exists, a password reset link has been sent.'
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ msg: 'Server error. Could not send reset email.' });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    console.log('Verifying reset token:', token);

    // Find user by reset token and check if token is still valid
    const user = await User.findOne({ 
      where: { 
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now() // Greater than current time
        }
      } 
    });

    if (!user) {
      console.log('No user found with token or token expired');
      console.log('Current time:', Date.now());
      
      // Let's also check if there's a user with this token but expired
      const expiredUser = await User.findOne({ 
        where: { resetPasswordToken: token } 
      });
      
      if (expiredUser) {
        console.log('Found user with expired token. Expiry was:', expiredUser.resetPasswordExpires);
      } else {
        console.log('No user found with this token at all');
      }
      
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    console.log('Token is valid for user:', user.email);
    // Return success if token is valid
    res.status(200).json({ msg: 'Token is valid' });
  } catch (err) {
    console.error('Verify reset token error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find user by reset token and check if token is still valid
    const user = await User.findOne({ 
      where: { 
        resetPasswordToken: token,
        resetPasswordExpires: {
          [Op.gt]: Date.now() // Greater than current time
        }
      } 
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired' });
    }

    // Update user password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Return success message
    res.status(200).json({ msg: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ msg: 'Server error. Could not reset password.' });
  }
};

// Email verification endpoint
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    console.log('Verifying email with token:', token);

    // Find user by verification token and check if token is still valid
    const user = await User.findOne({
      where: {
        emailVerificationToken: token,
        emailVerificationExpires: {
          [Op.gt]: Date.now() // Greater than current time
        }
      }
    });

    if (!user) {
      console.log('No user found with token or token expired');
      return res.status(400).json({ msg: 'Email verification token is invalid or has expired' });
    }

    console.log('Found user:', user.email, 'Current verification status:', user.isEmailVerified);

    // Update user to verified
    await user.update({
      isEmailVerified: true,
      emailVerificationToken: null,
      emailVerificationExpires: null
    });

    console.log('User verification updated successfully');

    // Send confirmation email
    try {
      await emailService.sendEmailVerificationSuccess(user);
    } catch (emailError) {
      console.log('Email confirmation failed but verification succeeded:', emailError.message);
    }

    res.status(200).json({ 
      msg: 'Email verified successfully!',
      success: true 
    });
  } catch (err) {
    console.error('Email verification error:', err);
    res.status(500).json({ msg: 'Server error. Could not verify email.' });
  }
};

// Resend email verification
exports.resendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ msg: 'Email is already verified' });
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await user.update({
      emailVerificationToken,
      emailVerificationExpires
    });

    // Send verification email
    await emailService.sendWelcomeEmail(user, emailVerificationToken);

    res.status(200).json({ msg: 'Verification email sent successfully!' });
  } catch (err) {
    console.error('Resend verification error:', err);
    res.status(500).json({ msg: 'Server error. Could not send verification email.' });
  }
};
