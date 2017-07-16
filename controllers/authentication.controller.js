const jwt = require('jsonwebtoken');
const models = require('./../models/');
const userController = require('./user.controller');
require('dotenv').config({ silent: true });


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
    this.secret = process.env.SECRET;
  }

  /**
   * Method used to signup a user
   *
   * @param {Object} userObject user object to be created
   * @return {Object} newUser user object created during signup
   * @memberOf AuthenticationController
   */
  async signUp(userObject) {
    const newUser = await this.userController.create(userObject, true);
    const token = jwt.sign(newUser.dataValues, this.secret, {
      expiresIn: '3d',
      algorithm: 'HS512',
    });

    newUser.dataValues.token = token;
    return newUser.dataValues;
  }
}

module.exports = AuthenticationController;
