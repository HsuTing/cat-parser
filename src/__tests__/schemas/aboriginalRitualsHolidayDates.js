'use strict';

import {dataFields} from 'schemas/aboriginalRitualsHolidayDates/dataType';

import query from './utils/query';

describe('aboriginal rituals holiday dates', () => {
  query(
    'aboriginalRitualsHolidayDates', [
      'seq',
      'datelisted',
      'ethnic',
      'name',
      'alsoknownas',
      'nativename',
      'year',
      'keyDay',
      'when',
      'duration'
    ], {
      seq: 'seqs:1',
      ethnic: 'ethnics:amis'
    }
  );

  describe('# resolve', () => {
    it('## ethnic', () => {
      const {ethnic} = dataFields;

      expect(() => {
        ethnic.resolve({Ethnic: 'test'});
      }).toThrowError('[graphql] "test" is not in ethnics list.');
    });
  });
});
