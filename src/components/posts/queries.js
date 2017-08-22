import { GraphQLString } from 'graphql';

import Post from './models';
import { paginationInputType } from '../../common/types';
import { postType, postsType, postFiltersType } from './types';
import { connectionResolver } from '../../utils';

export const post = {
  type: postType,
  description: 'Get a post by its id.',
  args: {
    id: { type: GraphQLString },
  },
  resolve: (root, { id }) => Post.findOne({ _id: id }),
};

export const posts = {
  type: postsType,
  description: 'The posts list connection.',
  args: {
    filters: { type: postFiltersType },
    sort: { type: GraphQLString },
    pagination: { type: paginationInputType },
  },
  resolve: connectionResolver(Post),
};
