'use strict';

import {dataFields} from 'schemas/riverWaterQualityMonitoring/dataType';

import query from './utils/query';

describe('river water quality monitoring', () => {
  query(
    'riverWaterQualityMonitoring', [
      'siteName',
      'siteEngName',
      'basin',
      'twd97tm2x',
      'twd97tm2y',
      'sampleDate',
      'itemName',
      'itemEngName',
      'itemEngAbbreviation',
      'itemValue',
      'itemUnit',
      'counties',
      'townships',
      'geo',
      'rivers'
    ], {
      itemName: 'itemNames: chloride'
    }
  );

  describe('# resolve', () => {
    it('## itemName', () => {
      const {itemName} = dataFields;

      expect(() => {
        itemName.resolve({ItemName: 'test'});
      }).toThrowError('[graphql] "test" is not in itemNames list.');
    });
  });
});
