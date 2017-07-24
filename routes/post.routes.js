const postController = require('./../controllers/post.controller');
const authMiddleware = require('./../middleware/authentication.mdw');
const authzMiddleware = require('./../middleware/authorization.mdw');

const p = new postController();
const am = new authMiddleware();
const azm = new authzMiddleware();

module.exports = (router) => {
  router.get('/posts', async (ctx) => {
    ctx.status = 501;
    ctx.body = {
      success: true,
      message: 'Cannot retreive all the posts',
    };
  });

  router.post('/posts', am.checkAuthentication, async (ctx) => {
    const newPost = ctx.request.body;
    const userId = ctx.request.decoded.id;
    if (parseInt(userId, 10) !== parseInt(newPost.userId, 10)) {
      const err = new Error('User id must be same as creator');
      err.status = 400;
      throw err;
    }

    const createdPost = await p.create(newPost);

    ctx.body = {
      success: true,
      message: 'Post created',
      data: createdPost,
    };
  });

  router.put('/posts/:pid', am.checkAuthentication, async (ctx) => {
    const userId = ctx.request.decoded.id;
    const postObject = ctx.request.body;
    const postId = ctx.params.pid;

    const updatedPost = await p.update(postId, postObject, userId);
    ctx.body = {
      success: true,
      message: 'Post updated',
      data: updatedPost,
    };
  });
};
