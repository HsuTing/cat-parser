'use strict';

import {
  GraphQLObjectType
} from 'graphql';

import landfill from './landfill';
import OIPList from './OIPList';
import independentMusic from './independentMusic';

export default {
  description: '',
  resolve: () => ({}),
  type: new GraphQLObjectType({
    name: 'dataType',
    description: '',
    fields: () => ({
      landfill,
      OIPList,
      independentMusic
    })
  })
};
