const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  category: {
    type: DataTypes.ENUM('CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Case', 'Cooling'),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image: {
    type: DataTypes.STRING
  },
  brand: {
    type: DataTypes.STRING
  },
  model: {
    type: DataTypes.STRING
  },
  socket: {
    type: DataTypes.STRING
  },
  formFactor: {
    type: DataTypes.STRING
  },
  memoryType: {
    type: DataTypes.STRING
  },
  capacity: {
    type: DataTypes.STRING
  },
  wattage: {
    type: DataTypes.INTEGER
  },
  compatibility: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Product;
