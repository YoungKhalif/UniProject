// controllers_sequelize/orderController.js
const { Order, OrderItem, Product, User } = require('../models_sequelize');
const emailService = require('../services/emailService');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { 
          model: OrderItem,
          include: [{ 
            model: Product, 
            attributes: ['name', 'price'] 
          }] 
        }
      ]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name', 'email'] },
        { 
          model: OrderItem,
          include: [{ 
            model: Product, 
            attributes: ['name', 'price', 'image'] 
          }] 
        }
      ]
    });
      
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const [updated] = await Order.update(
      { status },
      { where: { id: req.params.id } }
    );

    if (!updated) return res.status(404).json({ message: 'Order not found' });
    
    const updatedOrder = await Order.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email', 'firstName', 'username'] }]
    });

    // Send email notification based on status
    if (status === 'shipped') {
      const trackingInfo = {
        trackingNumber: 'ST' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        carrier: 'FedEx',
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      await emailService.sendShippingNotification(updatedOrder, updatedOrder.User, trackingInfo);
    }
    
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    // Create the order
    const order = await Order.create({
      userId,
      totalAmount,
      ...shippingAddress,
      paymentMethod,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    // Create order items
    const orderItems = await Promise.all(items.map(async (item) => {
      const product = await Product.findByPk(item.productId);
      return OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: product.price
      });
    }));

    // Get user details and order items with product info for email
    const user = await User.findByPk(userId);
    const orderWithItems = await Order.findByPk(order.id, {
      include: [{
        model: OrderItem,
        include: [{ model: Product, attributes: ['name', 'price'] }]
      }]
    });

    // Send order confirmation email
    await emailService.sendOrderConfirmation(order, user, orderWithItems.OrderItems);
    
    res.status(201).json({ 
      order, 
      orderItems,
      message: 'Order created successfully! Confirmation email sent.' 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const orders = await Order.findAll({
      where: { userId },
      include: [{ 
        model: OrderItem,
        include: [{ 
          model: Product, 
          attributes: ['name', 'price', 'image'] 
        }] 
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
