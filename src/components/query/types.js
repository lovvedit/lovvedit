/**
 * @overview
 * The root query GraphQL object type definition.
 */

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    name: {
      type: GraphQLString,
    },
  },
});
