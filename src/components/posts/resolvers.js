import Post from './models';
import { pubsub } from '../../config/subscriptions';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';
import * as topics from '../../subscriptionTopics';

export async function resolveCreatePost(root, { post: data }, { user: { id: userId } }) {
  const post = await Post.create({ author: userId, ...data });
  pubsub.publish(topics.POST_CREATED, { [topics.POST_CREATED]: post });
  return post;
}

export async function resolveUpdatePost(root, { id: postId, post: data }, { user }) {
  const post = await getDocumentOrThrow(Post, postId);
  checkUserIsAuthorOrThrow({ doc: post, userId: user.id });
  const updatedPost = await Post.findByIdAndUpdate(postId, { $set: data }, { new: true });
  pubsub.publish(topics.POST_UPDATED, { [topics.POST_UPDATED]: updatedPost });
  return updatedPost;
}

export async function resolveRemovePost(root, { id: postId }, { user }) {
  const post = await getDocumentOrThrow(Post, postId);
  checkUserIsAuthorOrThrow({ doc: post, userId: user.id });
  return Post.findByIdAndRemove(postId);
}

export async function resolveToggleLikePost(root, { id: postId }, { user: { id: userId } }) {
  const post = await getDocumentOrThrow(Post, postId);
  await post.toggleLike(userId);
  pubsub.publish(topics.POST_LIKE_TOGGLED, { [topics.POST_LIKE_TOGGLED]: post });
  return post;
}
