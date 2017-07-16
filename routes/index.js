const authRouter = require('./authentication.router');

module.exports = (router) => {
  authRouter(router);
};
