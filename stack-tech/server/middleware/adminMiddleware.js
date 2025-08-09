const { User } = require('../models_sequelize');

module.exports = async function(req, res, next) {
  try {
    // Get user from auth middleware
    const userId = req.user.id;
    
    // Find user in database
    const user = await User.findByPk(userId);
    
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
    }
    
    next();
  } catch (err) {
    console.error('Admin middleware error:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
