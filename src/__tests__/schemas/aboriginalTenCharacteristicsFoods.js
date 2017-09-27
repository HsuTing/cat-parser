'use strict';

import {dataFields} from 'schemas/aboriginalTenCharacteristicsFoods/dataType';

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
    ], {
      seq: 'seqs: seq1',
      name: 'names: one',
      shop: 'shops: one'
    }
  );

  describe('# resolve', () => {
    it('## name', () => {
      const {name} = dataFields;

      expect(() => {
        name.resolve({name: 'test'});
      }).toThrowError('[graphql] "test" is not in names list.');
    });

    it('## shop', () => {
      const {shop} = dataFields;

      expect(() => {
        shop.resolve({shop: 'test'});
      }).toThrowError('[graphql] "test" is not in shops list.');
    });
  });
});
