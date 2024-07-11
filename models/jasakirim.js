'use strict';
module.exports = (sequelize, DataTypes) => {
  const JasaKirim = sequelize.define(
    'JasaKirim',
    {
      id_jasakirim: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_jasakirim: DataTypes.STRING,
      jenis_pengiriman: DataTypes.STRING,
      biaya_ongkir: DataTypes.DECIMAL,
    },
    {}
  );

  JasaKirim.associate = function (models) {
    JasaKirim.hasMany(models.Pesanan, { foreignKey: 'id_jasakirim', as: 'pesanan' });
  };

  return JasaKirim;
};
