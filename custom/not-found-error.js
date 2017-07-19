/**
 * NotFoundError
 *
 * @class NotFoundError
 * @extends {Error}
 */
class NotFoundError extends Error {
  /**
   * Creates an instance of NotFoundError.
   * @param {String} errorMessage
   *
   * @memberOf NotFoundError
   */
  constructor(errorMessage) {
    super(errorMessage);
    this.message = errorMessage;
    this.status = 400;
  }
}

export default NotFoundError;
