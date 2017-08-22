import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

import { commentType } from './types';
import { resolveCreateComment, resolveUpdateComment, resolveToggleLikeComment } from './resolvers';
import { loginRequired } from '../../utils';

export const createComment = {
  name: 'createComment',
  description: 'Create a comment.',
  type: commentType,
  args: {
    parent: { type: new GraphQLNonNull(GraphQLID) },
    body: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: loginRequired(resolveCreateComment),
};

export const updateComment = {
  name: 'updateComment',
  description: 'Update a comment.',
  type: commentType,
  args: {
    body: { type: new GraphQLNonNull(GraphQLString) },
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
