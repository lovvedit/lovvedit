/**
 * @overview
 * The GraphQL schema definition.
 */

import { GraphQLSchema } from 'graphql';

import {
  queryType as query,
  mutationType as mutation,
  subscriptionType as subscription,
} from './rootTypes';

export default new GraphQLSchema({ query, mutation, subscription });
