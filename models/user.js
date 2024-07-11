'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Assuming email should be unique for each user
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
      },
    },
    {}
  );

  User.beforeCreate(async (user, options) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.associate = function (models) {
    User.hasOne(models.Customer, {
      foreignKey: 'id_user',
      as: 'customer',
    });
  };

  return User;
};
