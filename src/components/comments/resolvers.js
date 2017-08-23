import Comment from './models';
import { pubsub } from '../../config/subscriptions';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';
import * as topics from '../../subscriptionTopics';

export async function resolveCreateComment(
  root,
  { post, parentComment = null, comment: { body } },
  { user: { id: userId } },
) {
  const comment = await Comment.create({ author: userId, post, parentComment, body });
  pubsub.publish(topics.COMMENT_CREATED, { [topics.COMMENT_CREATED]: comment });
  return comment;
}

export async function resolveUpdateComment(root, { id: commentId, body }, { user }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  checkUserIsAuthorOrThrow({ doc: comment, userId: user.id });
  return Comment.findByIdAndUpdate(commentId, { $set: { body } }, { new: true });
}

export async function resolveRemoveComment(root, { id: commentId }, { user: { id: userId } }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  checkUserIsAuthorOrThrow({ doc: comment, userId });
  return Comment.findByIdAndRemove(commentId);
}

export async function resolveToggleLikeComment(root, { id: commentId }, { user: { id: userId } }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  return comment.toggleLike(userId);
}
