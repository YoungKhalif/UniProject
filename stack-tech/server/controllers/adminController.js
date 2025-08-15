const { Product, Order, User, Configuration } = require('../models');
const { Op, Sequelize } = require('sequelize');
const { upload, cloudinary, useCloudinary } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Dashboard Statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalUsers = await User.count({ where: { role: 'user' } });
    const totalRevenue = await Order.sum('totalAmount', {
      where: { status: 'completed' }
    });

    const lowStockProducts = await Product.count({
      where: { stock: { [Op.lt]: 10 } }
    });

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue || 0,
      lowStockProducts
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
};

// Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { dateRange = '30days' } = req.query;
    let dateFilter;

    switch (dateRange) {
      case '24hours':
        dateFilter = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7days':
        dateFilter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30days':
        dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90days':
        dateFilter = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        dateFilter = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }

    // Sales analytics
    const salesData = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: dateFilter }
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('totalAmount')), 'revenue'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'orders']
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('createdAt')), 'ASC']]
    });

    // Top products
    const topProducts = await Product.findAll({
      limit: 5,
      order: [['stock', 'DESC']],
      attributes: ['id', 'name', 'stock', 'price']
    });

    res.json({
      salesData,
      topProducts
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};

// Product Management
exports.getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', category = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }
    if (category) {
      whereClause.category = category;
    }

    const products = await Product.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      products: products.rows,
      totalCount: products.count,
      totalPages: Math.ceil(products.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, specifications } = req.body;
    
    let imageUrl = null;
    if (req.file) {
      if (useCloudinary) {
        imageUrl = req.file.path;
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }
    }

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      specifications: specifications ? JSON.parse(specifications) : {},
      image: imageUrl
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Failed to create product', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, specifications } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let imageUrl = product.image;
    if (req.file) {
      // Delete old image if it exists and is not a Cloudinary URL
      if (product.image && !useCloudinary && !product.image.includes('cloudinary')) {
        const oldImagePath = path.join(__dirname, '../public', product.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      if (useCloudinary) {
        imageUrl = req.file.path;
      } else {
        imageUrl = `/uploads/${req.file.filename}`;
      }
    }

    await product.update({
      name,
      description,
      price: parseFloat(price),
      category,
      stock: parseInt(stock),
      specifications: specifications ? JSON.parse(specifications) : product.specifications,
      image: imageUrl
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Failed to update product', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete image if it exists and is not a Cloudinary URL
    if (product.image && !useCloudinary && !product.image.includes('cloudinary')) {
      const imagePath = path.join(__dirname, '../public', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
};

// Upload single image
exports.uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    let imageUrl;
    if (useCloudinary) {
      imageUrl = req.file.path;
    } else {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    res.json({ 
      message: 'Image uploaded successfully',
      imageUrl 
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

// Order Management
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (status) {
      whereClause.status = status;
    }

    const orders = await Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      orders: orders.rows,
      totalCount: orders.count,
      totalPages: Math.ceil(orders.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.update({ 
      status, 
      trackingNumber: trackingNumber || order.trackingNumber 
    });
    
    res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// User Management
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (role) {
      whereClause.role = role;
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      users: users.rows,
      totalCount: users.count,
      totalPages: Math.ceil(users.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ 
      name, 
      email, 
      role,
      isActive: isActive !== undefined ? isActive : user.isActive
    });
    
    res.json({ 
      id: user.id, 
      name: user.name, 
      email: user.email, 
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin user' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Failed to delete user', error: error.message });
  }
};

// Inventory Management
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update({ stock: parseInt(stock) });
    res.json(product);
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ message: 'Failed to update stock', error: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const { threshold = 10 } = req.query;
    
    const lowStockProducts = await Product.findAll({
      where: { stock: { [Op.lt]: parseInt(threshold) } },
      order: [['stock', 'ASC']]
    });

    res.json(lowStockProducts);
  } catch (error) {
    console.error('Low stock error:', error);
    res.status(500).json({ message: 'Failed to fetch low stock products', error: error.message });
  }
};
