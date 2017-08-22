import Profile from './models';

export default function resolveUpdateProfile(root, { profile }, { user }) {
  return Profile.findOneAndUpdate(
    { user: user.id },
    { $set: profile },
    { upsert: true, new: true, runValidators: true },
  );
}
