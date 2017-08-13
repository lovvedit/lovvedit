/**
 * @overview
 * The GraphQL schema definition.
 */

import { GraphQLSchema } from 'graphql';

import queryType from './components/query/types';

export default new GraphQLSchema({ query: queryType });
