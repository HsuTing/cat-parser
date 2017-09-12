'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import fields, {updateTime} from 'schemas/fields';
import countyFields from 'schemas/countyFields';
import geoFields from 'schemas/geoFields';

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'UltraVioletMonitoring',
    ({SiteName}) => `UltraVioletMonitoring-${SiteName}`
  ),
  siteName: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測站名稱',
    resolve: ({SiteName}) => SiteName
  },
  uVI: {
    type: new GraphQLNonNull(GraphQLString),
    description: '紫外線指數',
    resolve: ({UVI}) => UVI
  },
  publishAgency: {
    type: new GraphQLNonNull(GraphQLString),
    description: '發布機關',
    resolve: ({PublishAgency}) => PublishAgency
  },
  publishTime: {
    type: new GraphQLNonNull(GraphQLString),
    description: '發布時間',
    resolve: ({PublishTime}) => PublishTime
  },
  ...countyFields('County'),
  ...geoFields({lonKey: 'WGS84Lon', latKey: 'WGS84Lat'})
};

export const dataType = new GraphQLObjectType({
  name: 'UltraVioletMonitoring',
  description: '紫外線即時監測資料',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: ultraVioletMonitoringConnection} =
  connectionDefinitions({name: 'UltraVioletMonitoring', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'UltraVioletMonitoringGroup',
  description: '紫外線即時監測資料集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('UltraVioletMonitoringGroup'),
    updateTime: updateTime('UltraVioletMonitoringGroup'),
    ultraVioletMonitoringGroup: {
      type: ultraVioletMonitoringConnection,
      description: '紫外線即時監測資料集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || /* istanbul ignore next */ [], args)
    }
  }
});
