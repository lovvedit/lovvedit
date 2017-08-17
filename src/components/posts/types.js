import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import pageInfoType from '../../commonTypes/pageInfo';
import commentType from '../comment/types';

export const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A post recommending something.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the post.',
    },
    author: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The author of the post.',
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
    },
    comments: {
      type: new GraphQLList(commentType),
      description: 'The comments of the post.',
    },
  }),
});

const postEdge = new GraphQLObjectType({
  name: 'PostEdge',
  fields: () => ({
    cursor: {
      type: GraphQLString,
    },
    node: { type: postType },
  }),
});

export const postsType = new GraphQLObjectType({
  name: 'Posts',
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
