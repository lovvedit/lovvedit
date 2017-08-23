import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../../config/subscriptions';
import * as topics from '../../subscriptionTopics';

export const subscribePostCreated = () => pubsub.asyncIterator(topics.POST_CREATED);

export const subscribePostUpdated = withFilter(
  () => pubsub.asyncIterator(topics.POST_UPDATED),
  ({ [topics.POST_UPDATED]: post }, { id: postId }) => post.id === postId,
);

export const subscribePostLikeToggled = withFilter(
  () => pubsub.asyncIterator(topics.POST_LIKE_TOGGLED),
  ({ [topics.POST_LIKE_TOGGLED]: post }, { id: postId }) => post.id === postId,
);
