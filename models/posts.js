'use strict';

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define('Posts', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations for user
        this.belongsTo(models.Users, {
          foreignKey: 'userId'
        });

        // association for topic
        this.belongsTo(models.Topics, {
          foreignKey: 'topicId'
        });
      }
    }
  });
  return Posts;
};
