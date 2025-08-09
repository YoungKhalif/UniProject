const express = require('express');
const router = express.Router();
const configController = require('../controllers_sequelize/configController');
const authMiddleware = require('../middleware/auth');

// Create a new configuration
router.post('/', authMiddleware, configController.createConfiguration);

// Get all configurations for a user
router.get('/user/:userId', authMiddleware, configController.getUserConfigurations);

// Get a specific configuration
router.get('/:id', authMiddleware, configController.getConfigurationById);

// Update a configuration
router.put('/:id', authMiddleware, configController.updateConfiguration);

// Delete a configuration
router.delete('/:id', authMiddleware, configController.deleteConfiguration);

module.exports = router;
