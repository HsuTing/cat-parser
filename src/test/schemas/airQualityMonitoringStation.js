'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import {graphql} from 'graphql';

import schema from 'schemas/schema';
import {dataFields} from 'schemas/airQualityMonitoringStation/dataType';

import checkResult from './checkResult';
import {geo, counties, townships} from './args';

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

      (() => {
        areaName.resolve({AreaName: 'test'});
      }).should.throw('[graphql] "test" is not in areaNames list.');
    });

    it('## siteType', () => {
      const {siteType} = dataFields;

      (() => {
        siteType.resolve({SiteType: 'test'});
      }).should.throw('[graphql] "test" is not in siteTypes list.');
    });
  });
});
