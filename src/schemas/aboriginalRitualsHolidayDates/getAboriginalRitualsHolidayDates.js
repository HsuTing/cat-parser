'use strict';

import {
  GraphQLList,
  GraphQLEnumType
} from 'graphql';

import fetch from 'utils/fetch';
import parseObjEnumType from 'utils/parse-obj-enumType';

import dataType from './dataType';
import {ethnicsList} from './constants';

export default {
  description: `
  102年度原住民族歲時祭儀放假日期

  一、依據內政部於99年11月2日修正發布「紀念日及節日實施辦法」辦理公告原住民族歲時祭儀，各該原住民族放假1日。
  二、凡具有原住民身分者，都可以在所屬族群的歲時祭儀日，持戶籍謄本或戶口名簿等足資證明其族別之文件，向工作或就讀單位申請放假1日。
  三、有關阿美族、賽夏族及噶瑪蘭族，先行公告舉辦期間，日期確定後分別另行公告。

  資料來源：https://data.gov.tw/dataset/6081
  `,
  type: dataType,
  args: {
    ethnics: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'EthnicInput',
        description: '民族',
        values: parseObjEnumType(ethnicsList)
      }))
    }
  },
  resolve: async (_data, {ethnics}, ctx) => {
    let data = await fetch('AboriginalRitualsHolidayDates');

    data = {
      ...data,
      data: (data.data[0].result.records || /* istanbul ignore next */ [])
    };

    if(ethnics) {
      const ethnicsChiName = ethnics.map(key => ethnicsList[key]);

      data = {
        ...data,
        data: (data.data || /* istanbul ignore next */ []).filter(({Ethnic}) => {
          return ethnicsChiName.includes(Ethnic);
        })
      };
    }

    return data;
  }
};
