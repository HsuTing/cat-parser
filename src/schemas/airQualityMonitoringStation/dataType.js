'use strict';

import {
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

import {areaNamesList, siteTypesList} from './constants';

const {nodeInterface} = fields;

export const dataType = new GraphQLObjectType({
  name: 'AirQualityMonitoringStation',
  description: '空氣品質監測站基本資料',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField(
      'AirQualityMonitoringStation',
      ({SiteEngName}) => `AirQualityMonitoringStation-${SiteEngName}`
    ),
    siteName: {
      type: GraphQLString,
      description: '測站名稱',
      resolve: ({SiteName}) => SiteName
    },
    siteEngName: {
      type: GraphQLString,
      description: '測站英文名稱',
      resolve: ({SiteEngName}) => SiteEngName
    },
    areaName: {
      type: GraphQLString,
      description: '空品區',
      resolve: ({AreaName}) => {
        if(!Object.values(areaNamesList).includes(AreaName))
          notIncluded(`[graphql] "${AreaName}" is not in areaNames list.`);

        return AreaName;
      }
    },
    siteAddress: {
      type: GraphQLString,
      description: '測站地址',
      resolve: ({SiteAddress}) => SiteAddress
    },
    siteType: {
      type: GraphQLString,
      description: '測站類型',
      resolve: ({SiteType}) => {
        if(!Object.values(siteTypesList).includes(SiteType))
          notIncluded(`[graphql] "${SiteType}" is not in siteTypes list.`);

        return SiteType;
      }
    },
    ...countyFields('County'),
    ...townshipFields('Township'),
    ...geoFields({lonKey: 'TWD97Lon', latKey: 'TWD97Lat'})
  }
});

const {connectionType: airQualityMonitoringStationConnection} =
  connectionDefinitions({name: 'airQualityMonitoringStation', nodeType: dataType});

export default new GraphQLObjectType({
  name: 'AirQualityMonitoringStationGroup',
  description: '空氣品質監測站基本資料集合',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('AirQualityMonitoringStationGroup'),
    updateTime: updateTime('AirQualityMonitoringStation'),
    airQualityMonitoringStationGroup: {
      type: airQualityMonitoringStationConnection,
      description: '空氣品質監測站基本資料集合(type)',
      args: connectionArgs,
      resolve: ({data}, args) => connectionFromArray(data || [], args)
    }
  }
});
