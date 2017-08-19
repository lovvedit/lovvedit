/**
 * @overview
 * The root query GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { post, posts } from '../components/posts/queries';
import { me, user } from '../components/users/queries';

export default new GraphQLObjectType({
  name: 'Query',
  description: 'The root query.',
  fields: () => ({
    me,
    user,
    post,
    posts,
  }),
});
