const topicController = require('./../controllers/topic.controller');
const authMiddleware = require('./../middleware/authentication.mdw');
const authzMiddleware = require('./../middleware/authorization.mdw');

const t = new topicController();
const am = new authMiddleware();
const azm = new authzMiddleware();

module.exports = (router) => {
  router.get('/topics', async (ctx) => {
    const topics = await t.get();
    ctx.body = {
      success: true,
      message: 'Topics retrieved',
      data: topics,
    };
  });
};
