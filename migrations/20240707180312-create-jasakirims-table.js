'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('JasaKirims', {
      id_jasakirim: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nama_jasakirim: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jenis_pengiriman: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      biaya_ongkir: {
        type: Sequelize.DECIMAL,
        allowNull: false,
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
    await queryInterface.dropTable('JasaKirims');
  },
};
