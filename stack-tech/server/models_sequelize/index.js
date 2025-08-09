const sequelize = require('../database/connection');
const User = require('./User');
const Product = require('./Product');
const Configuration = require('./Configuration');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Define associations
User.hasMany(Configuration, { foreignKey: 'userId' });
Configuration.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Configuration associations
Configuration.belongsTo(Product, { as: 'cpu', foreignKey: 'cpuId' });
Configuration.belongsTo(Product, { as: 'motherboard', foreignKey: 'motherboardId' });
Configuration.belongsTo(Product, { as: 'ram', foreignKey: 'ramId' });
Configuration.belongsTo(Product, { as: 'storage', foreignKey: 'storageId' });
Configuration.belongsTo(Product, { as: 'gpu', foreignKey: 'gpuId' });
Configuration.belongsTo(Product, { as: 'psu', foreignKey: 'psuId' });
Configuration.belongsTo(Product, { as: 'case', foreignKey: 'caseId' });

module.exports = {
  sequelize,
  User,
  Product,
  Configuration,
  Order,
  OrderItem
};
