import { withFilter } from 'graphql-subscriptions';

import Comment from './models';
import { pubsub } from '../../config/subscriptions';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';
import * as topics from '../../subscriptionTopics';

export async function resolveCreateComment(
  root,
  { post, parentComment, comment: { body } },
  { user: { id: userId } },
) {
  const comment = await Comment.create({ author: userId, post, parentComment, body });
  pubsub.publish(topics.COMMENT_CREATED, { [topics.COMMENT_CREATED]: comment });
  return comment;
}

export async function resolveUpdateComment(root, { id: commentId, body }, { user }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  checkUserIsAuthorOrThrow(comment, user.id);
  return Comment.findByIdAndUpdate(commentId, { $set: { body } }, { new: true });
}

export async function resolveToggleLikeComment(root, { id: commentId }, { user: { id: userId } }) {
  const comment = await getDocumentOrThrow(Comment, commentId);
  return comment.toggleLike(userId);
}

export const subscribeCommentCreated = withFilter(
  () => pubsub.asyncIterator(topics.COMMENT_CREATED),
  ({ [topics.COMMENT_CREATED]: comment }, { post: postId }) => comment.post.equals(postId),
);
