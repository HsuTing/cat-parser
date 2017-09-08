'use strict';

import query from './utils/query';

describe('ultra violet Monitoring', () => {
  query(
    'ultraVioletMonitoring', [
      'siteName',
      'uVI',
      'publishAgency',
      'publishTime',
      'counties',
      'geo'
    ]
  );
});
