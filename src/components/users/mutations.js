import { GraphQLNonNull, GraphQLString } from 'graphql';

import { userType, userInputType } from './types';
import { resolveCreateUser, resolveLogIn } from './resolvers';

export const createUser = {
  type: new GraphQLNonNull(userType),
  description: 'Create a user.',
  args: {
    user: { type: new GraphQLNonNull(userInputType) },
  },
  resolve: resolveCreateUser,
};

export const logIn = {
  type: new GraphQLNonNull(GraphQLString),
  description: 'Log a user in.',
  args: {
    username: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: resolveLogIn,
};
