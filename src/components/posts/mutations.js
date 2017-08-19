import { GraphQLNonNull, GraphQLString } from 'graphql';

import { postType, postInputType } from '../posts/types';
import { resolveCreatePost, resolveUpdatePost, resolveToggleLikePost } from './resolvers';

export const createPost = {
  name: 'createPost',
  description: 'Create a new post.',
  type: postType,
  args: {
    post: { type: new GraphQLNonNull(postInputType) },
  },
  resolve: resolveCreatePost,
};

export const updatePost = {
  name: 'updatePost',
  description: 'Update a post.',
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    post: { type: new GraphQLNonNull(postInputType) },
  },
  resolve: resolveUpdatePost,
};

export const toggleLikePost = {
  name: 'toggleLikePost',
  description: 'Toggle like.',
  type: postType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: resolveToggleLikePost,
};
