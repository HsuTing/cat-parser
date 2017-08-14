'use strict';

import {
  GraphQLString
} from 'graphql';

import synonym from 'utils/synonym';

export default key => ({
  township: {
    type: GraphQLString,
    description: '鄉鎮',
    resolve: data => synonym(data[key])
  }
});
