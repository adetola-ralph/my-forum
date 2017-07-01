// const winston = require('winston');
const koa = require('koa');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ silent: true });

const app = new koa();
const port = process.env.PORT;

app.use((ctx) => {
  ctx.body = 'Hello world';
});

app.listen(port);
const addition = () => 1 + 2;

module.exports = addition;
