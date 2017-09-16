import { GraphQLError } from 'graphql';

/**
 * Wraps a resolver to require the user to be logged in.
 */
export const loginRequired = resolver => (parent, args, ctx, info) => {
  if (!ctx.user) {
    throw new GraphQLError('You must log in to perform this action.');
  }

  return resolver(parent, args, ctx, info);
};

/**
 * Checks if the user id matches the field on the document. Throws if not.
 */
export const checkUserIsAuthorOrThrow = ({ doc, userId, field = 'author' }) => {
  if (!doc[field].equals(userId)) {
    throw new GraphQLError("You don't have permissions to perform this action.");
  }
};
