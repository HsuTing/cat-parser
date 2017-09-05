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
  紫外線測站基本資料
  
  環保署和中央氣象局設於全國紫外線測站基本資料

  資料來源：http://data.gov.tw/node/6077
  `,
  type: dataType,
  args: {
    ...geoArgs,
    ...countyArgs,
    ...townshipArgs,
  },
  resolve: async (_data, {...args}, ctx) => {
    const data = await fetch(
      'UltraVioletStation',
      'http://opendata.epa.gov.tw/ws/Data/UVSite/?$format=json'
    );
    const geoData = await geoResolve(data, {
      latKey: 'TWD97Lat',
      lonKey: 'TWD97Lon'
    })(_data, args, ctx);
    const countyData = await countyResolve(geoData, 'County')(_data, args, ctx);
    let newData = await townshipResolve(countyData, 'Township')(_data, args, ctx);

    return newData;
  }
};
