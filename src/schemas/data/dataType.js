'use strict';

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

export const dataFields = {
  name: 'Data',
  description: 'This is the type of the Data.',
  fields: {
    data: {
      type: GraphQLString,
      description: 'This is the data of the Data.'
    }
  }
};

export default new GraphQLObjectType({
  ...dataFields,
  interfaces: [nodeInterface],
  fields: {
    ...dataFields.fields,
    id: globalIdField('Data')
  }
});
