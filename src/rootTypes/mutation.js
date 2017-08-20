/**
 * @overview
 * The root mutation GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

import { createUser, updateUser, logIn } from '../components/users/mutations';
import updateProfile from '../components/profiles/mutations';
import { createPost, updatePost, toggleLikePost } from '../components/posts/mutations';
import { createComment, updateComment, toggleLikeComment } from '../components/comments/mutations';
import sendMessage from '../components/messages/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation.',
  fields: () => ({
    logIn,
    createUser,
    updateUser,
    updateProfile,
    createPost,
    updatePost,
    toggleLikePost,
    createComment,
    updateComment,
    toggleLikeComment,
    sendMessage,
  }),
});
