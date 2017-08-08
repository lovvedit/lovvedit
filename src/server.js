/**
 * @overview
 * The server's entry point.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license MIT
 */

import Koa from 'koa';
import cors from 'kcors';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';

import router from './router';

import logger from './config/winston';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;

const app = new Koa();

// Plug in the middleware
app
  .use(koaLogger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors());

app.listen(PORT, () => logger.info(`API server listening on port ${PORT} on ${NODE_ENV} mode`));
