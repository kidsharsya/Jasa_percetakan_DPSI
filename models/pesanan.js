'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pesanan = sequelize.define(
    'Pesanan',
    {
      id_pesanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_customer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Customers',
          key: 'id_customer',
        },
      },
      id_layanan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Layanans',
          key: 'id_layanan',
        },
      },
      id_voucher: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Vouchers',
          key: 'id_voucher',
        },
      },
      id_pembayaran: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pembayarans',
          key: 'id_pembayaran',
        },
      },
      id_jasakirim: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'JasaKirims',
          key: 'id_jasakirim',
        },
      },
      harga_order: DataTypes.DECIMAL,
      metode_pembayaran: DataTypes.STRING,
    },
    {}
  );

  Pesanan.associate = function (models) {
    Pesanan.belongsTo(models.Customer, { foreignKey: 'id_customer', as: 'customer' });
    Pesanan.belongsTo(models.Layanan, { foreignKey: 'id_layanan', as: 'layanan' });
    Pesanan.belongsTo(models.Voucher, { foreignKey: 'id_voucher', as: 'voucher' });
    Pesanan.belongsTo(models.Pembayaran, { foreignKey: 'id_pembayaran', as: 'pembayaran' });
    Pesanan.belongsTo(models.JasaKirim, { foreignKey: 'id_jasakirim', as: 'jasakirim' });
    Pesanan.hasOne(models.DetailPesanan, { foreignKey: 'id_pesanan', as: 'detailPesanan' });
  };

  return Pesanan;
};
