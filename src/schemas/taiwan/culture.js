'use strict';

import fetch from 'node-fetch';
import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import {getFields} from 'cat-utils/lib/graphql-utils';

export default (name, url, description) => ({
  description,
  args: {
    UIDs: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (parent, {UIDs}) => new Promise(resolve => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const output = [];

        data.forEach(item => {
          if(UIDs && UIDs.indexOf(item.UID) === -1)
            return;

          output.push(item);
        });
        resolve(output)
      })
      .catch(err => resolve([]));
  }),
  type: new GraphQLList(new GraphQLObjectType({
    description,
    name,
    fields: () => getFields({
      version: '版本',
      UID: '編碼',
      title: '標題',
      category: '種類',
      showInfo: [{
        description: '表演資訊',
        name: `${name}_showInfo`,
        fields: () => getFields({
          time: '時間',
          location: '地點',
          locationName: '地點名字',
          onSales: '是否售票中',
          price: '票價',
          latitude: '緯度',
          longitude: '經度',
          endTime: '結束時間'
        })
      }],
      showUnit: '表演團體',
      discountInfo: '',
      descriptionFilterHtml: '簡介',
      imageUrl: '圖片連結',
      masterUnit: '',
      subUnit: '',
      supportUnit: '',
      otherUnit: '',
      webSales: '售票網站',
      sourceWebPromote: '',
      comment: '評論',
      editModifyDate: '',
      sourceWebName: '',
      startDate: '開始日期',
      endDate: '結束日期',
      status: '狀態',
      total: '總數',
      hitRate: ''
    })
  }))
});
