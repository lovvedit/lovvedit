import Comment from './models';
import { getDocumentOrThrow, checkUserIsAuthorOrThrow } from '../../utils';

export async function resolveCreateComment(root, { parent, body }, { user: { id: userId } }) {
  return Comment.create({ author: userId, parent, body });
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
