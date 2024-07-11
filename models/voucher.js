'use strict';
module.exports = (sequelize, DataTypes) => {
  const Voucher = sequelize.define(
    'Voucher',
    {
      id_voucher: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_voucher: DataTypes.STRING,
      nilai_voucher: DataTypes.DECIMAL,
      status: DataTypes.BOOLEAN,
      minimal_pesanan: DataTypes.DECIMAL,
    },
    {}
  );

  Voucher.associate = function (models) {
    Voucher.hasMany(models.Pesanan, { foreignKey: 'id_voucher', as: 'pesanan' });
  };

  return Voucher;
};
