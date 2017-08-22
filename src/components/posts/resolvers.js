import Post from './models';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';

export async function resolveCreatePost(root, { post }, { user: { id: userId } }) {
  return Post.create({ author: userId, ...post });
}

export async function resolveUpdatePost(root, { id: postId, post: data }, { user }) {
  const post = await getDocumentOrThrow(Post, postId);
  checkUserIsAuthorOrThrow({ doc: post, userId: user.id });
  return Post.findByIdAndUpdate(postId, { $set: data }, { new: true });
}

export async function resolveRemovePost(root, { id: postId }, { user }) {
  const post = await getDocumentOrThrow(Post, postId);
  checkUserIsAuthorOrThrow(post, user.id);
  return Post.findByIdAndRemove(postId);
}

export async function resolveToggleLikePost(root, { id: postId }, { user: { id: userId } }) {
  const post = await getDocumentOrThrow(Post, postId);
  return post.toggleLike(userId);
}
