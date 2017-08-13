'use strict';

import {
  GraphQLString
} from 'graphql';
import {
  nodeDefinitions,
  fromGlobalId
} from 'graphql-relay';
import moment from 'moment';

export default nodeDefinitions(
  (globalId, ctx) => {
    // get data from db with type and other information in ctx
    const {type} = fromGlobalId(globalId);

    switch(type) {
      default: return null;
    }
  }, obj => {
    // return the schema which is interfaced Node.
    return null;
  }
);

export const updateTime = (name = 'data') => ({
  type: GraphQLString,
  description: '更新時間',
  args: {
    updateTimeFormat: {
      type: GraphQLString,
      description: '更新時間顯示格式'
    }
  },
  resolve: ({updateTime}, {updateTimeFormat}) => (
    updateTimeFormat ?
      moment(updateTime).format(updateTimeFormat) :
      moment(updateTime).format('MMMM Do YYYY, HH:mm:ss')
  )
});
