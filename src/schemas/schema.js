'use strict';

import fs from 'fs';
import path from 'path';
import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql';

let query = {};

fs.readdirSync(__dirname)
  .filter(file => !(file[0] === '.' || file === 'schema.js'))
  .forEach(file => {
    if(!fs.existsSync(path.resolve(__dirname, `./${file}/index.js`)))
      return;

    const name = file.replace('.js', '');
    const schema = require(`./${name}`).default || require(`./${name}`);

    query = {
      ...query,
      ...schema.query
    };
  });

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'all queries',
    fields: query
  })
});
