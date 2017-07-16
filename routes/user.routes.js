const userController = require('./../controllers/user.controller');
const authMiddleware = require('./../middleware/authentication.mdw');

const u = new userController();
const am = new authMiddleware();

module.exports = (router) => {
  router.get('/users/:uid', am.checkAuthentication, async (ctx) => {
    if (parseInt(ctx.request.decoded.id, 10) !== parseInt(ctx.params.uid, 10)) {
      const err = new Error('You\'re not allowed to perform this action');
      err.status = 403;
      throw err;
    }

    const user = await u.get(parseInt(ctx.params.uid, 10));
    ctx.body = {
      data: user,
      success: true,
      message: 'User retrieved',
    };
  });
};
