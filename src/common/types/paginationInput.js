import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'PaginationInput',
  description: 'The PaginationInput type.',
  fields: () => ({
    first: { type: GraphQLInt },
    after: { type: GraphQLString },
  }),
});
