import { GraphQLNonNull, GraphQLID } from 'graphql';

import { commentType } from './types';
import {
  subscribeCommentCreated,
  subscribeCommentUpdated,
  subscribeCommentLikeToggled,
  subscribeCommentRemoved,
} from './subscribers';
import { resolveGenericSubscription } from '../../common/resolvers';
import * as topics from './topics';

export const commentCreated = {
  name: 'commentCreated',
  description: 'Subscribe to comments being created.',
  type: commentType,
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.CREATED),
  subscribe: subscribeCommentCreated,
};

export const commentUpdated = {
  name: 'commentUpdated',
  description: 'Subscribe to comments being updated.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.UPDATED),
  subscribe: subscribeCommentUpdated,
};

export const commentLikeToggled = {
  name: 'commentLikeToggled',
  description: 'Subscribe to comments being like toggled.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.LIKE_TOGGLED),
  subscribe: subscribeCommentLikeToggled,
};

export const commentRemoved = {
  name: 'commentRemoved',
  description: 'Subscribe to comments being removed.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.REMOVED),
  subscribe: subscribeCommentRemoved,
};
