/**
 * @overview
 * The root mutation GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { createPost } from '../components/posts/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation.',
  fields: () => ({
    createPost,
  }),
});
