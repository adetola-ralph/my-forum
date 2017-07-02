'use strict';

module.exports = (sequelize, DataTypes) => {
  const TopicTag = sequelize.define('TopicTag', {
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        this.belongsTo(models.Topics, {
          foreignKey: 'topicId'
        });

        this.belongsTo(models.Tag, {
          foreignKey: 'tagId'
        });
      }
    }
  });
  return TopicTag;
};
