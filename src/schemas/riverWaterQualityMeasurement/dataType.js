'use strict';

import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLObjectType
} from 'graphql';
import {
  globalIdField,
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay';

import notIncluded from 'utils/notIncluded';
import fields, {updateTime} from 'schemas/fields';
import geoFields from 'schemas/geoFields';
import countyFields from 'schemas/countyFields';
import townshipFields from 'schemas/townshipFields';

import riversList from 'constants/rivers';

const {nodeInterface} = fields;

export const dataFields = {
  id: globalIdField(
    'RiverWaterQualityMeasurement',
    ({SiteEngName}) => `RiverWaterQualityMeasurement-${SiteEngName}`
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
  river: {
    type: new GraphQLNonNull(GraphQLString),
    description: '河川名稱',
    resolve: ({River}) => {
      if(!Object.values(riversList).includes(River.replace(/\([\u4e00-\u9fa5]\)|本流/, ''))&&!River.includes('三峽河'))
        notIncluded(`[graphql] "${River}" is not in rivers list. `);

      return River;
    }
  },
  twd97tm2x: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'TWD97二度分帶X',
    resolve: ({TWD97TM2X}) => TWD97TM2X
  },
  twd97tm2y: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'TWD97二度分帶Y',
    resolve: ({TWD97TM2Y}) => TWD97TM2Y
  },
  siteAddress: {
    type: new GraphQLNonNull(GraphQLString),
    description: '測站位置描述',
    resolve: ({SiteAddress}) => SiteAddress
  },
  ...geoFields({lonKey: 'TWD97Lon', latKey: 'TWD97Lat'}),
  ...countyFields('County'),
  ...townshipFields('Township')
};
export const dataType = new GraphQLObjectType({
  name: 'RiverWaterQualityMeasurement',
  description: '河川水質測點基本資料',
  interfaces: [nodeInterface],
  fields: dataFields
});

const {connectionType: riverWaterQualityMeasurementConnection} =
  connectionDefinitions({name: 'riverWaterQualityMeasurement', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'RiverWaterQualityMeasurementGroup',
  description: '河川水質測點基本資料集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('RiverWaterQualityMeasurementGroup'),
    updateTime: updateTime('RiverWaterQualityMeasurement'),
    riverWaterQualityMeasurementGroup: {
      type: riverWaterQualityMeasurementConnection,
      description: '河川水質測點基本資料集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || /* istanbul ignore next */ [], args)
    }
  }
});
