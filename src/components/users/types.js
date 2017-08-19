import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import { resolveUserPosts, resolveUserMessages } from './resolvers';
import { postsType } from '../posts/types';
import { messagesType } from '../messages/types';

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'The User type.',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: postsType,
      args: {
        first: { type: GraphQLInt },
        after: { type: GraphQLString },
      },
      resolve: resolveUserPosts,
    },
    messages: {
      type: messagesType,
      args: {
        first: { type: GraphQLInt },
        after: { type: GraphQLString },
      },
      resolve: resolveUserMessages,
    },
  }),
});

export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'The UserInput type.',
  fields: () => ({
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
