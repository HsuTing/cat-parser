'use strict';

import {
  GraphQLObjectType
} from 'graphql';

import landfill from './landfill';
import OIPList from './OIPList';

export default {
  description: '',
  resolve: () => ({}),
  type: new GraphQLObjectType({
    name: 'dataType',
    description: '',
    fields: () => ({
      landfill,
      OIPList
    })
  })
};
