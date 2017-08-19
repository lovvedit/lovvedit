import { GraphQLError } from 'graphql';
import jwt from 'jsonwebtoken';

import User from './models';
import Post from '../posts/models';

export async function resolveUser(root, { id, username }) {
  if (!id && !username) {
    throw new GraphQLError('You must provide a user id or username.');
  }

  const key = id ? { _id: id } : { username };

  return User.findOne(key);
}

export function resolveMe(root, args, { user }) {
  return user;
}

export function resolveCreateUser(root, { user: { username, password } }) {
  return User.create({ username, password });
}

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

export async function resolveUserPosts(user, { first = 10, after }) {
  const pagination = after ? { _id: { $gt: after } } : null;
  const posts = await Post.find({ author: user.id, ...pagination }).limit(first);
  const edges = posts.map(post => ({ cursor: post.id, node: post }));

  return {
    pageInfo: {
      hasNextPage: false,
      nasPreviousPage: false,
    },
    edges,
  };
}
