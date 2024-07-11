'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Customers', 'nama_customer', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Customers', 'no_telpon', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('Customers', 'alamat', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.changeColumn('Customers', 'email', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Customers', 'nama_customer', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Customers', 'no_telpon', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('Customers', 'alamat', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.changeColumn('Customers', 'email', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
    });
  },
};
