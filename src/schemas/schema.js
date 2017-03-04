'use strict';

import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

import taiwan from './taiwan';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: () => ({
      taiwan
    })
  })
});
