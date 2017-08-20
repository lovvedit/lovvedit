/**
 * @overview
 * The server's entry point.
 *
 * @author Diego Stratta <strattadb@gmail.com>
 * @license MIT
 */

import { createServer } from 'http';

import Koa from 'koa';
import cors from 'kcors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import koaLogger from 'koa-logger';
import logger from 'winston';
import mongoose from 'mongoose';
import passport from 'koa-passport';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import configureWinston from './config/winston';
import configureMongo from './config/mongoose';
import configurePassport from './config/passport';

import schema from './schema';
import router, { SUBSCRIPTIONS_PATH } from './router';
import { subscriptionServerOnConnect } from './config/subscriptions';

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
    .use(helmet())
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

  const server = createServer(app.callback());

  server.listen(PORT, () => {
    logger.info(`GraphQL server listening on port ${PORT} on ${NODE_ENV} mode`);
  });

  SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: subscriptionServerOnConnect,
    },
    { server, path: SUBSCRIPTIONS_PATH },
  );
}());
