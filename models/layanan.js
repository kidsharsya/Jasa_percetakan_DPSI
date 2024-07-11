'use strict';
module.exports = (sequelize, DataTypes) => {
  const Layanan = sequelize.define(
    'Layanan',
    {
      id_layanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_layanan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      poster_layanan: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isImageFile(value) {
            if (!/\.(jpg|jpeg|png)$/i.test(value)) {
              throw new Error('Poster layanan harus berupa file gambar (.jpg/.png)');
            }
          },
        },
      },
      deskripsi: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      harga: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {}
  );

  Layanan.associate = function (models) {
    Layanan.hasMany(models.Pesanan, { foreignKey: 'id_layanan', as: 'pesanan' });
  };

  return Layanan;
};
