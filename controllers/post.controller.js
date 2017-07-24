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
    this.update = this.update.bind(this);
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

  /**
   * update post data
   *
   * @param {String} postId post id
   * @param {Object} postObject object to update
   * @param {Number} userId creator id
   * @returns {Object} updated post object
   *
   * @memberOf PostController
   */
  async update(postId, postObject, userId) {
    const post = await this.postModel.findById(postId);
    if (!post) {
      const err = new Error('Post doesn\'t exist');
      err.status = 404;
      throw err;
    }

    if (postObject.userId || postObject.topicId || postObject.id) {
      const err = new Error('You can\'t update the post user, topic or id');
      err.status = 400;
      throw err;
    }

    if (parseInt(userId, 10) !== parseInt(post.userId, 10)) {
      const err = new Error('You\'re not allowed to perform this action');
      err.status = 403;
      throw err;
    }

    post.update(postObject);

    return post;
  }
}

module.exports = PostController;
