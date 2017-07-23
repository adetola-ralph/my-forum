const models = require('./../models/');

/**
 * Post controller
 *
 * @class PostController
 */
class PostController {
  /**
   * Creates an instance of PostController.
   *
   * @memberOf PostController
   */
  constructor() {
    this.postModel = models.Posts;
    this.topicModel = models.Topics;
    this.create = this.create.bind(this);
  }

  /**
   * create new post
   *
   * @param {Object} Post object { content = null, topicId = null, userId = null } 
   * @return {null} null
   * @memberOf PostController
   */
  async create({ content = null, topicId = null, userId = null }) {
    if (!content || content.length <= 0 || !topicId || !userId) {
      const err = new Error('All fields must be present');
      err.status = 400;
      throw err;
    }

    // check if topic exists
    const topicObject = await this.topicModel.findById(topicId);

    if (!topicObject) {
      const err = new Error('Topic doesn\'t exist');
      err.status = 404;
      throw err;
    }

    const createdPost = await this.postModel.create({
      content,
      topicId,
      userId,
    });

    return createdPost;
  }
}

module.exports = PostController;
