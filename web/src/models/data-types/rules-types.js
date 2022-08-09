const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

module.exports = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
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
  redemption_amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  redemption_point: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  expire_month: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fulfillment_delay: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 7,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
};
