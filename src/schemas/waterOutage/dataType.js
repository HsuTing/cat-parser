'use strict';

import {
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';

const {nodeInterface} = fields;

export const dataFields = {
  name: 'WaterOutage',
  description: 'This is the type of the WaterOutage.',
  fields: {
    data: {
      type: GraphQLString,
      description: 'This is the data of the WaterOutage.'
    }
  }
};

export default new GraphQLObjectType({
  ...dataFields,
  interfaces: [nodeInterface],
  fields: {
    ...dataFields.fields,
    id: globalIdField('WaterOutage')
  }
});
