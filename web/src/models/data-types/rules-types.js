const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

module.exports = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    references: {
      model: {
        tableName: 'users',
      },
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    allowNull: false,
  },
  redemptionAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  redemptionPoint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  expireMonth: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fulfillmentDelay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 7,
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
