const authRouter = require('./authentication.router');
const userRouter = require('./user.routes');
const topicRouter = require('./topic.routes');

module.exports = (router) => {
  authRouter(router);
  userRouter(router);
  topicRouter(router);
};
