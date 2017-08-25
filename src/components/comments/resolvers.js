import Comment from './models';
import { pubsub } from '../../config/subscriptions';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';
import * as topics from '../../subscriptionTopics';

export async function resolveCreateComment(
  root,
  { postId: post, parentCommentId: parentComment = null, comment: { body } },
  { user: { id: userId } },
) {
  const comment = await Comment.create({ author: userId, post, parentComment, body });
  pubsub.publish(topics.COMMENT_CREATED, { [topics.COMMENT_CREATED]: comment });
  return comment;
}

export async function resolveUpdateComment(root, { id: commentId, comment: data }, { user }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  checkUserIsAuthorOrThrow({ doc: comment, userId: user.id });
  const updatedComment = await Comment.findByIdAndUpdate(commentId, { $set: data }, { new: true });
  pubsub.publish(topics.COMMENT_UPDATED, { [topics.COMMENT_UPDATED]: updatedComment });
  return updatedComment;
}

export async function resolveRemoveComment(root, { id: commentId }, { user: { id: userId } }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  checkUserIsAuthorOrThrow({ doc: comment, userId });
  const removedComment = await Comment.findByIdAndRemove(commentId);
  pubsub.publish(topics.COMMENT_REMOVED, { [topics.COMMENT_REMOVED]: removedComment });
  return removedComment;
}

export async function resolveToggleLikeComment(root, { id: commentId }, { user: { id: userId } }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  await comment.toggleLike(userId);
  pubsub.publish(topics.COMMENT_LIKE_TOGGLED, { [topics.COMMENT_LIKE_TOGGLED]: comment });
  return comment;
}
