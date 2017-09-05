const authRouter = require('./authentication.router');
const userRouter = require('./user.routes');
const topicRouter = require('./topic.routes');
const postRouter = require('./post.routes');

module.exports = (router) => {
  authRouter(router);
  userRouter(router);
  topicRouter(router);
  postRouter(router);
};
