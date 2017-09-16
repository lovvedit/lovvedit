import { GraphQLError } from 'graphql';
import { always } from 'ramda';

import { loginRequired, checkUserIsAuthorOrThrow } from './permissions';

describe('loginRequired()', () => {
  it("should throw if user isn't logged in", () => {
    const resolver = jest.fn();
    const loginRequiredTest = loginRequired(resolver);
    const ctx = { user: null };
    expect(() => loginRequiredTest(null, null, ctx)).toThrow(GraphQLError);
  });

  it('should call the resolver if the user is logged in', () => {
    const resolver = jest.fn();
    const loginRequiredTest = loginRequired(resolver);
    const ctx = { user: { firstName: 'test' } };
    const args = [null, null, ctx, null];
    loginRequiredTest(...args);

    expect(resolver).toHaveBeenCalledWith(...args);
  });
});

describe('checkUserIsAuthorOrThrow()', () => {
  it('should throw if the user is not the author of the document', () => {
    const userId = 'user_id';
    const doc = { author: { equals: jest.fn(always(false)) } };
    const args = { doc, userId };
    expect(() => checkUserIsAuthorOrThrow(args)).toThrow(GraphQLError);
  });

  it('should not throw if the user is the author of the document', () => {
    const userId = 'user_id';
    const doc = { author: { equals: jest.fn(always(true)) } };
    const args = { doc, userId };
    expect(() => checkUserIsAuthorOrThrow(args)).not.toThrow(GraphQLError);
  });
});
