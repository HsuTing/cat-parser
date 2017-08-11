'use strict';

import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat
} from 'graphql';

export const args = {
  geo: {
    type: new GraphQLInputObjectType({
      name: 'GeoInput',
      description: '經緯度篩選地理位置',
      fields: {
        lon: {
          type: new GraphQLNonNull(GraphQLFloat),
          description: '經度'
        },
        lat: {
          type: new GraphQLNonNull(GraphQLFloat),
          description: '緯度'
        },
        range: {
          type: new GraphQLNonNull(GraphQLFloat),
          description: '範圍(單位: 公尺)'
        }
      }
    })
  }
};
