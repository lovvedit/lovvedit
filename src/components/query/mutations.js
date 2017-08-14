import { GraphQLObjectType } from 'graphql';

import { createPost } from '../posts/mutations';

export default new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation',
  fields: () => ({
    createPost,
  }),
});
