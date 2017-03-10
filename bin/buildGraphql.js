#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const graphql = require('graphql').graphql;
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const printSchema = require('graphql/utilities').printSchema;

const schema = require('./../lib/schemas/schema').default;

const schemaPath = path.join(__dirname, './../data/schema/open-data');

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    `${schemaPath}.json`,
    JSON.stringify(result, null, 2)
  );
});

fs.writeFileSync(
  `${schemaPath}.graphql`,
  printSchema(schema)
);
