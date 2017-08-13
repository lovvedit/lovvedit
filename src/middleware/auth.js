import jwt from 'jsonwebtoken';

import User from '../components/users/models';

/**
 * @description
 * Return the token part of the `Authentication` header.
 *
 * @param {string} [header=''] - The `Authentication` header.
 * @returns {string} The token
 */
export function getToken(header = '') {
  const parts = header.split(' ');
  if (parts.length !== 2) {
    throw new Error('Invalid Authorization header');
  }

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/.test(scheme)) {
    throw new Error('Invalid Authorization header');
  }

  return token;
}

const { JWT_SECRET } = process.env;

/**
 *
 *
 * @export
 * @param {Object} ctx - The Koa context object.
 * @param {Function} next - Next middleware function.
 * @returns
 */
export default async function authenticate(ctx, next) {
  const { Authentication: authHeader } = ctx.headers;
  let token;
  try {
    token = getToken(authHeader);
  } catch (e) {
    ctx.state.user = null;
    return next();
  }

  try {
    const { payload: { id } } = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: id });

    ctx.state.user = user || null;

    return next();
  } catch (e) {
    ctx.state.user = null;
    return next();
  }
}
