'use strict';

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations for topic
        this.belongsToMany(models.Topic, {
          through: 'TopicTag',
          foreignKey: 'tagId',
        });
      }
    }
  });
  return Tag;
};
