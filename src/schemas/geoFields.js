'use strict';

import {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLFloat
} from 'graphql';
import {getDistance} from 'geolib';
import {sexagesimal2decimal} from 'geolib';

const replaceComma = word => (
  word.replace(/,/, '° ')
    .replace(/,/, '\' ')
);

export default ({lonKey, latKey}) => ({
  lon: {
    type: new GraphQLNonNull(GraphQLFloat),
    description: '經度',
    resolve: data => (/,/g).test(data[lonKey]) ?
      sexagesimal2decimal(`${replaceComma(data[lonKey])}" N`) :
      parseFloat(data[lonKey])
  },
  lat: {
    type: new GraphQLNonNull(GraphQLFloat),
    description: '緯度',
    resolve: data => (/,/g).test(data[latKey]) ?
      sexagesimal2decimal(`${replaceComma(data[latKey])}" N`) :
      parseFloat(data[latKey])
  }
});

export const args = {
  geo: {
    type: new GraphQLList(new GraphQLInputObjectType({
      name: 'GeoInput',
      description: '經緯度',
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
    }))
  }
};

export const resolve = (
  {updateTime, data},
  keys = {
    latKey: 'lat',
    lonKey: 'lon'
  }
) => async (_data, {geo}, ctx) => {
  try {
    const {latKey, lonKey} = keys;

    if(geo) {
      let newData = [...data];
      geo.forEach(({lon, lat, range}) => {
        newData = [...(data || /* istanbul ignore next */ []).filter(d => getDistance(
          {latitude: lat, longitude: lon},
          {latitude: parseFloat(d[latKey]), longitude: parseFloat(d[lonKey])}
        ) < range)];
      });

      return {
        updateTime,
        data: newData
      };
    }

    return {
      updateTime,
      data
    };
  } catch(e) {
    console.log(e);
    return {};
  }
};
