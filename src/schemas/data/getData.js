'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

import dataType from './dataType';

export default {
  description: 'Get the data of the Data.',
  type: dataType,
  args: {
    input: {
      description: 'This is the args of the Data.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: () => ({data: 'query Data'})
};
