import { GraphQLString, GraphQLInt } from 'graphql';

const paginationArgs = {
  after: { type: GraphQLString, description: 'Paginate after this cursor.' },
  before: { type: GraphQLString, description: 'Paginate before this cursor.' },
  first: { type: GraphQLInt, description: 'Take the `first` first results.' },
  last: { type: GraphQLInt, description: 'Take the `last` last results.' },
};

export default paginationArgs;
