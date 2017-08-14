import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: new GraphQLNonNull(GraphQLID),
    username: new GraphQLNonNull(GraphQLString),
  }),
});
