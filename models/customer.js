'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
      },
      nama_customer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      no_telpon: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Assuming email should be unique for each customer
        },
      },
    },
    {}
  );

  Customer.associate = function (models) {
    Customer.belongsTo(models.User, {
      foreignKey: 'id_user',
      as: 'user',
    });
    Customer.hasMany(models.Pesanan, {
      foreignKey: 'id_customer',
      as: 'pesanan',
    });
  };

  return Customer;
};
