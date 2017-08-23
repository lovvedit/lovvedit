import { GraphQLNonNull, GraphQLID } from 'graphql';

import { commentType } from './types';
import { subscribeCommentCreated, subscribeCommentUpdated } from './subscribers';
import { resolveGenericSubscription } from '../../common/resolvers';
import * as topics from '../../subscriptionTopics';

export const commentCreated = {
  name: 'commentCreated',
  description: 'Subscribe to comments being created.',
  type: new GraphQLNonNull(commentType),
  args: {
    postId: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.COMMENT_CREATED),
  subscribe: subscribeCommentCreated,
};

export const commentUpdated = {
  name: 'commentUpdated',
  description: 'Subscribe to comments being updated.',
  type: new GraphQLNonNull(commentType),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: resolveGenericSubscription(topics.COMMENT_UPDATED),
  subscribe: subscribeCommentUpdated,
};

export const commentRemoved = {
  name: 'commentRemoved',
  description: 'Subscribe to comments being removed.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
};
