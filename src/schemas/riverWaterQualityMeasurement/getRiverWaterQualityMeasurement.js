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
import {
  args as riverArgs,
  resolve as riverResolve
} from 'schemas/riverFields';

import dataType from './dataType';

export default {
  description: `
  河川水質測點基本資料

  資料來源：https://data.gov.tw/dataset/6079
  `,
  type: dataType,
  args: {
    ...geoArgs,
    ...countyArgs,
    ...townshipArgs,
    ...riverArgs
  },
  resolve: async (_data, {...args}, ctx) => {
    let data = await fetch(
      'RiverWaterQualityMeasurement',
      'http://opendata.epa.gov.tw/ws/Data/WQX/?$format=json'
    );

    data = await geoResolve(data, {
      latKey: 'TWD97Lat',
      lonKey: 'TWD97Lon'
    })(_data, args, ctx);
    data = await countyResolve(data, 'County')(_data, args, ctx);
    data = await townshipResolve(data, 'Township')(_data, args, ctx);
    data = await riverResolve(data, 'River')(_data, args, ctx);

    return data;
  }
};
