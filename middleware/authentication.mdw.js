const jwt = require('jsonwebtoken');

/**
 * Authentication middleware
 * 
 * @class AuthMiddleare
 */
class AuthMiddleware {
  /**
   * Creates an instance of AuthMiddleare.
   *
   * @memberOf AuthMiddleare
   */
  constructor() {
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.secret = process.env.SECRET;
  }

  /**
   * checkAuthentication method
   *
   * @param {object} ctx koa context obect
   * @param {function} next async function to continue execution flow
   *
   * @memberOf AuthMiddleware
   */
  async checkAuthentication(ctx, next) {
    const authHeader = ctx.header.authorization;

    if (!authHeader) {
      const err = new Error('Token not provided');
      err.status = 401;
      throw err;
    }

    const token = authHeader.split(' ')[1];
    let decoded;

    try {
      decoded = await jwt.verify(token, this.secret, {
        algorithm: 'HS512',
      });
    } catch (e) {
      const err = new Error('Invalid Token');
      err.status = 401;
      throw err;
    }

    ctx.request.decoded = decoded;
    await next();
  }
}

module.exports = AuthMiddleware;
