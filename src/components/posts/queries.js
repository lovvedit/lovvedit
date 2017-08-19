import { GraphQLNonNull, GraphQLInt, GraphQLString } from 'graphql';

import { pageInfoType } from '../../common/types';
import { postType, postsType } from './types';
import { resolvePost, resolvePosts } from './resolvers';

export const post = {
  type: postType,
  description: 'Get a post by its id.',
  args: {
    id: { type: GraphQLString },
  },
  resolve: resolvePost,
};

export const posts = {
  type: postsType,
  description: 'The posts list connection.',
  args: {
    first: { type: GraphQLInt },
    after: { type: GraphQLString },
  },
  resolve: resolvePosts,
};

export const pageInfo = {
  type: new GraphQLNonNull(pageInfoType),
  description: 'Pagination info.',
};
