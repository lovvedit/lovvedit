import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import User from './models';
import { resolvePosts } from '../posts/resolvers';

/**
 * Returns a user by its id or username.
 */
export async function resolveUser(root, { id, username }) {
  if (!id && !username) {
    throw new GraphQLError('You must provide a user id or username.');
  }

  const key = id ? { _id: id } : { username };

  return User.findOne(key);
}

/**
 * Creates a new user.
 */
export function resolveCreateUser(root, { user }) {
  return User.create(user);
}

/**
 * Updates the logged in user. Returns the updated user.
 */
export function resolveUpdateUser(root, { user: data }, { user }) {
  return User.findByIdAndUpdate(user.id, { $set: data }, { new: true, runValidators: true });
}

/**
 * Tries to log the user in.
 */
export async function resolveLogIn(root, { username, password }) {
  const user = await User.findOne({ username });

  if (!user || !await user.comparePassword(password)) {
    throw new GraphQLError("Username and password don't match");
  }

  const { JWT_SECRET } = process.env;
  const jwtPayload = { username: user.username };
  const jwtOptions = { expiresIn: '2 days', issuer: 'lovvedit', subject: user.id };

  return jwt.sign(jwtPayload, JWT_SECRET, jwtOptions);
}

/**
 * Returns the posts of the user.
 */
export function resolveUserPosts(user, { filters: postFilters, sort, pagination }, ctx, info) {
  const filters = { author: user.id, ...postFilters };
  return resolvePosts(user, { filters, sort, pagination }, ctx, info);
}

export async function resolveUserMessages(user, {}) {}
