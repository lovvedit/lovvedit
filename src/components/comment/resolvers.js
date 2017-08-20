import { GraphQLError } from 'graphql';

import Comment from './models';

export async function resolveCreateComment(root, { parent, body }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to comment.');
  }

  return Comment.create({ author: user.id, parent, body });
}

export async function resolveUpdateComment(root, { id: commentId, body }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to update a comment.');
  }

  const { author } = await Comment.findOne({ _id: commentId });

  if (!author.equals(user.id)) {
    throw new GraphQLError('Only the author of the comment can update it.');
  }

  return Comment.findByIdAndUpdate(commentId, { $set: { body } }, { new: true });
}

export async function resolveToggleLikeComment(root, { id: commentId }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to like a post.');
  }

  const comment = await Comment.findOne({ _id: commentId });

  if (!comment) {
    throw new GraphQLError(`The comment with id ${commentId} does not exist.`);
  }

  return comment.toggleLike(user.id);
}

export async function resolveComments(
  parent,
  { filters, sort = 'hot', pagination: { first = 10, after } = {} },
) {
  const paginationFilter = after ? { _id: { $gt: after } } : null;
  const commentFilters = { parent: parent.id, ...filters };
  const comments = await Comment.find({ ...commentFilters, ...paginationFilter })
    .limit(first)
    .sort(sort);
  const edges = comments.map(comment => ({ cursor: comment.id, node: comment }));

  return {
    pageInfo: {
      hasNextPage: false,
      nasPreviousPage: false,
    },
    edges,
  };
}
