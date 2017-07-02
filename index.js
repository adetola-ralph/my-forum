const winston = require('winston');
const koa = require('koa');
const morgan = require('koa-morgan');
const koaRouter = require('koa-router');
const bodyParser = require('koa-body');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ silent: true });
const models = require('./models');

const app = new koa();
const router = koaRouter({
  prefix: '/api/v1'
});
const port = process.env.PORT;

app.use(bodyParser());
app.use(morgan('dev'));

router.get('/', async (ctx) => {
  const user = await models.Users.findAll();
  ctx.body = user;
});

app.use(router.routes());

app.listen(port);
winston.info(`Server listening on ${port}`);
const addition = () => 1 + 2;

module.exports = addition;
