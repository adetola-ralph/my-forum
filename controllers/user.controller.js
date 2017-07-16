// import models from './../models/';
const models = require('./../models/');

/**
 * UserController class
 *
 * @export
 * @class UserController
 */
class UserController {
  /**
   * Creates an instance of UserController.
   *
   * @memberOf UserController
   */
  constructor() {
    this.userModel = models.Users;
    this.get = this.get.bind(this);
  }

  async index() {
    const user = this.userModel.findAll();
    return JSON.strigify(user);
  }

  /**
   * Get a user with the userid
   *
   * @param {number} userId id for the user to retreive
   * @returns {Object} user user object from db
   *
   * @memberOf UserController
   */
  async get(userId) {
    const user = await this.userModel.findOne({
      where: {
        id: userId
      }
    });

    return user.dataValues;
  }

  async update(userObject){

  }

  /**
   * Create a new user
   *
   * @param {Object} userObject user object
   * @param {Boolean} auth specifies if the method is being called by signup or not
   * @return {null} doesn't return anything
   * @memberOf UserController
   */
  async create(userObject, auth = false) {
    const user = userObject;
    if (!UserController.checkDetails(user, auth)) {
      const err = new Error('All fields must be present');
      err.status = 400;
      throw err;
    }

    const existingUser = await this.userModel.findOne({
      where: {
        email: user.email,
      },
    });

    if (existingUser) {
      const err = new Error('User exists in the database');
      err.status = 409;
      throw err;
    }

    const newUser = await this.userModel.create(user);
    delete newUser.dataValues.password;
    return newUser;
  }

  /**
   * check if the user object contains all fields
   *
   * @param {Object} user user object to check
   * @param {Boolean} checkPassword specifies if the password should be checked
   * @return {Boolean} true if all is well
   * @memberOf UserController
   */
  static checkDetails(user, checkPassword = false) {
    const fields = ['name', 'email'];
    if (checkPassword) {
      fields.push('password');
    }

    const userKeys = Object.keys(user);
    return fields.every(i => userKeys.includes(i));
  }
}

module.exports = UserController;
