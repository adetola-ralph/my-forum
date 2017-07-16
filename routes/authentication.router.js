const authController = require('./../controllers/authentication.controller');

const a = new authController();

module.exports = (router) => {
  router.post('/signup', async (ctx) => {
    const newUser = await a.signUp(ctx.request.body);
    ctx.body = {
      data: newUser,
      success: true,
      message: 'Signup successful',
    };
  });
};
