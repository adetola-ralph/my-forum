/**
 * Authorization middleware
 *
 * @class AuthorizationMiddleare
 */
class AuthorizationMiddleware {
  /**
   * Creates an instance of AuthMiddleare.
   *
   * @memberOf AuthMiddleare
   */
  constructor() {
    this.checkUser = this.checkUser.bind(this);
  }

  /**
   * checkUser method
   *
   * @param {object} ctx koa context obect
   * @param {function} next async function to continue execution flow
   * @return {null} null
   * @memberOf AuthorizationMiddleware
   */
  async checkUser(ctx, next) {
    if (parseInt(ctx.request.decoded.id, 10) !== parseInt(ctx.params.uid, 10)) {
      const err = new Error('You\'re not allowed to perform this action');
      err.status = 403;
      throw err;
    }
    await next();
  }
}

module.exports = AuthorizationMiddleware;
