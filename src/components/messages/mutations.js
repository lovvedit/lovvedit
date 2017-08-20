import { GraphQLNonNull } from 'graphql';

import { messageType, messageInputType } from './types';
import resolveSendMessage from './resolvers';

export default {
  type: messageType,
  description: 'Send a message.',
  args: {
    message: { type: new GraphQLNonNull(messageInputType) },
  },
  resolve: resolveSendMessage,
};
