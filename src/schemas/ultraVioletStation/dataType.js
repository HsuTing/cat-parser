'use strict';

import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';
import {
  globalIdField,
  connectionArgs,
  connectionDefinitions,
  connectionFromArray
} from 'graphql-relay';

import fields, {updateTime} from 'schemas/fields';
import countyFields from 'schemas/countyFields';
import townshipFields from 'schemas/townshipFields';
import geoFields from 'schemas/geoFields';

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'ultraVioletStation',
    ({SiteEngName}) => `ultraVioletStation-${SiteEngName}`
  ),
  siteName: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測站名稱',
    resolve: ({SiteName}) => SiteName
  },
  siteEngName: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測站英文名稱',
    resolve: ({SiteEngName}) => SiteEngName
  },
  siteAddress: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測站地址',
    resolve: ({SiteAddress}) => SiteAddress
  },
  publishAgency: {
    type: new GraphQLNonNull(GraphQLString),
    description: '發佈機關',
    resolve: ({PublishAgency}) => PublishAgency
  },
  ...countyFields('County'),
  ...townshipFields('TownShip'),
  ...geoFields({lonKey: 'TWD97Lon', latKey: 'TWD97Lat'}),
};

export const dataType = new GraphQLObjectType({
  name: 'UltraVioletStation',
  description: '紫外線測站基本資料',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: ultraVioletStationConnection} =
  connectionDefinitions({name: 'ultraVioletStation', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'UltraVioletStationGroup',
  description: '紫外線測站基本資料集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('UltraVioletStationGroup'),
    updateTime: updateTime('UltraVioletStation'),
    ultraVioletStationGroup: {
      type: ultraVioletStationConnection,
      description: '紫外線測站基本資料集合',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || [], args)
    }
  }
});
