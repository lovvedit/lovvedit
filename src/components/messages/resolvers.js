import { GraphQLError } from 'graphql';

import Message from './models';

export default async function resolveSendMessage(root, { message }, { user }) {
  if (!user) {
    throw new GraphQLError('You must be logged in to send a message.');
  }

  if (user.id === message.to) {
    throw new GraphQLError('You cannot send a message to yourself.');
  }

  return Message.create({ from: user.id, ...message });
}
