'use strict';

const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(val) {
        this.setDataValue('email', val.toLowerCase());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        const hash = bcrypt.hashSync(val, salt);
        this.setDataValue('password', hash);
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
  });

  Users.associate = function (models) {
    // associations for Topics
    this.hasMany(models.Topics, {
      foreignKey: 'userId'
    });

    // associations for posts
    this.hasMany(models.Posts, {
      foreignKey: 'userId'
    });
  };

  return Users;
};
