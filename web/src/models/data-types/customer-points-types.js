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
  orderId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  orderLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fulfillmentStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pointStatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: true,
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
