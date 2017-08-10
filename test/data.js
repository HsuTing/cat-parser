'use strict';

const should = require('should');
const {graphql} = require('graphql');
const {globalIdField} = require('graphql-relay');

const schema = require('./../lib/schemas/schema').default;

describe('data', () => {
  let server = null;
  before(() => {
    server = require('./../lib/server').default;
  });

  it('# query data', () => graphql(schema, `
    query {
      data(input: "test") {
        data
      }
    }
  `)
    .then(result => JSON.stringify(result))
    .should.be.eventually.equal(
      JSON.stringify({
        data: {
          data: {
            data: 'query Data'
          }
        }
      })
    )
  );

  it('# mutation data', () => graphql(schema, `
    mutation {
      modifyData(input: {
        data: "test"
      }) {
        newData {
          data
        }
      }
    }
  `)
    .then(result => JSON.stringify(result))
    .should.be.eventually.equal(
      JSON.stringify({
        data: {
          modifyData: {
            newData: {
              data: 'mutation Data'
            }
          }
        }
      })
    )
  );

  after(() => {
    server.close();
  });
});
