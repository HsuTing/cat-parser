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

import dataType from './dataType';

export default {
  description: `
  紫外線即時監測資料

  環保署和中央氣象局設於全國紫外線測站每小時發布之紫外線監測資料（環保署及中央氣象局資料已整合成1個檔)

  資料來源：http://data.gov.tw/dataset/6076
  `,
  type: dataType,
  args: {
    ...geoArgs,
    ...countyArgs
  },
  resolve: async (_data, {...args}, ctx) => {
    let data = await fetch(
      'UltraVioletMonitoring',
      'http://opendata.epa.gov.tw/ws/Data/UV/?$format=json'
    );

    data = await geoResolve(data, {
      latKey: 'WGS84Lat',
      lonKey: 'WGS84Lon'
    })(_data, args, ctx);
    data = await countyResolve(data, 'County')(_data, args, ctx);

    return data;
  }
};
