'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';

import checkResult from './utils/checkResult';
import {geo, counties, townships} from './utils/args';

describe('ultra violet station', () => {
  describe('# query', () => {
    it('## normal', () => checkResult(graphql(schema, `
      query {
        ultraVioletStation {
          ultraVioletStationGroup {
            edges {
              node {
                id
                siteName
                siteEngName
                siteAddress
                publishAgency
                county
                township
                lon
                lat
              }
            }
          }
        }
      }
    `)));

    [{
      name: 'geo',
      args: geo
    }, {
      name: 'counties',
      args: counties
    }, {
      name: 'townships',
      args: townships
    }].forEach(({name, args}) => {
      it(`## filter ${name}`, () => checkResult(graphql(schema, `
        query {
          ultraVioletStation(${args}) {
            ultraVioletStationGroup {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      `)));
    });
  });
});
