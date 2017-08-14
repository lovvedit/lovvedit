import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment.',
  fields: () => ({
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The content of the comment.',
    },
    author: {
      type: GraphQLID,
      description: 'The author of the comment.',
    },
    score: {
      type: GraphQLInt,
      description: 'The score of the comment.',
    },
  }),
});
