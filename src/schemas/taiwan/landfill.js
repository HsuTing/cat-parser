'use strict';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import firebase, {auth} from 'cat-utils/lib/firebaseInit';

auth();

export default {
  description: '行政院環保署 垃圾掩埋場資料',
  args: {
    names: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (parent, {names}) => new Promise((resolve, reject) => {
    firebase.database().ref('/taiwan/landfill').once('value')
      .then(snapshot => {
        const values = snapshot.val();
        const data = (names ? names : Object.keys(values))
          .map(key => values[key]);

        resolve(data);
      })
      .catch(err => reject(err))
  }),
  type: new GraphQLList(new GraphQLObjectType({
    description: '',
    name: 'landfill',
    fields: () => {
      const attributes = {
        name: '名稱',
        id: '管制編號',
        area: '興建面積公頃',
        operating_unit: '操作單位',
        build_organ: '興建主辦機關',
        start_date: '開工日期',
        address: '地址',
        end_date: '完工日期',
        type: '營運型態',
        supervise_organ: '營運監督機構',
        government_processing_capacity: '縣府提供年保證處理量公噸/年',
        company_processing_capacity: '一般事業廢棄物廠商保證量公噸/年',
        design_processing_capacity: '設計處理量公噸/日',
        environmental_assessment_date: '環評審查公告日期',
        update_time: '更新日期'
      };

      Object.keys(attributes)
        .forEach(key => {
          attributes[key] = {
            description: attributes[key],
            type: GraphQLString,
            resolve: parent => parent[key] || ''
          }
        });

      return attributes;
    }
  }))
};
