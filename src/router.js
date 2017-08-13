import Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

import GraphQLSchema from './schema';

const { NODE_ENV } = process.env;

const router = new Router();

const graphqlRoute = '/graphql';
const graphiqlRoute = '/graphiql';

export default router
  .get(graphqlRoute, graphqlKoa({ schema: GraphQLSchema }))
  .post(graphqlRoute, graphqlKoa({ schema: GraphQLSchema }));

// We only want GraphiQL for development
if (NODE_ENV === 'development') {
  router
    .get(graphiqlRoute, graphiqlKoa({ endpoint: graphqlRoute }))
    .post(graphiqlRoute, graphiqlKoa({ endpoint: graphqlRoute }));
}
