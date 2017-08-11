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

import fields from 'schemas/fields';

const {nodeInterface} = fields;

const dataType = new GraphQLObjectType({
  name: 'AirQualityMonitoringStation',
  description: '空氣品質監測站基本資料',
  interfaces: [nodeInterface],
  fields: {
    id: globalIdField('AirQualityMonitoringStation'),
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
      resolve: ({AreaName}) => AreaName
    },
    county: {
      type: GraphQLString,
      description: '縣市',
      resolve: ({County}) => County
    },
    township: {
      type: GraphQLString,
      description: '鄉鎮',
      resolve: ({Township}) => Township
    },
    siteAddress: {
      type: GraphQLString,
      description: '測站地址',
      resolve: ({SiteAddress}) => SiteAddress
    },
    siteType: {
      type: GraphQLString,
      description: '測站類型',
      resolve: ({SiteType}) => SiteType
    },
    // TODO
    lon: {
      type: GraphQLString,
      description: '經度',
      resolve: ({TWD97Lon}) => TWD97Lon
    },
    lat: {
      type: GraphQLString,
      description: '緯度',
      resolve: ({TWD97Lat}) => TWD97Lat
    }
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
    airQualityMonitoringStationGroup: {
      type: airQualityMonitoringStationConnection,
      description: '空氣品質監測站基本資料集合(type)',
      args: connectionArgs,
      resolve: (data, args) => connectionFromArray(data || [], args)
    }
  }
});
