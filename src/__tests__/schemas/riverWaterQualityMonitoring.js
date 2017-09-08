'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';
import {dataFields} from 'schemas/riverWaterQualityMonitoring/dataType';

import checkResult from './utils/checkResult';
import {river, geo, counties, townships} from './utils/args';

describe('river water quality monitoring', () => {
  describe('# query', () => {
    it('## normal', () => checkResult(graphql(schema, `
      query {
        riverWaterQualityMonitoring {
          riverWaterQualityMonitoringGroup {
            edges {
              node {
                id
                siteName
                siteEngName
                basin
                twd97tm2x
                twd97tm2y
                sampleDate
                itemName
                itemEngName
                itemEngAbbreviation
                itemValue
                itemUnit
                county
                township
                lon
                lat
                river
              }
            }
          }
        }
      }
    `)));

    [{
      name: 'rivers',
      args: river
    }, {
      name: 'itemNames',
      args: 'itemNames: chloride',
    }, {
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
          riverWaterQualityMonitoring(${args}) {
            riverWaterQualityMonitoringGroup {
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

  describe('# resolve', () => {
    it('## itemName', () => {
      const {itemName} = dataFields;

      expect(() => {
        itemName.resolve({ItemName: 'test'});
      }).toThrowError('[graphql] "test" is not in itemNames list.');
    });
  });
});
