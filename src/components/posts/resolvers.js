import Post from './models';

export async function createPostResolver(root, { post }, { user }) {
  return Post.create({ author: user.id, ...post });
}

export async function updatePostResolver(root, { post }, { user }) {}
