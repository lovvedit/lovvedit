import { GraphQLInt, GraphQLString } from 'graphql';

import { postsType } from './types';
import { resolvePosts } from './resolvers';

export default {
  type: postsType,
  description: 'The posts list connection.',
  args: {
    first: { type: GraphQLInt },
    after: { type: GraphQLString },
  },
  resolve: resolvePosts,
};
