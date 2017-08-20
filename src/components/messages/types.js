import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { pageInfoType } from '../../common/types';

export const messageType = new GraphQLObjectType({
  name: 'Message',
  description: 'The message type.',
  fields: () => ({
    subject: {
      description: 'The subject of the message',
      type: new GraphQLNonNull(GraphQLString),
    },
    from: {
      description: 'The sender of the message.',
      type: new GraphQLNonNull(GraphQLString),
    },
    to: {
      description: 'The receiver of the message.',
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      description: 'The body of the message.',
      type: GraphQLString,
    },
    dateSent: {
      description: 'The date of the message',
      type: GraphQLString,
    },
  }),
});

const messageEdge = new GraphQLObjectType({
  name: 'MessageEdge',
  fields: () => ({
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: { type: new GraphQLNonNull(messageType) },
  }),
});

export const messagesType = new GraphQLObjectType({
  name: 'Messages',
  description: 'A message list connection.',
  fields: () => ({
    pageInfo: {
      type: new GraphQLNonNull(pageInfoType),
      description: 'Pagination info.',
    },
    edges: {
      type: new GraphQLList(messageEdge),
    },
  }),
});

export const messageInputType = new GraphQLInputObjectType({
  name: 'MessageInput',
  description: 'The message input type.',
  fields: () => ({
    subject: {
      description: 'The subject of the message',
      type: new GraphQLNonNull(GraphQLString),
    },
    to: {
      description: 'The receiver of the message.',
      type: new GraphQLNonNull(GraphQLString),
    },
    body: {
      description: 'The body of the message.',
      type: GraphQLString,
    },
  }),
});
