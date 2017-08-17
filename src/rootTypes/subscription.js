/**
 * @overview
 * The root subscription GraphQL type definition.
 */

import { GraphQLObjectType } from 'graphql';

export default new GraphQLObjectType({
  name: 'Subscription',
  description: 'The root subscription.',
  fields: () => ({}),
});
