import { GraphQLNonNull, GraphQLID } from 'graphql';

import { postType } from './types';
import {
  subscribePostCreated,
  subscribePostUpdated,
  subscribePostLikeToggled,
} from './subscribers';
import { resolveGenericSubscription } from '../../common/resolvers';
import * as topics from '../../subscriptionTopics';

export const postCreated = {
  name: 'postCreated',
  description: 'Subscribe to posts being created.',
  type: new GraphQLNonNull(postType),
  resolve: resolveGenericSubscription(topics.POST_CREATED),
  subscribe: subscribePostCreated,
};

export const postUpdated = {
  name: 'postCreated',
  description: 'Subscribe to posts being created.',
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.POST_UPDATED),
  subscribe: subscribePostUpdated,
};

export const postLikeToggled = {
  name: 'postLikeToggled',
  description: 'Subscribe to posts being liked or unliked.',
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.POST_LIKE_TOGGLED),
  subscribe: subscribePostLikeToggled,
};
