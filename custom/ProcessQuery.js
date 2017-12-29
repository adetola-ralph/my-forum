const models = require('./../models');

const modelObject = {
  users: models.Users,
  posts: models.Posts,
  tags: models.Tags,
  votes: models.Votes,
  topicTags: models.TopicTag,
  topics: models.Topics,
};

/**
 * ProcessQuery
 *
 * @class ProcessQuery
 */
class ProcessQuery {
  /**
   * method to process query object
   *
   * @param {any} queryObject request query object
   * @returns {any} sequalize query object
   *
   * @memberOf ProcessQuery
   */
  static processQuery(queryObject) {
    const query = Object.assign({}, this.pagination(queryObject), this.include(queryObject));
    return query;
  }

  /**
   * method to process and return proper pagination
   * query
   * @param {any} object query object
   * @returns {any} object containing query
   *
   * @memberOf ProcessQuery
   */
  static pagination(object) {
    const pageNumber = object.page;
    const rowCount = object.limit || 10;

    if (pageNumber) {
      return {
        limit: rowCount,
        offset: (pageNumber - 1) * rowCount,
      };
    }

    return {};
  }

  /**
   * method to process include query
   *
   * @static
   * @param {any} object
   * @returns {any} object containing include query
   *
   * @memberOf ProcessQuery
   */
  static include(object) {
    const include = object.include;

    if (include) {
      const includeObject = include.split(',')
        .filter(model => Object.keys(modelObject).includes(model))
        .map(model => ({ model: modelObject[model] }));

      return {
        include: includeObject
      };
    }

    return {};
  }
}

module.exports = ProcessQuery;
