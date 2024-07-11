'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Layanans', {
      id_layanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_layanan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      poster_layanan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      harga: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Layanans');
  },
};
