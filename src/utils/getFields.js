'use strict';

import {
  GraphQLString
} from 'graphql';

export default attributes => {
  Object.keys(attributes)
    .forEach(key => {
      attributes[key] = {
        description: attributes[key],
        type: GraphQLString,
        resolve: parent => parent[key] || ''
      }
    });

  return attributes;
};
