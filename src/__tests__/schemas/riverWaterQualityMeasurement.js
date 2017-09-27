'use strict';

import query from './utils/query';

describe('river water quality measurement', () => {
  query(
    'riverWaterQualityMeasurement', [
      'siteName',
      'siteEngName',
      'counties',
      'townships',
      'basin',
      'rivers',
      'geo',
      'twd97tm2x',
      'twd97tm2y',
      'siteAddress'
    ],
  );
});
