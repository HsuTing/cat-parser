'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';
import {dataFields} from 'schemas/airQualityMonitoringStation/dataType';

import checkResult from './utils/checkResult';
import {geo, counties, townships} from './utils/args';

describe('air quality monitoring station', () => {
  describe('# query', () => {
    it('## normal', () => checkResult(graphql(schema, `
      query {
        airQualityMonitoringStation {
          airQualityMonitoringStationGroup {
            edges {
              node {
                id
                siteName
                siteEngName
                areaName
                siteAddress
                siteType
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
      name: 'areaNames',
      args: 'areaNames: one'
    }, {
      name: 'siteTypes',
      args: 'siteTypes: normal'
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
          airQualityMonitoringStation(${args}) {
            airQualityMonitoringStationGroup {
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
    it('## areaName', () => {
      const {areaName} = dataFields;

      expect(() => {
        areaName.resolve({AreaName: 'test'});
      }).toThrowError('[graphql] "test" is not in areaNames list.');
    });

    it('## siteType', () => {
      const {siteType} = dataFields;

      expect(() => {
        siteType.resolve({SiteType: 'test'});
      }).toThrowError('[graphql] "test" is not in siteTypes list.');
    });
  });
});
