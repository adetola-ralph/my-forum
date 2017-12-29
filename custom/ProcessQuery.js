/**
 * ProcessQuery
 *
 * @class ProcessQuery
 */
class ProcessQuery {
  /**
   * function to process query object
   *
   * @param {any} queryObject request query object
   * @returns {any} sequalize query object
   */
  static processQuery(queryObject) {
    const query = Object.assign({}, this.pagination(queryObject));
    return query;
  }

  /**
   * function to process and return proper pagination
   * query
   * @param {any} object query object
   * @returns {any} object containing query
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
}

module.exports = ProcessQuery;
