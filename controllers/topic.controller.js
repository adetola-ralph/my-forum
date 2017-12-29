const models = require('./../models/');
// const notFoundError = require('./../custom/not-found-error');

/**
 * TopicController class
 *
 * @class TopicController
 */
class TopicController {
  /**
   * creates an instance of TopicController.
   *
   * @memberOf TopicController
   */
  constructor() {
    this.topicModel = models.Topics;
    this.get = this.get.bind(this);
    this.index = this.index.bind(this);
    this.update = this.update.bind(this);
  }

  /**
   * get all topics
   *
   * @param {Object} queryObject object containing
   * query objects based on user requests
   * @returns {Array} topics array of topics
   *
   * @memberOf TopicController
   */
  async index(queryObject = {}) {
    const topics = await this.topicModel.findAll(queryObject);

    return topics;
  }

  /**
   * get a specific topic
   *
   * @param {any} topicId id of the topic to be retreived
   * @returns {Object} topic object from the db
   *
   * @memberOf TopicController
   */
  async get(topicId) {
    const topic = await this.topicModel.findById(parseInt(topicId, 10));

    if (topic === null) {
      const err = new Error('Topic doesn\'t exist');
      err.status = 404;
      throw err;
    }

    return topic;
  }

  /**
   * create new topic
   *
   * @param {Object} topic object{ topicName = null, userId = null } topic object to be created
   * @returns {Object} newTopic new topic object created
   *
   * @memberOf TopicController
   */
  async create({ topicName = null, userId = null }) {
    if (!topicName || !userId) {
      const err = new Error('All fields must be present');
      err.status = 400;
      throw err;
    }

    const newTopic = this.topicModel.create({
      topicName,
      userId,
    });

    return newTopic;
  }

  /**
   * update topic attributes
   *
   * @param {any} topicId
   * @param {any} topicObject
   * @param {any} userId
   * @returns {Object} topic
   *
   * @memberOf TopicController
   */
  async update(topicId, topicObject, userId) {
    const topic = await this.get(topicId);
    if (parseInt(userId, 10) !== parseInt(topic.userId, 10)) {
      const err = new Error('You\'re not allowed to perform this action');
      err.status = 403;
      throw err;
    }

    topic.update(topicObject);

    return topic;
  }

  /**
   * get posts associated to a topic
   *
   * @param {Number} topicId
   * @param {any} queryObject
   * @returns {Array} Posts
   *
   * @memberOf TopicController
   */
  async getPosts(topicId, queryObject = {}) {
    const topicWithPosts = await this.topicModel.findById(topicId, {
      include: [Object.assign({
        model: models.Posts,
      }, queryObject)],
    });

    if (!topicWithPosts) {
      const err = new Error('Topic doesn\'t exist');
      err.status = 404;
      throw err;
    }

    return topicWithPosts.dataValues.Posts;
  }

  /**
   * get tags associated to a topic
   *
   * @param {Number} topicId
   * @returns {Array} Tags
   *
   * @memberOf TopicController
   */
  async getTags(topicId) {
    const topicWithTags = await this.topicModel.findById(topicId, {
      include: [{
        model: models.Tags,
      }],
    });

    if (!topicWithTags) {
      const err = new Error('Topic doesn\'t exist');
      err.status = 404;
      throw err;
    }
    return topicWithTags.Tags;
  }
}

module.exports = TopicController;
