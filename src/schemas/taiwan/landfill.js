'use strict';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import moment from 'moment';
import firebase, {auth} from 'cat-utils/lib/firebaseInit';

import {landfill_update_time} from 'utils/updateTime';
import getData from 'utilsTaiwan/landfill';

auth();

const update = (name, value) => new Promise((resolve, reject) => {
  const diff = (
    value.update_time ?
    moment().unix() - moment(value.update_time).unix() :
    landfill_update_time + 1
  );
  const needToUpdate = diff > landfill_update_time;

  if(needToUpdate)
    getData(name)
      .then(data => resolve(data))
      .catch(err => reject(err));
  else
    resolve(value || {});
});

export default {
  description: '行政院環保署 垃圾掩埋場資料',
  args: {
    name: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (parent, {name}) => new Promise((resolve, reject) => {
    firebase.database().ref('/taiwan/landfill').once('value')
      .then(snapshot => {
        const values = snapshot.val();
        const tasks = (name ? name : Object.keys(values))
          .map(key => update(key, values[key]));

        Promise.all(tasks)
          .then(data => resolve(data))
          .catch(err => reject(err));
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
