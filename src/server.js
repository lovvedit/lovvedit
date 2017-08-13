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
import passport from 'koa-passport';

import configureWinston from './config/winston';
import configureMongo from './config/mongoose';
import configurePassport from './config/passport';

import router from './router';

const { NODE_ENV, PORT, MONGO_HOST, MONGO_PORT, MONGO_NAME, LOG_LEVEL } = process.env;
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

(async function main() {
  // Configure Winston
  configureWinston(logger, LOG_LEVEL);

  // Configure MongoDB
  mongoose.Promise = Promise;
  await configureMongo(mongoose, MONGO_URI);

  // Configure Passport
  configurePassport(passport);

  const app = new Koa();
  app
    .use(koaLogger())
    .use(bodyParser())
    .use(passport.initialize())
    .use((ctx, next) =>
      passport.authenticate('jwt', { session: false }, (err, user) => {
        ctx.state.user = user || null;
        return next();
      })(ctx),
    )
    .use(router.routes())
    .use(router.allowedMethods())
    .use(cors());

  app.listen(PORT, () => logger.info(`API server listening on port ${PORT} on ${NODE_ENV} mode`));
}());
