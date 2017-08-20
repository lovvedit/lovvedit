import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLID,
  GraphQLString,
} from 'graphql';

import Profile from '../profiles/models';
import { resolveUserPosts, resolveUserMessages } from './resolvers';
import { paginationInputType } from '../../common/types';
import { profileType } from '../profiles/types';
import { postsType, postFiltersType } from '../posts/types';
import { messagesType } from '../messages/types';

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'The User type.',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    posts: {
      type: postsType,
      description: 'The posts the user is author of.',
      args: {
        filters: { type: postFiltersType },
        sort: { type: GraphQLString },
        pagination: { type: paginationInputType },
      },
      resolve: resolveUserPosts,
    },
    profile: {
      type: profileType,
      description: 'The profile of the user.',
      resolve: user => Profile.findOne({ user: user.id }),
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

export const userUpdateInputType = new GraphQLInputObjectType({
  name: 'UserUpdateInput',
  description: 'The UserInput type.',
  fields: () => ({
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});
