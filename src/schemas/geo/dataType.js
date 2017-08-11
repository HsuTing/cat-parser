'use strict';

import {
  GraphQLObjectType
} from 'graphql';
import {globalIdField} from 'graphql-relay';

import fields from 'schemas/fields';
import airQualityMonitoringStation from 'schemas/airQualityMonitoringStation/getAirQualityMonitoringStation';

const {nodeInterface} = fields;

export default new GraphQLObjectType({
  name: 'Geo',
  description: '與地理資訊相關資料集(type)',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('Geo'),
    airQualityMonitoringStation
  }
});
