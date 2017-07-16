const winston = require('winston');
const koa = require('koa');
const morgan = require('koa-morgan');
const koaRouter = require('koa-router');
const bodyParser = require('koa-body');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ silent: true });
const models = require('./models');
const userController = require('./controllers/user.controller');
const routes = require('./routes');


const u = new userController();

const app = new koa();
const router = koaRouter({
  prefix: '/api/v1'
});
const port = process.env.PORT;

app.use(bodyParser());
app.use(morgan('dev'));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      message: err.message,
      err,
    };
  }
});

router.get('/', async (ctx) => {
  const user = await models.Users.findAll();
  ctx.body = user;
});

routes(router);

app.use(router.routes());

app.listen(port, () => {
  winston.info(`Server listening on ${port}`);
});

module.exports = app;
