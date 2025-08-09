const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Configuration = sequelize.define('Configuration', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: 'My Custom Build'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  cpuId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  motherboardId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  ramId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  storageId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  gpuId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  psuId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  caseId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Configuration;
