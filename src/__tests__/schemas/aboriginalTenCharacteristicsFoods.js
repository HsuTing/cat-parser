'use strict';

import query from './utils/query';

describe('aboriginal ten characteristics foods', () => {
  query(
    'aboriginalTenCharacteristicsFoods', [
      'seq',
      'name',
      'alsoknownas',
      'shop',
      'address',
      'telephone',
      'awards'
    ],
  );
});
