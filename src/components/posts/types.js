import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import commentType from '../comment/types';

export default new GraphQLObjectType({
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
    score: {
      type: GraphQLInt,
      description: 'The score of the post.',
    },
    comments: {
      type: new GraphQLList(commentType),
      description: 'The comments of the post.',
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
