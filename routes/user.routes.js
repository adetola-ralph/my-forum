const userController = require('./../controllers/user.controller');
const authMiddleware = require('./../middleware/authentication.mdw');
const authzMiddleware = require('./../middleware/authorization.mdw');

const u = new userController();
const am = new authMiddleware();
const azm = new authzMiddleware();

module.exports = (router) => {
  router.get('/users/:uid', am.checkAuthentication, azm.checkUser, async (ctx) => {
    const user = await u.get(parseInt(ctx.params.uid, 10));
    ctx.body = {
      data: user,
      success: true,
      message: 'User retrieved',
    };
  });

  router.put('/users/:uid', am.checkAuthentication, azm.checkUser, async (ctx) => {
    const user = await u.update(parseInt(ctx.params.uid, 10), ctx.request.body);
    ctx.body = {
      data: user,
      success: true,
      message: 'User updated',
    };
  });
};
