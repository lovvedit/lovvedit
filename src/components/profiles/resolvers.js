import { GraphQLError } from 'graphql';

import Profile from './models';

export default function resolveUpdateProfile(root, { profile }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to update your profile.');
  }

  return Profile.findOneAndUpdate(
    { user: user.id },
    { $set: profile },
    { upsert: true, new: true, runValidators: true },
  );
}
