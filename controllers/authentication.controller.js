const models = require('./../models/');
const userController = require('./user.controller');

/**
 * Controller to handle signin and signup
 *
 * @class AuthenticationController
 */
class AuthenticationController {
  /**
   * Creates an instance of AuthenticationController.
   *
   * @memberOf AuthenticationController
   */
  constructor() {
    this.models = models;
    this.userController = new userController();
    this.signUp = this.signUp.bind(this);
  }

  /**
   * Method used to signup a user
   *
   * @param {Object} ctx koa context object
   * @return {null} nothing
   * @memberOf AuthenticationController
   */
  async signUp(userObject) {
    const newUser = await this.userController.create(userObject, true);
    return newUser;
    // ctx.status = 200;
    // ctx.body = {
    //   data: newUser,
    //   success: true,
    //   message: 'Signup successful',
    // };
  }
}

module.exports = AuthenticationController;
