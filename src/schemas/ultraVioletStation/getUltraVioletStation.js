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
    ...townshipArgs
  },
  resolve: async (_data, {...args}, ctx) => {
    let data = await fetch('UltraVioletStation');

    data = await geoResolve(data, {
      latKey: 'TWD97Lat',
      lonKey: 'TWD97Lon'
    })(_data, args, ctx);
    data = await countyResolve(data, 'County')(_data, args, ctx);
    data = await townshipResolve(data, 'Township')(_data, args, ctx);

    return data;
  }
};
