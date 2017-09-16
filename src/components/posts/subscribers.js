import { withFilter } from 'graphql-subscriptions';

import { pubsub } from '../../config/subscriptions';
import * as topics from './topics';

export const subscribePostCreated = () => pubsub.asyncIterator(topics.CREATED);

export const subscribePostUpdated = withFilter(
  () => pubsub.asyncIterator(topics.UPDATED),
  ({ [topics.UPDATED]: post }, { id: postId }) => post.id === postId,
);

export const subscribePostLikeToggled = withFilter(
  () => pubsub.asyncIterator(topics.LIKE_TOGGLED),
  ({ [topics.LIKE_TOGGLED]: post }, { id: postId }) => post.id === postId,
);
