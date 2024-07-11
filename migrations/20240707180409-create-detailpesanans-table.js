'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DetailPesanans', {
      id_detailpesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_pesanan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pesanans',
          key: 'id_pesanan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      file_cetak: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      alamat_pengiriman: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      biaya_pengiriman: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      jumlah_cetak: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      catatan: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('DetailPesanans');
  },
};
