'use strict';

import {getDistance} from 'geolib';

import fetch from 'utils/fetch';
import {args as geoArgs} from 'schemas/geo/definitions';

import dataType from './dataType';

export default {
  description: `
  空氣品質監測站基本資料

  1.環保署設於全國空氣品質監測站之基本資料；包括測站名稱、測站類別、座標、地址等。

  2.測站位置圖層，以SHP圖層打包zip檔，包含DBF、SHP、SHX等地理圖資，供地理資訊系統套圖

  資料來源：http://data.gov.tw/node/6075
  `,
  type: dataType,
  args: geoArgs,
  resolve: async (parent, args) => {
    const {geo} = parent || args;
    try {
      const data = await fetch(
        'AirQualityMonitoringStation',
        'http://opendata.epa.gov.tw/ws/Data/AQXSite/?$format=json'
      );

      if(geo) {
        const {lon, lat, range} = geo;

        return data.filter(({TWD97Lon, TWD97Lat}) => {
          return getDistance(
            {latitude: lat, longitude: lon},
            {latitude: parseFloat(TWD97Lat), longitude: parseFloat(TWD97Lon)}
          ) < range;
        });
      }

      return data;
    } catch(e) {
      console.log(e);
      return [];
    }
  }
};
