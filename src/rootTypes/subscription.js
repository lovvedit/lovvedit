/**
 * @overview
 * The root subscription GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { commentCreated } from '../components/comments/subscriptions';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'The root subscription.',
  fields: () => ({
    commentCreated,
  }),
});
