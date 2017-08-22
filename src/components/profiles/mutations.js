import { GraphQLNonNull } from 'graphql';

import { profileType, profileInputType } from './types';
import resolveUpdateProfile from './resolvers';
import { loginRequired } from '../../utils';

export default {
  type: profileType,
  args: {
    profile: { type: new GraphQLNonNull(profileInputType) },
  },
  resolve: loginRequired(resolveUpdateProfile),
};
