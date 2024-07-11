'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pembayaran = sequelize.define(
    'Pembayaran',
    {
      id_pembayaran: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      metode_pembayaran: DataTypes.STRING,
      biaya_layanan: DataTypes.DECIMAL,
    },
    {}
  );

  Pembayaran.associate = function (models) {
    Pembayaran.hasMany(models.Pesanan, { foreignKey: 'id_pembayaran', as: 'pesanan' });
  };

  return Pembayaran;
};
