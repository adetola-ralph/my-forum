const topicController = require('./../controllers/topic.controller');
const authMiddleware = require('./../middleware/authentication.mdw');
// const authzMiddleware = require('./../middleware/authorization.mdw');
const ProcessQuery = require('./../custom/ProcessQuery');

const t = new topicController();
const am = new authMiddleware();
// const azm = new authzMiddleware();
// const processQuery = new ProcessQuery();

module.exports = (router) => {
  router.get('/topics', async (ctx) => {
    const query = ctx.query;
    const queryObject = ProcessQuery.processQuery(query);
    const topics = await t.index(queryObject);
    ctx.body = {
      success: true,
      message: 'Topics retrieved',
      data: topics,
    };
  });

  router.get('/topics/:tid', async (ctx) => {
    const topicId = ctx.params.tid;
    const topics = await t.get(topicId);
    ctx.body = {
      success: true,
      message: 'Topics retrieved',
      data: topics,
    };
  });

  router.post('/topics', am.checkAuthentication, async (ctx) => {
    // TODO: user id on the topic should be same as the user sending the request
    const topic = ctx.request.body;
    const createdTopic = await t.create(topic);
    ctx.body = {
      success: true,
      message: 'Topic created',
      data: createdTopic,
    };
  });

  router.put('/topics/:tid', am.checkAuthentication, async (ctx) => {
    const userId = ctx.request.decoded.id;
    const topicObject = ctx.request.body;
    const topicId = ctx.params.tid;

    const updatedTopic = await t.update(topicId, topicObject, userId);
    ctx.body = {
      success: true,
      message: 'Topic updated',
      data: updatedTopic,
    };
  });

  router.get('/topics/:tid/posts', async (ctx) => {
    const topicId = ctx.params.tid;
    const query = ctx.query;
    const queryObject = ProcessQuery.processQuery(query);
    const topicPosts = await t.getPosts(topicId, queryObject);
    ctx.body = {
      success: true,
      message: 'Topic posts retrieved',
      data: topicPosts,
    };
  });

  router.get('/topics/:tid/tags', async (ctx) => {
    const topicId = ctx.params.tid;
    const topicTags = await t.getTags(topicId);
    ctx.body = {
      success: true,
      message: 'Topic tags retrieved',
      data: topicTags,
    };
  });
};
