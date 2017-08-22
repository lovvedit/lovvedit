import { GraphQLNonNull, GraphQLID } from 'graphql';

import { commentType, commentUpdateInputType, commentInputType } from './types';
import { resolveCreateComment, resolveUpdateComment, resolveToggleLikeComment } from './resolvers';
import { loginRequired } from '../../utils';

export const createComment = {
  name: 'createComment',
  description: 'Create a comment.',
  type: commentType,
  args: {
    post: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: new GraphQLNonNull(commentInputType) },
    parentComment: { type: GraphQLID },
  },
  resolve: loginRequired(resolveCreateComment),
};

export const updateComment = {
  name: 'updateComment',
  description: 'Update a comment.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    comment: { type: new GraphQLNonNull(commentUpdateInputType) },
  },
  resolve: loginRequired(resolveUpdateComment),
};

export const toggleLikeComment = {
  name: 'toggleLikePost',
  description: 'Toggle like.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: loginRequired(resolveToggleLikeComment),
};
