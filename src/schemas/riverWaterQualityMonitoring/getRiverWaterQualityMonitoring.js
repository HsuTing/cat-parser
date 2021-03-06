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
import {
  args as riverArgs,
  resolve as riverResolve
} from 'schemas/riverFields';

import dataType from './dataType';
import {itemNamesList} from './constants';

export default {
  description: `
  環保署發布河川水質監測資料，包括河川污染指標（River Pollution Index, RPI）及主要污染物監測值等資料。

  由於監測資料需要每個月現場採樣、經實驗室檢測分析及資料品保品管程序，通常需要隔月提供資料

  資料來源: https://data.gov.tw/dataset/6078
  `,
  type: dataType,
  args: {
    ...geoArgs,
    ...countyArgs,
    ...townshipArgs,
    ...riverArgs,
    itemNames: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'ItemNamesInput',
        description: '測項名稱',
        values: parseObjEnumType(itemNamesList)
      }))
    }
  },
  resolve: async (_data, {itemNames, ...args}, ctx) => {
    let data = await fetch('RiverWaterQualityMonitoring');

    data = await geoResolve(data, {
      lonKey: 'TWD97lon',
      latKey: 'TWD97Lat'
    })(_data, args, ctx);
    data = await countyResolve(data, 'County')(_data, args, ctx);
    data = await townshipResolve(data, 'Township')(_data, args, ctx);
    data = await riverResolve(data, 'River')(_data, args, ctx);

    if(itemNames) {
      const itemNamesChiName = itemNames.map(key => itemNamesList[key]);

      data = {
        ...data,
        data: (data.data || /* istanbul ignore next */ []).filter(({ItemName}) => {
          return itemNamesChiName.includes(ItemName);
        })
      };
    }

    return data;
  }
};
