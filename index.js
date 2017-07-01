const winston = require('winston');
const db = require('./models');

db.sequelize
  .authenticate()
  .then(() => {
    winston.info('Connection established');
  })
  .catch((error) => {
    winston.error(`Error: ${error}`);
  });

const addition = () => 1 + 2;

module.exports = addition;
