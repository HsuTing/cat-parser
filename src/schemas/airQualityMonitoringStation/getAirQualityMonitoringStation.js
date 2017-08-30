'use strict';

import {
  GraphQLEnumType,
  GraphQLList
} from 'graphql';

import fetch from 'utils/fetch';
import parseObjEnumType from 'utils/parse-obj-enumType';
import {
  args as geoArgs,
  resolve as geoResolve
} from 'schemas/geoFields';
import {
  args as countyArgs,
  resolve as countyResolve
} from 'schemas/countyFields';
import {
  args as townshipArgs,
  resolve as townshipResolve
} from 'schemas/townshipFields';

import dataType from './dataType';
import {areaNamesList, siteTypesList} from './constants';

export default {
  description: `
  空氣品質監測站基本資料

  1.環保署設於全國空氣品質監測站之基本資料；包括測站名稱、測站類別、座標、地址等。

  2.測站位置圖層，以SHP圖層打包zip檔，包含DBF、SHP、SHX等地理圖資，供地理資訊系統套圖

  資料來源：http://data.gov.tw/node/6075
  `,
  type: dataType,
  args: {
    ...geoArgs,
    ...countyArgs,
    ...townshipArgs,
    areaNames: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'AreaNamesInput',
        description: '空品區',
        values: parseObjEnumType(areaNamesList)
      }))
    },
    siteTypes: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'SiteTypesInput',
        description: '測站類型',
        values: parseObjEnumType(siteTypesList)
      }))
    }
  },
  resolve: async (_data, {areaNames, siteTypes, ...args}, ctx) => {
    const data = await fetch(
      'AirQualityMonitoringStation',
      'http://opendata.epa.gov.tw/ws/Data/AQXSite/?$format=json'
    );
    const geoData = await geoResolve(data, {
      latKey: 'TWD97Lat',
      lonKey: 'TWD97Lon'
    })(_data, args, ctx);
    const countyData = await countyResolve(geoData, 'County')(_data, args, ctx);
    let newData = await townshipResolve(countyData, 'Township')(_data, args, ctx);

    if(areaNames) {
      const areaNamesChiName = areaNames.map(key => areaNamesList[key]);

      newData = {
        ...newData,
        data: (newData.data || /* istanbul ignore next */ []).filter(({AreaName}) => {
          return areaNamesChiName.includes(AreaName);
        })
      };
    }

    if(siteTypes) {
      const siteTypesChiName = siteTypes.map(key => siteTypesList[key]);

      newData = {
        ...newData,
        data: (newData.data || /* istanbul ignore next */ []).filter(({SiteType}) => {
          return siteTypesChiName.includes(SiteType);
        })
      };
    }

    return newData;
  }
};
