import authenticate, { getToken } from './auth';

describe('getToken()', () => {
  it("should throw if the header doesn't have 2 parts", () => {
    const badHeader = 'bad_header';
    expect(() => getToken(badHeader)).toThrow();
  });

  it('should throw if the header has an invalid scheme', () => {
    const badHeader = 'bad_scheme token';
    expect(() => getToken(badHeader)).toThrow();
  });

  it('should return the token if the header has a valid format', () => {
    const token = 'token';
    const header = `Bearer ${token}`;
    expect(getToken(header)).toBe(token);
  });
});

describe('authenticate()', () => {
  it('should call the next middleware', async () => {
    const next = jest.fn();
    const ctx = { headers: { Authentication: 'header' }, state: {} };

    await authenticate(ctx, next);

    expect(next).toHaveBeenCalled();
  });

  test('`ctx.state.user` is not `undefined`', async () => {
    const next = jest.fn();
    const ctx = { headers: { Authentication: 'header' }, state: {} };

    await authenticate(ctx, next);

    expect(ctx.state.user).not.toBeUndefined();
  });

  test('`ctx.state.user` is null if header is invalid', async () => {
    const next = jest.fn();
    const ctx = { headers: { Authentication: 'bad_header' }, state: {} };

    await authenticate(ctx, next);

    expect(ctx.state.user).toBeNull();
  });

  test('`ctx.state.user` is null if token is invalid', async () => {
    const next = jest.fn();
    const ctx = { headers: { Authentication: 'Bearer bad_token' }, state: {} };

    await authenticate(ctx, next);

    expect(ctx.state.user).toBeNull();
  });
});
