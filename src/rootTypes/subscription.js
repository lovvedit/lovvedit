/**
 * @overview
 * The root subscription GraphQL type definition.
 */

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'The root subscription.',
  fields: () => ({
    messageReceived: {
      type: GraphQLString,
      resolve: () => 'hola! ws',
    },
  }),
});
