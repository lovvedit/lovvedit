import { GraphQLObjectType, GraphQLInputObjectType, GraphQLString } from 'graphql';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'The Profile type.',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

export const profileInputType = new GraphQLInputObjectType({
  name: 'ProfileInput',
  description: 'The ProfileInput type.',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});
