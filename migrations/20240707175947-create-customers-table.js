'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Customers', {
      id_customer: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      nama_customer: {
        type: Sequelize.STRING,
      },
      no_telpon: {
        type: Sequelize.STRING,
      },
      alamat: {
        type: Sequelize.TEXT,
      },
      email: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Customers');
  },
};
