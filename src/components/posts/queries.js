import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import Post from './models';
import { paginationArgs } from '../../common/args';
import { postType, postsType, postFiltersType } from './types';
import { connectionResolver } from '../../utils';

export const post = {
  type: postType,
  description: 'Get a post by its id.',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (root, { id }) => Post.findById(id),
};

export const posts = {
  type: postsType,
  description: 'The posts list connection.',
  args: {
    filters: { type: postFiltersType },
    sort: { type: GraphQLString },
    ...paginationArgs,
  },
  resolve: connectionResolver(Post),
};
