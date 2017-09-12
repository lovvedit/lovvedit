/**
 * @overview
 * The root subscription GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { subscriptions as postsSubscriptions } from '../components/posts';
import { subscriptions as commentsSubscriptions } from '../components/comments';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'The root subscription.',
  fields: () => ({
    ...postsSubscriptions,
    ...commentsSubscriptions,
  }),
});
