import { GraphQLString } from 'graphql';

import { userType } from './types';
import { resolveUser } from './resolvers';

export const me = {
  type: userType,
  description: 'Get the logged in user.',
  resolve: (root, args, { user }) => user,
};

export const user = {
  type: userType,
  description: 'Get a user by its id or username.',
  args: {
    id: { type: GraphQLString },
    username: { type: GraphQLString },
  },
  resolve: resolveUser,
};
