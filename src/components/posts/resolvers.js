import Post from './models';

export async function createPostResolver(root, { post }, { user }) {
  return Post.create({ author: user.id, ...post });
}

export async function updatePostResolver(root, { post }, { user }) {}

export async function resolvePosts(_, { first, after }) {
  const posts = await Post.find({ _id: { $gt: after } }).limit(first).toObject();
  const edges = posts.map(post => ({ cursor: post.id, node: post }));

  return {
    pageInfo: {
      hasNextPage: false,
      nasPreviousPage: false,
    },
    edges,
  };
}
