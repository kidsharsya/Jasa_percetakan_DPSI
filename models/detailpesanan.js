'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailPesanan = sequelize.define(
    'DetailPesanan',
    {
      id_detailpesanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_pesanan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Pesanans',
          key: 'id_pesanan',
        },
      },
      file_cetak: DataTypes.STRING,
      alamat_pengiriman: DataTypes.TEXT,
      biaya_pengiriman: DataTypes.DECIMAL,
      jumlah_cetak: DataTypes.INTEGER,
      catatan: DataTypes.TEXT,
    },
    {}
  );

  DetailPesanan.associate = function (models) {
    DetailPesanan.belongsTo(models.Pesanan, { foreignKey: 'id_pesanan', as: 'pesanan' });
  };

  return DetailPesanan;
};
