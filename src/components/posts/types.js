import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import User from '../users/models';
import Comment from '../comments/models';
import { pageInfoType, paginationInputType } from '../../common/types';
import { commentsType } from '../comments/types';
import { userType } from '../users/types';
import { resolveIsLiked } from '../../common/resolvers';
import { connectionResolver } from '../../utils';

export const categoryType = new GraphQLEnumType({
  name: 'Category',
  values: {
    BOOK: { value: 'book' },
    MOVIE: { value: 'movie' },
    SHOW: { value: 'show' },
    GAME: { value: 'game' },
    SONG: { value: 'song' },
  },
});
export const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post recommending something.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the post.',
    },
    author: {
      type: new GraphQLNonNull(userType),
      description: 'The author of the post.',
      resolve: post => User.findOne({ _id: post.author }),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the post.',
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The body of the post.',
    },
    link: {
      type: GraphQLString,
      description: 'The link where one can get the stuff the post is recommending.',
    },
    likeCount: {
      type: GraphQLInt,
      description: 'The like count of the post.',
      resolve: post => post.getLikeCount(),
    },
    liked: {
      type: GraphQLBoolean,
      description: 'Is the post liked by the current user?',
      resolve: resolveIsLiked,
    },
    category: {
      type: new GraphQLNonNull(categoryType),
      description: 'The category of the recommendation.',
    },
    genre: {
      type: GraphQLString,
      description: 'The genre of the recommendation.',
    },
    tags: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'The tags of the post.',
    },
    comments: {
      type: commentsType,
      description: 'The comments of the post.',
      args: {
        sort: { type: GraphQLString },
        pagination: { type: paginationInputType },
      },
      resolve: connectionResolver(Comment, { hasParent: true }),
    },
    commentCount: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The comment count of the post.',
      resolve: post => post.getCommentCount(),
    },
  }),
});

const postEdgeType = new GraphQLObjectType({
  name: 'PostEdge',
  fields: () => ({
    cursor: { type: new GraphQLNonNull(GraphQLString) },
    node: { type: new GraphQLNonNull(postType) },
  }),
});

export const postsType = new GraphQLObjectType({
  name: 'Posts',
  description: 'A post list connection.',
  fields: () => ({
    pageInfo: {
      type: new GraphQLNonNull(pageInfoType),
      description: 'Pagination info.',
    },
    edges: {
      type: new GraphQLList(postEdgeType),
    },
  }),
});

export const postInputType = new GraphQLInputObjectType({
  name: 'PostInput',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The title of the post',
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The body of the post.',
    },
    category: {
      type: new GraphQLNonNull(categoryType),
      description: 'The category of the recommendation.',
    },
    genre: {
      type: GraphQLString,
      description: 'The genre of the recommendation.',
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'The tags of the post.',
    },
    link: {
      type: GraphQLString,
      description: 'The link where one can get the stuff the post is recommending.',
    },
  }),
});

export const postUpdateInputType = new GraphQLInputObjectType({
  name: 'PostUpdateInput',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'The title of the post',
    },
    body: {
      type: GraphQLString,
      description: 'The body of the post.',
    },
    category: {
      type: categoryType,
      description: 'The category of the recommendation.',
    },
    genre: {
      type: GraphQLString,
      description: 'The genre of the recommendation.',
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      description: 'The tags of the post.',
    },
    link: {
      type: GraphQLString,
      description: 'The link where one can get the stuff the post is recommending.',
    },
  }),
});

export const postFiltersType = new GraphQLInputObjectType({
  name: 'PostFilters',
  fields: () => ({
    category: { type: categoryType },
  }),
});
