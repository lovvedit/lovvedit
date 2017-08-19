import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'PageInfo',
  description: 'Pagination info.',
  fields: () => ({
    hasNextPage: {
      type: GraphQLBoolean,
      description: 'Boolean describing if the connection has a next page.',
    },
    hasPreviousPage: {
      type: GraphQLBoolean,
      description: 'Boolean describing if the connection has a previous page.',
    },
  }),
});
