'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { DataTypes } = Sequelize;
    await queryInterface.createTable(
      'settings',
      {
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
        key: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        notes: {
          type: DataTypes.STRING,
          allowNull: true,
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
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['user_id', 'key'],
          },
        ],
      },
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     */
    await queryInterface.dropTable('settings');
  },
};
