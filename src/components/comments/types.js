import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import { resolveComments } from './resolvers';
import { userType } from '../users/types';
import { pageInfoType } from '../../common/types';
import { resolveIsLiked } from '../../common/resolvers';

export const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the comment.',
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the comment.',
    },
    author: {
      type: new GraphQLNonNull(userType),
      description: 'The author of the comment.',
    },
    likes: {
      type: GraphQLInt,
      description: 'The like count of the comment.',
      resolve: comment => comment.getLikeCount(),
    },
    liked: {
      type: GraphQLBoolean,
      description: 'Is the comment liked by the current user?',
      resolve: resolveIsLiked,
    },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(commentType)),
      description: 'The comments of the comment.',
      resolve: resolveComments,
    },
  }),
});

export const commentsType = new GraphQLObjectType({
  name: 'Comments',
  description: 'A comment list connection.',
  fields: () => ({
    pageInfo: {
      type: new GraphQLNonNull(pageInfoType),
      description: 'Pagination info.',
    },
    edges: {
      type: new GraphQLList(commentEdgeType),
    },
  }),
});

export const commentEdgeType = new GraphQLObjectType({
  name: 'CommentEdge',
  fields: () => ({
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: { type: new GraphQLNonNull(commentType) },
  }),
});
