/**
 * @overview
 * The root query GraphQL object type definition.
 */

import { GraphQLObjectType, GraphQLList } from 'graphql';

import { getPosts } from './resolvers';
import postType from '../posts/types';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root query',
  fields: () => ({
    posts: {
      type: new GraphQLList(postType),
      description: 'The list of posts.',
      resolve: getPosts,
    },
  }),
});
