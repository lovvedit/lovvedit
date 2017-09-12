import { GraphQLNonNull, GraphQLID } from 'graphql';

import { postType } from './types';
import {
  subscribePostCreated,
  subscribePostUpdated,
  subscribePostLikeToggled,
} from './subscribers';
import { resolveGenericSubscription } from '../../common/resolvers';
import * as topics from './topics';

export const postCreated = {
  name: 'postCreated',
  description: 'Subscribe to posts being created.',
  type: new GraphQLNonNull(postType),
  resolve: resolveGenericSubscription(topics.CREATED),
  subscribe: subscribePostCreated,
};

export const postUpdated = {
  name: 'postCreated',
  description: 'Subscribe to posts being created.',
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.UPDATED),
  subscribe: subscribePostUpdated,
};

export const postLikeToggled = {
  name: 'postLikeToggled',
  description: 'Subscribe to posts being liked or unliked.',
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.LIKE_TOGGLED),
  subscribe: subscribePostLikeToggled,
};
