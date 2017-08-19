import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import User from '../users/models';
import { pageInfoType } from '../../common/types';
import commentType from '../comment/types';
import { userType } from '../users/types';
import { resolveIsLiked } from '../../common/resolvers';

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
      type: GraphQLString,
      description: 'The body of the post.',
    },
    link: {
      type: GraphQLString,
      description: 'The link where one can get the stuff the post is recommending.',
    },
    likes: {
      type: GraphQLInt,
      description: 'The like quantity of the post.',
      resolve: post => post.getLikeCount(),
    },
    liked: {
      type: GraphQLBoolean,
      description: 'Is the post liked by the current user?',
      resolve: resolveIsLiked,
    },
    comments: {
      type: new GraphQLNonNull(new GraphQLList(commentType)),
      description: 'The comments of the post.',
    },
  }),
});

const postEdge = new GraphQLObjectType({
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
      type: new GraphQLList(postEdge),
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
  }),
});
