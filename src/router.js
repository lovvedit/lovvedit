import Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import schema from './schema';

const { NODE_ENV, HOST, PORT } = process.env;

const router = new Router();

const GRAPHQL_PATH = '/graphql';
const GRAPHIQL_PATH = '/graphiql';
export const SUBSCRIPTIONS_PATH = '/subscriptions';

export default router.all(
  GRAPHQL_PATH,
  graphqlKoa(ctx => ({ schema, context: { user: ctx.state.user } })),
);

// We only want GraphiQL for development
if (NODE_ENV === 'development') {
  router.get(
    GRAPHIQL_PATH,
    graphiqlKoa({
      endpointURL: GRAPHQL_PATH,
      subscriptionsEndpoint: `ws://${HOST}:${PORT}${SUBSCRIPTIONS_PATH}`,
    }),
  );
}
