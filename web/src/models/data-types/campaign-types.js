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
  tireId: {
    type: Sequelize.UUID,
    references: {
      model: {
        tableName: 'tires',
      },
      key: 'id',
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endAt: {
    type: DataTypes.DATE,
    allowNull: false,
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
