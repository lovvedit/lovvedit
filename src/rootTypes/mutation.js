/**
 * @overview
 * The root mutation GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { createUser, logIn } from '../components/users/mutations';
import { createPost, updatePost, toggleLikePost } from '../components/posts/mutations';
import sendMessage from '../components/messages/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation.',
  fields: () => ({
    logIn,
    createUser,
    createPost,
    updatePost,
    toggleLikePost,
    sendMessage,
  }),
});
