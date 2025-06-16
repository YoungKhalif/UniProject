const express = require('express');
const router = express.Router();
const Configuration = require('../models/Configuration');
const authMiddleware = require('../middleware/auth');

// @route   POST api/configs
// @desc    Save a configuration
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, components, totalPrice } = req.body;
    
    const config = new Configuration({
      user: req.user.id,
      name,
      components,
      totalPrice
    });
    
    const savedConfig = await config.save();
    
    // Add to user's saved configurations
    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedConfigurations: savedConfig._id }
    });
    
    res.json(savedConfig);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/configs
// @desc    Get user's saved configurations
router.get('/', authMiddleware, async (req, res) => {
  try {
    const configs = await Configuration.find({ user: req.user.id })
      .populate('components.cpu')
      .populate('components.motherboard')
      .populate('components.ram')
      .populate('components.storage')
      .populate('components.gpu')
      .populate('components.psu')
      .populate('components.case');
    
    res.json(configs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;