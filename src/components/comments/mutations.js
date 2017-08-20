import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

import { commentType } from './types';
import { resolveCreateComment, resolveUpdateComment, resolveToggleLikeComment } from './resolvers';

export const createComment = {
  name: 'createComment',
  description: 'Create a comment.',
  type: commentType,
  args: {
    parent: { type: new GraphQLNonNull(GraphQLID) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: resolveCreateComment,
};

export const updateComment = {
  name: 'updateComment',
  description: 'Update a comment.',
  type: commentType,
  args: {
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: resolveUpdateComment,
};

export const toggleLikeComment = {
  name: 'toggleLikePost',
  description: 'Toggle like.',
  type: commentType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: resolveToggleLikeComment,
};
