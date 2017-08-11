/**
 * @overview
 * The GraphQL schema definition.
 */

import { GraphQLSchema } from 'graphql';

import QueryType from './components/query/types';

export default new GraphQLSchema({ query: QueryType });
