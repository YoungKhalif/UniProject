const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const productController = require('../controllers_sequelize/productController');
const orderController = require('../controllers_sequelize/orderController');

// Admin only routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Product management
router.post('/products', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

// Order management
router.get('/orders', orderController.getAllOrders);
router.put('/orders/:id', orderController.updateOrderStatus);

module.exports = router;
