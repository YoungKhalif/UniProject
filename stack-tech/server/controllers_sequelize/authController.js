// controllers_sequelize/authController.js
const jwt = require('jsonwebtoken');
const { User } = require('../models_sequelize');
const { Op } = require('sequelize');

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

    // Create new user
    const user = await User.create({ 
      name: `${firstName} ${lastName}`,
      firstName, 
      lastName,
      username,
      email, 
      password,
      phoneNumber: phoneNumber || null 
    });

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
const crypto = require('crypto');
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

    // In a production environment, you would send an actual email here.
    // For this demo, we'll just return the token in the response
    console.log(`Password reset token for ${email}: ${token}`);
    
    // TODO: Implement email sending functionality
    // const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Password Reset Request',
    //   message: `You requested a password reset. Please click on the link to reset your password: ${resetUrl}`
    // });

    res.status(200).json({ 
      msg: 'If an account with that email exists, a password reset link has been sent.',
      token // Only for testing - remove in production!
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ msg: 'Server error. Could not send reset email.' });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

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
