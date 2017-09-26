'use strict';

import {
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType
} from 'graphql';

import fetch from 'utils/fetch';
import notIncluded from 'utils/notIncluded';
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
    seqs: {
      type: GraphQLInt
    },
    ethnics: {
      type: new GraphQLList(new GraphQLEnumType({
        name: 'EthnicInput',
        description: '民族',
        values: parseObjEnumType(ethnicsList)
      }))
    }
  },
  resolve: async (_data, {seqs, ethnics}, ctx) => {
    let data = await fetch(
      'AboriginalRitualsHolidayDates',
      'http://lod2.apc.gov.tw/API/v1/dump/datastore/A53000000A-000001-001'
    );
    data = {
      ...data,
      data: (data.data[0].result.records || [])
    };

    if(seqs) {
      if(seqs > 17 || seqs < 1)
        notIncluded(`[graphql] "${seqs}" is not in 1~17.`);

      data = {
        ...data,
        data: (data.data || []).filter(({Seq}) => {
            return seqs == Seq;
        })
      };
    }

    if(ethnics) {
      const ethnicsChiName = ethnics.map(key => ethnicsList[key]);

      data = {
        ...data,
        data: (data.data || []).filter(({Ethnic}) => {
          return ethnicsChiName.includes(Ethnic);
        })
      };
    }

    return data;
  }
};
