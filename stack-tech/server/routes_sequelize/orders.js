const express = require('express');
const router = express.Router();
const orderController = require('../controllers_sequelize/orderController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.post('/', orderController.createOrder);

// User routes
router.get('/user/:userId', authMiddleware, orderController.getUserOrders);

// Admin routes
router.get('/', [authMiddleware, adminMiddleware], orderController.getAllOrders);
router.get('/:id', [authMiddleware, adminMiddleware], orderController.getOrderById);
router.put('/:id', [authMiddleware, adminMiddleware], orderController.updateOrderStatus);

module.exports = router;
