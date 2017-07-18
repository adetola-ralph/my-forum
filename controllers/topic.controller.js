const models = require('./../models/');

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
  }

  /**
   * get all topics
   *
   * @returns {Array} topics array of topics
   *
   * @memberOf TopicController
   */
  async get() {
    const topics = await this.topicModel.findAll();

    return topics;
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
}

module.exports = TopicController;
