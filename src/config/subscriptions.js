import jwt from 'jsonwebtoken';
import { PubSub } from 'graphql-subscriptions';

import User from '../components/users/models';

export const pubsub = new PubSub();

const { JWT_SECRET } = process.env;

export async function subscriptionServerOnConnect(connectionParams) {
  if (!connectionParams.authToken) {
    return { user: null };
  }

  const { sub } = jwt.verify(connectionParams.authToken, JWT_SECRET);

  const user = await User.findById(sub);

  return { user };
}
