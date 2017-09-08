'use strict';

import query from './utils/query';

describe('ultra violet station', () => {
  query(
    'ultraVioletStation', [
      'siteName',
      'siteEngName',
      'siteAddress',
      'publishAgency',
      'counties',
      'townships',
      'geo'
    ]
  );
});
