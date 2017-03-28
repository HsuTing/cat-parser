'use strict';

import {
  GraphQLString,
  GraphQLInputObjectType,
  GraphQLNonNull
} from 'graphql';

export default (name, language) => ({
  type: new GraphQLInputObjectType({
    name: `${name}_geo`,
    description: {
      chi: '給定經緯度及範圍，回傳範圍內的資料點'
    }[language],
    fields: () => ({
      latitude: {
        description: {
          chi: '緯度'
        }[language],
        type: new GraphQLNonNull(GraphQLString)
      },
      longitude: {
        description: {
          chi: '經度'
        }[language],
        type: new GraphQLNonNull(GraphQLString)
      },
      radius: {
        description: {
          chi: '半徑'
        }[language],
        type: new GraphQLNonNull(GraphQLString)
      }
    })
  })
});
