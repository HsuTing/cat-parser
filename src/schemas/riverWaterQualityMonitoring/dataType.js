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

import notIncluded from 'utils/notIncluded';
import fields, {updateTime} from 'schemas/fields';
import countyFields from 'schemas/countyFields';
import townshipFields from 'schemas/townshipFields';
import geoFields from 'schemas/geoFields';
import riverFields from 'schemas/riverFields';

import {itemNamesList} from './constants';
const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'RiverWaterQualityMonitoring',
    ({SiteEngName}) => `RiverWaterQualityMonitoring-${SiteEngName}`
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
  basin: {
    type: new GraphQLNonNull(GraphQLString),
    description: '流域名稱',
    resolve: ({Basin}) => Basin
  },
  twd97tm2x: {
    type: new GraphQLNonNull(GraphQLString),
    decription: 'TWD97二度分帶X',
    resolve: ({TWD97TM2X}) => TWD97TM2X
  },
  twd97tm2y: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'TWD97二度分帶Y',
    resolve: ({TWD97TM2Y}) => TWD97TM2Y
  },
  sampleDate: {
    type: new GraphQLNonNull(GraphQLString),
    description: '採樣日期',
    resolve: ({SampleDate}) => SampleDate
  },
  itemName: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測項名稱',
    resolve: ({ItemName}) => {
      if(!Object.values(itemNamesList).includes(ItemName))
        notIncluded(`[graphql] "${ItemName}" is not in itemNames list.`);

      return ItemName;
    }
  },
  itemEngName: {
    type: new GraphQLNonNull(GraphQLString),
    decription: '測項英文名稱',
    resolve: ({ItemEngName}) => ItemEngName
  },
  itemEngAbbreviation: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測項英文簡稱',
    resolve: ({ItemEngAbbreviation}) => ItemEngAbbreviation
  },
  itemValue: {
    type: new GraphQLNonNull(GraphQLString),
    description: '監測值',
    resolve: ({ItemValue}) => ItemValue
  },
  itemUnit: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測項單位',
    resolve: ({ItemUnit}) =>ItemUnit
  },

  ...countyFields('County'),
  ...townshipFields('Township'),
  ...geoFields({lonKey: 'TWD97Lon', latKey: 'TWD97Lat'}),
  ...riverFields('River')
};

export const dataType = new GraphQLObjectType({
  name: 'RiverWaterQualityMonitoring',
  description: '河川水質監測資料',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: riverWaterQualityMonitoringConnection} =
  connectionDefinitions({name: 'riverWaterQualityMonitoring', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'RiverWaterQualityMonitoringGroup',
  description: '河川水質監測資料集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('RiverWaterQualityMonitoringGroup'),
    updateTime: updateTime('RiverWaterQualityMonitoring'),
    riverWaterQualityMonitoringGroup: {
      type: riverWaterQualityMonitoringConnection,
      description: '河川水質監測資料集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || [], args)
    }
  }
}); 
