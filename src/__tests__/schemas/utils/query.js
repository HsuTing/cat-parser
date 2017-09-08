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
    }, []).join(' ');

  it('# check test all fields', () => {
    expect(
      (`id ${getFields}`).replace(/\n/g, '')
        .replace(/\s\s+/g, ' ')
        .split(' ')
        .sort()
    ).toMatchObject(
      Object.keys(
        require(`./../../../schemas/${queryName}/dataType`).dataFields
      ).sort()
    );
  });

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

    it('## id is unique', async () => {
      const result = (await graphql(schema, `
        query {
          ${queryName} {
            ${queryName}Group {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      `)).data[queryName][`${queryName}Group`].edges;

      expect(result[0].node.id !== result[1].node.id).toBe(true);
    });

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
