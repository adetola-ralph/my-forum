const models = require('./../models/');

/**
 * TopicController class
 *
 * @class TopicController
 */
class TopicController {
  /**
   * Creates an instance of TopicController.
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
}

module.exports = TopicController;
