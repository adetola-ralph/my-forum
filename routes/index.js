const authRouter = require('./authentication.router');
const userRouter = require('./user.routes');

module.exports = (router) => {
  authRouter(router);
  userRouter(router);
};
