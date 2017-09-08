'use strict';

import query from './utils/query';

describe('ultra violet monitoring', () => {
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
