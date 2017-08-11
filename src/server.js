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
import logger from 'winston';
import mongoose from 'mongoose';

import configureWinston from './config/winston';
import configureMongo from './config/mongoose';

import router from './router';

const { NODE_ENV, PORT, MONGO_HOST, MONGO_PORT, MONGO_NAME, LOG_LEVEL } = process.env;
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

(async function main() {
  // Configure MongoDB
  mongoose.Promise = Promise;
  await configureMongo(mongoose, MONGO_URI);

  // Configure Winston
  configureWinston(logger, LOG_LEVEL);

  const app = new Koa();

  app
    .use(koaLogger())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(cors());

  app.listen(PORT, () => logger.info(`API server listening on port ${PORT} on ${NODE_ENV} mode`));
}());
