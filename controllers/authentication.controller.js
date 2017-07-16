const jwt = require('jsonwebtoken');
const models = require('./../models/');
const userController = require('./user.controller');
require('dotenv').config({ silent: true });
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);


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
    this.signIn = this.signIn.bind(this);
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

    newUser.dataValues.token = `Bearer ${token}`;
    return newUser.dataValues;
  }

  /**
   * Sign in method
   *
   * @param {Object} { email = null, password = null } user signin object
   * @returns {string} token jwt signed token
   *
   * @memberOf AuthenticationController
   */
  async signIn({ email = null, password = null }) {
    if (!email || !password) {
      const err = new Error('All fields must be present');
      err.status = 400;
      throw err;
    }
    const user = await this.models.Users.findOne({
      where: {
        email,
      }
    });

    if (!user) {
      const err = new Error('Authentication failed: User not found');
      err.status = 401;
      throw err;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      const err = new Error('Authentication failed: Wrong password');
      err.status = 401;
      throw err;
    }

    delete user.dataValues.password;

    const token = jwt.sign(user.dataValues, this.secret, {
      expiresIn: '3d',
      algorithm: 'HS512',
    });

    return token;
  }
}

module.exports = AuthenticationController;
