const express = require('express');
const router = express.Router();
const productController = require('../controllers_sequelize/productController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/category/:category', productController.getProductsByCategory);
router.get('/search', productController.searchProducts);

// Admin routes
router.post('/', [authMiddleware, adminMiddleware], productController.createProduct);
router.put('/:id', [authMiddleware, adminMiddleware], productController.updateProduct);
router.delete('/:id', [authMiddleware, adminMiddleware], productController.deleteProduct);

module.exports = router;
