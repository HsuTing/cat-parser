'use strict';

import {
  GraphQLList,
  GraphQLEnumType
} from 'graphql';

import fetch from 'utils/fetch';
import parseObjEnumType from 'utils/parse-obj-enumType';

import dataType from './dataType';

import {namesList, shopsList} from './constants';

export default {
  description: `
  原住民十大特色美食

  依行政院原住民族委員會辦理之「2010原住民嚴選十大獻禮」甄選活動，評選出原住民十大特色美食，提供國內外遊客在造訪各地原鄉時享原味之參考。

  資料來源：https://data.gov.tw/dataset/6083
  `,
  type: dataType,
  args: {
    names: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'NameInput',
        description: '美食名稱',
        values: parseObjEnumType(namesList)
      }))
    },
    shops: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'ShopInput',
        description: '店家',
        values: parseObjEnumType(shopsList)
      }))
    }
  },
  resolve: async (_data, {names, shops}, ctx) => {
    let data = await fetch('AboriginalTenCharacteristicsFoods');

    data = {
      ...data,
      data: (data.data[0].result.records || /* istanbul ignore next */ [])
    };

    if(names) {
      const namesChiName = names.map(key => namesList[key]);

      data = {
        ...data,
        data: (data.data || /* istanbul ignore next */ []).filter(({name}) => {
          return namesChiName.includes(name);
        })
      };
    }

    if(shops) {
      const shopsChiName = shops.map(key => shopsList[key]);

      data = {
        ...data,
        data: (data.data || /* istanbul ignore next */ []).filter(({shop}) => {
          return shopsChiName.includes(shop);
        })
      };
    }

    return data;
  }
};
