'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import getFields from 'utils/getFields';

export default {
  description: '職業傷病防治中心名單',
  args: {
    names: {
      type: new GraphQLList(GraphQLString)
    },
    area: {
      type: GraphQLString
    }
  },
  resolve: (parent, {names, area}) => new Promise((resolve, reject) => {
    fs.readFile(path.resolve(process.cwd(), './public/taiwan/OIPList.json'), (getDataError, originValues = {}) => {
      if(getDataError)
        throw new Error(getDataError);

      const values = JSON.parse(originValues);
      const data = [];
      values.data.forEach(item => {
        const output = {};

        item['colum_1'].split('\t').forEach((value, index) => {
          let key = 'area';

          switch(index) {
            case 1:
              key = 'name';
              break;

            case 2:
              key = 'contact_person';
              break;

            case 3:
              key = 'contact_phone';
              break;

            case 4:
              key = 'address';
              break;
          }
          output[key] = value;
        });

        if(names && names.indexOf(output.name) === -1 ||
          area && output.area !== area)
          return;

        data.push(output);
      });
      resolve(data);
    });
  }),
  type: new GraphQLList(new GraphQLObjectType({
    description: '',
    name: 'OIPList',
    fields: () => getFields({
      area: '區域',
      name: '醫院名稱',
      contact_person: '聯絡人',
      contact_phone: '聯絡電話',
      address: '醫院地址'
    })
  }))
};
