'use strict';

import fetch from 'node-fetch';
import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import {getFields} from 'cat-utils/lib/graphql-utils';

import geo from 'schemas/geo';
import filterGeo from 'utils/filterGeo';

export default (name, url, description) => ({
  description,
  args: {
    geo: geo(`tw_${name}`, 'chi'),
    UIDs: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (parent, {geo, UIDs}) => new Promise(resolve => {
    const geoValue = parent.geo || geo;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const output = [];

        data.forEach(item => {
          if(UIDs && UIDs.indexOf(item.UID) === -1)
            return;

          if(geoValue) {
            let showInfo = [];

            item.showInfo.forEach(d => {
              const check = filterGeo({
                latitude: d.latitude,
                longitude: d.longitude
              }, geoValue);

              if(check)
                showInfo.push(d);
            });

            if(showInfo.length === 0)
              return;
            else
              item.showInfo = showInfo;
          }

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
