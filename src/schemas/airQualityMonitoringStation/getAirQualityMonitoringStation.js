'use strict';

import fetch from 'utils/fetch';
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
    ...townshipArgs
  },
  resolve: async (data, args, ctx) => {
    const geoData = await geoResolve(
      () => fetch(
        'AirQualityMonitoringStation',
        'http://opendata.epa.gov.tw/ws/Data/AQXSite/?$format=json'
      ), {
        latKey: 'TWD97Lat',
        lonKey: 'TWD97Lon'
      }
    )(data, args, ctx);
    const countyData = await countyResolve(
      () => geoData,
      'County'
    )(data, args, ctx);
    const townshipData = townshipResolve(
      () => countyData,
      'Township'
    )(data, args, ctx);

    return townshipData;
  }
};
