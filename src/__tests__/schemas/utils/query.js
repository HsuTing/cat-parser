'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';

import * as fields from './fields';

const checkResult = query =>
  expect(query.then(({errors}) => errors))
    .resolves.toBeUndefined();

export default (
  queryName,
  fieldNames = [],
  otherTest = {}
) => {
  const getFields = fieldNames
    .reduce((result, field) => {
      if(Object.keys(fields).includes(field))
        return [
          fields[field].fields
        ].concat(result);
      else
        return [field].concat(result);
    }, [])
    .join(' ');

  describe('# query', () => {
    it('## normal', () => checkResult(graphql(schema, `
      query {
        ${queryName} {
          ${queryName}Group {
            edges {
              node {
                id
                ${getFields}
              }
            }
          }
        }
      }
    `)));

    Object.keys({
      ...fields,
      ...otherTest
    })
      .filter(field => fieldNames.includes(field))
      .forEach(field => {
        it(`## filter ${field}`, () => checkResult(graphql(schema, `
          query {
            ${queryName}(${fields[field] ? fields[field].args : otherTest[field]}) {
              ${queryName}Group {
                edges {
                  node {
                    id
                    ${getFields}
                  }
                }
              }
            }
          }
        `)));
      });
  });
};
