import { GraphQLNonNull, GraphQLID } from 'graphql';

import { commentType } from './types';
import { subscribeCommentCreated } from './resolvers';
import * as topics from '../../subscriptionTopics';

export const commentCreated = {
  name: 'commentCreated',
  description: 'Subscribe to comments being created.',
  type: new GraphQLNonNull(commentType),
  args: {
    post: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: ({ [topics.COMMENT_CREATED]: comment }) => comment,
  subscribe: subscribeCommentCreated,
};

export const commentRemoved = {
  name: 'commentRemoved',
  description: 'Subscribe to comments being removed.',
  type: commentType,
  args: {
    parent: { type: new GraphQLNonNull(GraphQLID) },
  },
};
