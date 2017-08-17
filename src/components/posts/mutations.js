import { GraphQLNonNull } from 'graphql';

import { postType, postInputType } from '../posts/types';
import { createPostResolver } from './resolvers';

export const createPost = {
  name: 'createPost',
  description: 'Create a new post.',
  type: postType,
  args: {
    post: { type: new GraphQLNonNull(postInputType) },
  },
  resolve: createPostResolver,
};

export const updatePost = {
  name: 'updatePost',
};
