/**
 * @overview
 * The root mutation GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { mutations as usersMutations } from '../components/users';
import updateProfile from '../components/profiles/mutations';
import { mutations as postsMutations } from '../components/posts';
import { mutations as commentsMutations } from '../components/comments';
import sendMessage from '../components/messages/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation.',
  fields: () => ({
    ...usersMutations,
    updateProfile,
    ...postsMutations,
    ...commentsMutations,
    sendMessage,
  }),
});
