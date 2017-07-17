'use strict';

module.exports = (sequelize, DataTypes) => {
  const Votes = sequelize.define('Votes', {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Votes.associate = function (models) {
    // associations for users
    this.belongsTo(models.Users, {
      foreignKey: 'userId'
    });

    // associations for posts
    this.belongsTo(models.Posts, {
      foreignKey: 'postId'
    });
  };

  return Votes;
};
