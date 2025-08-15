const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const adminController = require('../controllers_sequelize/adminController');
const { upload } = require('../config/cloudinary');

// Admin only routes
router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard and Analytics
router.get('/dashboard/stats', adminController.getDashboardStats);
router.get('/analytics', adminController.getAnalytics);

// Product management
router.get('/products', adminController.getAllProducts);
router.post('/products', upload.single('image'), adminController.createProduct);
router.put('/products/:id', upload.single('image'), adminController.updateProduct);
router.delete('/products/:id', adminController.deleteProduct);

// Image Upload
router.post('/upload/image', upload.single('image'), adminController.uploadProductImage);

// Order management
router.get('/orders', adminController.getAllOrders);
router.put('/orders/:id', adminController.updateOrderStatus);

// User management
router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);
router.put('/users/:id/status', adminController.updateUserStatus);

// Inventory management
router.get('/inventory/low-stock', adminController.getLowStockProducts);
router.put('/inventory/:id', adminController.updateStock);

module.exports = router;
