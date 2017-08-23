import { GraphQLNonNull, GraphQLID } from 'graphql';

import { postType, postInputType, postUpdateInputType } from './types';
import {
  resolveCreatePost,
  resolveUpdatePost,
  resolveRemovePost,
  resolveToggleLikePost,
} from './resolvers';
import { loginRequired } from '../../utils';

export const createPost = {
  name: 'createPost',
  description: 'Create a new post.',
  type: postType,
  args: {
    post: { type: new GraphQLNonNull(postInputType) },
  },
  resolve: loginRequired(resolveCreatePost),
};

export const updatePost = {
  name: 'updatePost',
  description: 'Update a post.',
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    post: { type: new GraphQLNonNull(postUpdateInputType) },
  },
  resolve: loginRequired(resolveUpdatePost),
};

export const removePost = {
  name: 'removePost',
  description: 'Remove a post',
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: loginRequired(resolveRemovePost),
};

export const toggleLikePost = {
  name: 'toggleLikePost',
  description: 'Toggle like.',
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: loginRequired(resolveToggleLikePost),
};
