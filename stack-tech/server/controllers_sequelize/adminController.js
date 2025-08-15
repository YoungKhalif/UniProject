const { Product, Order, User, OrderItem, sequelize } = require('../models_sequelize');
const { Op } = require('sequelize');
const { upload, cloudinary, useCloudinary } = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

// Dashboard Analytics
exports.getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalUsers = await User.count();
    
    // Get revenue data
    const revenueResult = await Order.findOne({
      where: { paymentStatus: 'completed' },
      attributes: [[sequelize.fn('SUM', sequelize.col('totalAmount')), 'totalRevenue']]
    });
    
    const totalRevenue = parseFloat(revenueResult?.dataValues?.totalRevenue || 0);
    
    // Get pending orders
    const pendingOrders = await Order.count({
      where: { status: 'pending' }
    });
    
    // Get low stock items
    const lowStockItems = await Product.count({
      where: { stock: { [Op.lte]: 10 } }
    });
    
    // Get recent orders
    const recentOrders = await Order.findAll({
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [
        { 
          model: User, 
          attributes: ['firstName', 'lastName', 'email'] 
        },
        { 
          model: OrderItem,
          include: [{ model: Product, attributes: ['name'] }]
        }
      ]
    });
    
    // Get sales data for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const dailySales = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: thirtyDaysAgo },
        paymentStatus: 'completed'
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'revenue'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'orderCount']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
    });
    
    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalRevenue,
        pendingOrders,
        lowStockItems,
        recentOrders,
        dailySales
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Analytics Data
exports.getAnalytics = async (req, res) => {
  try {
    const { dateRange = '30days' } = req.query;
    
    let dateFilter = new Date();
    switch (dateRange) {
      case '7days':
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case '30days':
        dateFilter.setDate(dateFilter.getDate() - 30);
        break;
      case '90days':
        dateFilter.setDate(dateFilter.getDate() - 90);
        break;
      case '1year':
        dateFilter.setFullYear(dateFilter.getFullYear() - 1);
        break;
      default:
        dateFilter.setDate(dateFilter.getDate() - 30);
    }
    
    // Revenue analytics
    const revenueData = await Order.findAll({
      where: {
        createdAt: { [Op.gte]: dateFilter },
        paymentStatus: 'completed'
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'],
        [sequelize.fn('SUM', sequelize.col('totalAmount')), 'amount']
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))],
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']]
    });
    
    // Order statistics
    const orderStats = await Order.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'pending' THEN 1 END")), 'pending'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'delivered' THEN 1 END")), 'completed'],
        [sequelize.fn('COUNT', sequelize.literal("CASE WHEN status = 'cancelled' THEN 1 END")), 'cancelled']
      ]
    });
    
    // Top selling products
    const topProducts = await OrderItem.findAll({
      attributes: [
        'productId',
        [sequelize.fn('SUM', sequelize.col('quantity')), 'totalSold'],
        [sequelize.fn('SUM', sequelize.literal('"OrderItem"."quantity" * "OrderItem"."price"')), 'revenue']
      ],
      include: [{ 
        model: Product, 
        attributes: ['name', 'category'] 
      }],
      group: ['productId', 'Product.id'],
      order: [[sequelize.fn('SUM', sequelize.col('quantity')), 'DESC']],
      limit: 10
    });
    
    // Category analysis
    const categoryStats = await Product.findAll({
      attributes: [
        'category',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('AVG', sequelize.col('price')), 'avgPrice']
      ],
      group: ['category']
    });
    
    // Customer analytics
    const customerStats = await User.findOne({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'total'],
        [sequelize.fn('COUNT', sequelize.literal(`CASE WHEN "User"."createdAt" >= '${dateFilter.toISOString()}' THEN 1 END`)), 'new']
      ]
    });
    
    // Format the data to match the expected structure in the client
    const formattedData = {
      success: true,
      data: {
        revenue: {
          daily: revenueData,
          total: revenueData.reduce((sum, day) => sum + parseFloat(day.dataValues.amount || 0), 0),
          growth: 15.8 // Calculate actual growth rate
        },
        orders: orderStats.dataValues,
        products: {
          topSelling: topProducts,
          categories: categoryStats
        },
        customers: {
          ...customerStats.dataValues,
          returning: customerStats.dataValues.total - customerStats.dataValues.new
        }
      },
      // Add these fields at top level for backward compatibility with client
      salesData: revenueData,
      topProducts: topProducts,
      orderStats: orderStats.dataValues,
      categoryDistribution: categoryStats,
      userStats: customerStats.dataValues
    };
    
    res.json(formattedData);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Product Management
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { brand: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (category && category !== 'all') {
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
      data: {
        products: products.rows,
        total: products.count,
        page: parseInt(page),
        totalPages: Math.ceil(products.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Server error' });
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

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, stock, specifications } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
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
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Delete image if it exists and is not a Cloudinary URL
    if (product.image && !useCloudinary && !product.image.includes('cloudinary')) {
      const imagePath = path.join(__dirname, '../public', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await product.destroy();
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Upload single image
exports.uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    let imageUrl;
    if (useCloudinary) {
      imageUrl = req.file.path;
    } else {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    res.json({ 
      success: true,
      data: {
        message: 'Image uploaded successfully',
        imageUrl 
      }
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload image', error: error.message });
  }
};

// Order Management
exports.getAllOrders = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (status && status !== 'all') {
      whereClause.status = status;
    }
    
    const orders = await Order.findAndCountAll({
      where: whereClause,
      include: [
        { 
          model: User, 
          attributes: ['firstName', 'lastName', 'email'],
          where: search ? {
            [Op.or]: [
              { firstName: { [Op.iLike]: `%${search}%` } },
              { lastName: { [Op.iLike]: `%${search}%` } },
              { email: { [Op.iLike]: `%${search}%` } }
            ]
          } : undefined
        },
        { 
          model: OrderItem,
          include: [{ model: Product, attributes: ['name', 'category'] }]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      success: true,
      data: {
        orders: orders.rows,
        total: orders.count,
        page: parseInt(page),
        totalPages: Math.ceil(orders.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, trackingNumber } = req.body;
    
    const updateData = { status };
    if (trackingNumber) {
      updateData.trackingNumber = trackingNumber;
    }
    
    const [updatedRowsCount] = await Order.update(updateData, {
      where: { id }
    });
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    
    const updatedOrder = await Order.findByPk(id, {
      include: [
        { model: User, attributes: ['firstName', 'lastName', 'email'] },
        { model: OrderItem, include: [{ model: Product }] }
      ]
    });
    
    // TODO: Send email notification to customer about status change
    
    res.json({ success: true, data: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// User Management
exports.getAllUsers = async (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (search) {
      whereClause[Op.or] = [
        { firstName: { [Op.iLike]: `%${search}%` } },
        { lastName: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    if (role && role !== 'all') {
      whereClause.role = role;
    }
    
    if (status && status !== 'all') {
      whereClause.isActive = status === 'active';
    }
    
    const users = await User.findAndCountAll({
      where: whereClause,
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Order,
          attributes: ['id', 'totalAmount', 'status'],
          required: false
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    // Calculate user statistics
    const usersWithStats = users.rows.map(user => {
      const userOrders = user.Orders || [];
      return {
        ...user.toJSON(),
        totalOrders: userOrders.length,
        totalSpent: userOrders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0),
        lastOrderDate: userOrders.length > 0 ? userOrders[0].createdAt : null
      };
    });
    
    res.json({
      success: true,
      data: {
        users: usersWithStats,
        total: users.count,
        page: parseInt(page),
        totalPages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    const [updatedRowsCount] = await User.update({ role }, {
      where: { id }
    });
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    
    const [updatedRowsCount] = await User.update({ isActive }, {
      where: { id }
    });
    
    if (updatedRowsCount === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Inventory Management
exports.getInventory = async (req, res) => {
  try {
    const { category, lowStock } = req.query;
    
    const whereClause = {};
    
    if (category && category !== 'all') {
      whereClause.category = category;
    }
    
    if (lowStock === 'true') {
      whereClause.stock = { [Op.lte]: 10 };
    }
    
    const inventory = await Product.findAll({
      where: whereClause,
      attributes: [
        'id', 'name', 'category', 'stock', 'price', 'brand', 'createdAt', 'updatedAt'
      ],
      order: [['stock', 'ASC'], ['name', 'ASC']]
    });
    
    // Calculate inventory statistics
    const totalValue = inventory.reduce((sum, item) => sum + (item.stock * parseFloat(item.price)), 0);
    const lowStockCount = inventory.filter(item => item.stock <= 10).length;
    
    res.json({
      success: true,
      data: {
        inventory,
        stats: {
          totalItems: inventory.length,
          totalValue: totalValue,
          lowStockItems: lowStockCount
        }
      }
    });
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.update({ stock: parseInt(stock) });
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Update stock error:', error);
    res.status(500).json({ success: false, message: 'Failed to update stock', error: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const { threshold = 10 } = req.query;
    
    const lowStockProducts = await Product.findAll({
      where: { stock: { [Op.lt]: parseInt(threshold) } },
      order: [['stock', 'ASC']]
    });

    res.json({ success: true, data: lowStockProducts });
  } catch (error) {
    console.error('Low stock error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch low stock products', error: error.message });
  }
};
