import { GraphQLError } from 'graphql';

import Post from './models';

export async function resolveCreatePost(root, { post }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to create a post.');
  }

  return Post.create({ author: user.id, ...post });
}

export async function resolveUpdatePost(root, { id: postId, post }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to update a post.');
  }

  const { author } = await Post.findOne({ _id: postId });

  if (!author.equals(user.id)) {
    throw new GraphQLError('Only the author of the post can update it.');
  }

  return Post.findByIdAndUpdate(postId, { $set: post }, { new: true });
}

export async function resolveToggleLikePost(root, { id: postId }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to like a post.');
  }

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new GraphQLError(`The post with id ${postId} does not exist.`);
  }

  return post.toggleLike(user.id);
}

export async function resolvePosts(root, { first = 10, after }) {
  const pagination = after ? { _id: { $gt: after } } : null;
  const posts = await Post.find({ ...pagination }).limit(first);
  const edges = posts.map(post => ({ cursor: post.id, node: post }));

  return {
    pageInfo: {
      hasNextPage: false,
      nasPreviousPage: false,
    },
    edges,
  };
}

export async function resolvePost(root, { id }) {
  return Post.findOne({ _id: id });
}
