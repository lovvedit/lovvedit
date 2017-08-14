/**
 * @overview
 * The GraphQL schema definition.
 */

import { GraphQLSchema } from 'graphql';

import queryType from './components/query/types';
import mutationType from './components/query/mutations';

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});
