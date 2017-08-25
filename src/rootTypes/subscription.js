/**
 * @overview
 * The root subscription GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { postCreated, postUpdated, postLikeToggled } from '../components/posts/subscriptions';
import {
  commentCreated,
  commentUpdated,
  commentLikeToggled,
  commentRemoved,
} from '../components/comments/subscriptions';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'The root subscription.',
  fields: () => ({
    postCreated,
    postUpdated,
    postLikeToggled,
    commentCreated,
    commentUpdated,
    commentLikeToggled,
    commentRemoved,
  }),
});
