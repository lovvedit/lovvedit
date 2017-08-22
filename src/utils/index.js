import { GraphQLError } from 'graphql';

import Like from '../components/likes/models';
import Comment from '../components/comments/models';

/**
 * Toggles like on a document.
 */
export async function toggleLike(userId) {
  await Like.toggle(this.id, userId);
  return this;
}

/**
 * Returns the like count of the document.
 */
export function getLikeCount() {
  return Like.where({ target: this.id }).count();
}

/**
 * Returns the comment count of the document.
 */
export function getCommentCount() {
  return Comment.where({ parent: this.id }).count();
}

/**
 * Wraps a resolver to require the user to be logged in.
 */
export function loginRequired(resolver) {
  return function wrapper(parent, args, ctx, info) {
    if (!ctx.user) {
      throw new GraphQLError('You must log in to perform this action.');
    }

    return resolver(parent, args, ctx, info);
  };
}

/**
 * A generic connection resolver following Relay's specification of pagination.
 */
export function connectionResolver(model, { hasParent = false, parentField = 'parent' } = {}) {
  return async function resolveDocumets(
    parent,
    { filters, sort, pagination: { first = 10, after } = {} },
  ) {
    const paginationFilter = after ? { _id: { $gt: after } } : null;
    const nodeFilters = hasParent ? { [parentField]: parent.id, ...filters } : { ...filters };
    const nodes = await model.find({ ...nodeFilters, ...paginationFilter }).limit(first).sort(sort);
    const edges = nodes.map(node => ({ cursor: node.id, node }));

    return {
      pageInfo: {
        hasNextPage: false,
        nasPreviousPage: false,
      },
      edges,
    };
  };
}

/**
 * Tries to get a document, if it doesn't exist, throws.
 */
export async function getDocumentOrThrow(model, id) {
  const doc = await model.findOne({ _id: id });

  if (!doc) {
    throw new GraphQLError(`The object with id ${id} does not exist.`);
  }

  return doc;
}

/**
 * Checks if the user id matches the field on the document. Throws if not.
 */
export function checkUserIsAuthorOrThrow({ doc, userId, field = 'author' }) {
  if (!doc[field].equals(userId)) {
    throw new GraphQLError("You don't have permissions to perform this action.");
  }
}
