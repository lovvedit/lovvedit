import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import Comment from './models';
import Post from '../posts/models';
import { userType } from '../users/types';
import { postType } from '../posts/types';
import { pageInfoType, paginationInputType } from '../../common/types';
import { resolveIsLiked } from '../../common/resolvers';
import { connectionResolver } from '../../utils';

export const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the comment.',
    },
    post: {
      type: new GraphQLNonNull(postType),
      description: 'The post of the comment',
      resolve: ({ post }) => Post.findById(post),
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
      // eslint-disable-next-line no-use-before-define
      type: commentsType,
      description: 'The comments of the comment.',
      args: {
        sort: { type: GraphQLString },
        pagination: { type: paginationInputType },
      },
      resolve: connectionResolver(Comment, { hasParent: true, parentField: 'parentComment' }),
    },
    commentCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The comment count of the comment.',
      resolve: comment => comment.getCommentCount('parentComment'),
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

export const commentInputType = new GraphQLInputObjectType({
  name: 'CommentInput',
  description: '',
  fields: () => ({
    body: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const commentUpdateInputType = new GraphQLInputObjectType({
  name: 'CommentUpdateInput',
  description: '',
  fields: () => ({
    body: { type: GraphQLString },
  }),
});
