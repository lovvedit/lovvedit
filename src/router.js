import Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import GraphQLSchema from './schema';

const { NODE_ENV, PORT } = process.env;

const router = new Router();

const GRAPHQL_PATH = '/graphql';
const GRAPHIQL_PATH = '/graphiql';
export const SUBSCRIPTIONS_PATH = '/subscriptions';

export default router.all(
  GRAPHQL_PATH,
  graphqlKoa(ctx => ({ schema: GraphQLSchema, context: { user: ctx.state.user } })),
);

// We only want GraphiQL for development
if (NODE_ENV === 'development') {
  router.get(
    GRAPHIQL_PATH,
    graphiqlKoa({
      endpointURL: GRAPHQL_PATH,
      subscriptionsEndpoint: `ws://localhost:${PORT}${SUBSCRIPTIONS_PATH}`,
    }),
  );
}
