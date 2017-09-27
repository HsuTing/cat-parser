'use strict';

import fetch from 'utils/fetch';

import dataType from './dataType';

export default {
  description: `
  原住民十大特色美食

  依行政院原住民族委員會辦理之「2010原住民嚴選十大獻禮」甄選活動，評選出原住民十大特色美食，提供國內外遊客在造訪各地原鄉時享原味之參考。

  資料來源：https://data.gov.tw/dataset/6083
  `,
  type: dataType,
  args: {
  },
  resolve: async (_data, args, ctx) => {
    let data = await fetch('AboriginalTenCharacteristicsFoods');

    data = {
      ...data,
      data: (data.data[0].result.records || /* istanbul ignore next */ [])
    };

    return data;
  }
};
