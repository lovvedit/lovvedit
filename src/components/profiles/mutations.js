import { GraphQLNonNull } from 'graphql';

import { profileType, profileInputType } from './types';
import resolveUpdateProfile from './resolvers';

export default {
  type: profileType,
  args: {
    profile: { type: new GraphQLNonNull(profileInputType) },
  },
  resolve: resolveUpdateProfile,
};
