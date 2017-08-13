'use strict';

import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLFloat
} from 'graphql';
import {getDistance} from 'geolib';

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

export const resolve = (
  getData = () => {},
  keys = {
    latKey: 'lat',
    lonKey: 'lon'
  }
) => async (parent, args, ctx)  => {
  try {
    const {geo} = Object.keys(args).length === 0 ? parent : args;
    const {latKey, lonKey} = keys;
    const {updateTime, data} = await getData(parent, args, ctx);

    if(geo) {
      const {lon, lat, range} = geo;

      return {
        updateTime,
        data: data.filter(d => getDistance(
          {latitude: lat, longitude: lon},
          {latitude: parseFloat(d[latKey]), longitude: parseFloat(d[lonKey])}
        ) < range)
      };
    }

    return {
      updateTime,
      data
    };
  } catch(e) {
    console.log(e);
    return [];
  }
};
