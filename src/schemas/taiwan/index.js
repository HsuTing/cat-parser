'use strict';

import {
  GraphQLObjectType
} from 'graphql';

import landfill from './landfill';

export default {
  description: 'open data of taiwan',
  resolve: () => ({}),
  type: new GraphQLObjectType({
    name: 'dataType',
    description: 'set of data',
    fields: () => ({
      landfill
    })
  })
};
