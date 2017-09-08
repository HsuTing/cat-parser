'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';

import checkResult from './utils/checkResult';
import {geo, counties} from './utils/args';

describe('ultra violet Monitoring', () => {
  describe('# query', () => {
    it('## normal', () => checkResult(graphql(schema, `
      query {
        ultraVioletMonitoring {
          ultraVioletMonitoringGroup {
            edges {
              node {
                id
                siteName
                uVI
                publishAgency
                publishTime
                county
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
    }].forEach(({name, args}) => {
      it(`## filter ${name}`, () => checkResult(graphql(schema, `
        query {
          ultraVioletMonitoring(${args}) {
            ultraVioletMonitoringGroup {
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
