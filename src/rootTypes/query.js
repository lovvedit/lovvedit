/**
 * @overview
 * The root query GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { queries as postsQueries } from '../components/posts';
import { queries as usersQueries } from '../components/users';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root query.',
  fields: () => ({
    ...usersQueries,
    ...postsQueries,
  }),
});
