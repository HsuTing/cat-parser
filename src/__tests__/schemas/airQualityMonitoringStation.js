'use strict';

import {dataFields} from 'schemas/airQualityMonitoringStation/dataType';

import query from './utils/query';

describe('air quality monitoring station', () => {
  query(
    'airQualityMonitoringStation', [
      'siteName',
      'siteEngName',
      'areaName',
      'siteAddress',
      'siteType',
      'counties',
      'townships',
      'geo'
    ], {
      areaName: 'areaNames: one',
      siteType: 'siteTypes: normal'
    }
  );

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
