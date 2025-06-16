// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const requireAdmin = require('../middleware/adminMiddleware');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController');

// Product Management
router.route('/products')
  .get(requireAdmin, productController.getAllProducts)
  .post(requireAdmin, productController.createProduct);

router.route('/products/:id')
  .get(requireAdmin, productController.getProductById)
  .put(requireAdmin, productController.updateProduct)
  .delete(requireAdmin, productController.deleteProduct);

// Order Management
router.route('/orders')
  .get(requireAdmin, orderController.getAllOrders);

router.route('/orders/:id')
  .get(requireAdmin, orderController.getOrderById);

router.put('/orders/:id/status', requireAdmin, orderController.updateOrderStatus);

module.exports = router;