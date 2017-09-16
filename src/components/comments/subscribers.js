import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../../config/subscriptions';
import * as topics from './topics';

export const subscribeCommentCreated = withFilter(
  () => pubsub.asyncIterator(topics.CREATED),
  ({ [topics.CREATED]: comment }, { post: postId }) => comment.post.equals(postId),
);

export const subscribeCommentUpdated = withFilter(
  () => pubsub.asyncIterator(topics.UPDATED),
  ({ [topics.UPDATED]: comment }, { id: commentId }) => comment.id === commentId,
);

export const subscribeCommentLikeToggled = withFilter(
  () => pubsub.asyncIterator(topics.LIKE_TOGGLED),
  ({ [topics.LIKE_TOGGLED]: comment }, { id: commentId }) => comment.id === commentId,
);

export const subscribeCommentRemoved = withFilter(
  () => pubsub.asyncIterator(topics.REMOVED),
  ({ [topics.REMOVED]: comment }, { id: commentId }) => comment.id === commentId,
);
