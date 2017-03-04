'use strict';

import {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import firebase from 'utils/firebase';

export default {
  description: 'Array of landfill data(行政院環保署 垃圾掩埋場資料)',
  args: {
    name: {
      type: new GraphQLList(GraphQLString)
    }
  },
  resolve: (parent, {name}) => new Promise((resolve, reject) => {
    firebase.database().ref('/taiwan/landfill').once('value')
      .then(snapshot => {
        const values = snapshot.val();

        if(name)
          resolve(name.map(key => values[key] || {}));
        else
          resolve(Object.keys(values).map(key => values[key] || {}));
      })
      .catch(err => reject(err))
  }),
  type: new GraphQLList(new GraphQLObjectType({
    description: 'One of landfill data',
    name: 'landfill',
    fields: () => {
      const attributes = {
        name: 'name of landfill(名稱)',
        id: 'id of landfill(管制編號)',
        area: 'area of landfill(興建面積(公頃))',
        operating_unit: 'operating unit of landfill(操作單位)',
        build_organ: 'build organ of landfill(興建主辦機關)',
        start_date: 'start date of landfill(開工日期)',
        address: 'address of landfill(地址)',
        end_date: 'end date of landfill(完工日期)',
        type: 'type of landfill(營運型態)',
        supervise_organ: 'supervise organ of landfill(營運監督機構)',
        government_processing_capacity: 'government processing capacity of landfill(縣府提供年保證處理量(公噸/年))',
        company_processing_capacity: 'company processing capacity of landfill(一般事業廢棄物廠商保證量(公噸/年))',
        design_processing_capacity: 'design processing capacity of landfill(設計處理量(公噸/日))',
        environmental_assessment_date: 'environmental assessment date of landfill(環評審查公告日期)',
        update_time: 'update time of landfill(更新日期)'
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
