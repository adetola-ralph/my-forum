'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('Tags', {
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Tags.associate = function (models) {
    // associations for topic
    this.belongsToMany(models.Topics, {
      through: 'TopicTag',
      foreignKey: 'tagId',
    });
  };

  return Tags;
};
