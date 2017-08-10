'use strict';

import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql';
import {mutationWithClientMutationId} from 'graphql-relay';

import dataType from './dataType';

export default mutationWithClientMutationId({
  name: 'Data',
  description: 'Modify the data of the Data.',
  inputFields: {
    data: {
      description: 'This is the args of the Data.',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  outputFields: {
    newData: {
      description: 'This is output data of the Data after modifying the Data.',
      type: dataType
    }
  },
  mutateAndGetPayload: (data, ctx) => ({
    newData: {
      data: 'mutation Data'
    }
  })
});
