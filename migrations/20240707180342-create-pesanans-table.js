'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pesanans', {
      id_pesanan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id_customer',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_layanan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Layanans',
          key: 'id_layanan',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_voucher: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Vouchers',
          key: 'id_voucher',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      id_pembayaran: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Pembayarans',
          key: 'id_pembayaran',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_jasakirim: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JasaKirims',
          key: 'id_jasakirim',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      harga_order: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      metode_pembayaran: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Pesanans');
  },
};
