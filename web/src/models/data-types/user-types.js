const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const userTypes = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  planType: {
    type: DataTypes.ENUM('free', 'basic', 'pro', 'enterprise', 'unlimited'),
    defaultValue: 'free',
    allowNull: false,
    // allowNull defaults to true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  meta: {
    type: DataTypes.JSONB,
    defaultValue: null,
    allowNull: true,
    // allowNull defaults to true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
    // allowNull defaults to true
  },
  createdBy: {
    type: Sequelize.UUID,
    allowNull: true,
    // allowNull defaults to true
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};

module.exports = userTypes;
