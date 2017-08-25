import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../../config/subscriptions';
import * as topics from '../../subscriptionTopics';

export const subscribeCommentCreated = withFilter(
  () => pubsub.asyncIterator(topics.COMMENT_CREATED),
  ({ [topics.COMMENT_CREATED]: comment }, { post: postId }) => comment.post.equals(postId),
);

export const subscribeCommentUpdated = withFilter(
  () => pubsub.asyncIterator(topics.COMMENT_UPDATED),
  ({ [topics.COMMENT_UPDATED]: comment }, { id: commentId }) => comment.id === commentId,
);

export const subscribeCommentLikeToggled = withFilter(
  () => pubsub.asyncIterator(topics.COMMENT_LIKE_TOGGLED),
  ({ [topics.COMMENT_LIKE_TOGGLED]: comment }, { id: commentId }) => comment.id === commentId,
);

export const subscribeCommentRemoved = withFilter(
  () => pubsub.asyncIterator(topics.COMMENT_REMOVED),
  ({ [topics.COMMENT_REMOVED]: comment }, { id: commentId }) => comment.id === commentId,
);
