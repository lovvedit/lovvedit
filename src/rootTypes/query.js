/**
 * @overview
 * The root query GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import posts from '../components/posts/queries';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root query.',
  fields: () => ({
    posts,
  }),
});
