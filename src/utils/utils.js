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
export function getCommentCount(parentField = 'post') {
  return Comment.where({ [parentField]: this.id }).count();
}

/**
 * A generic connection resolver following Relay's specification of pagination.
 */
export function connectionResolver(model, { hasParent = false, parentField } = {}) {
  return async function resolveDocumets(
    parent,
    { filters, sort, pagination: { first = 10, after } = {} },
  ) {
    const paginationFilter = after ? { _id: { $gt: after } } : null;
    const nodeFilters = hasParent ? { [parentField]: parent.id, ...filters } : { ...filters };
    const nodes = await model
      .find({ ...nodeFilters, ...paginationFilter })
      .limit(first)
      .sort(sort);
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
  const doc = await model.findById(id);

  if (!doc) {
    throw new GraphQLError(`The object with id ${id} does not exist.`);
  }

  return doc;
}
