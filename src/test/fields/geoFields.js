'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import {resolve} from 'schemas/geoFields';

describe('geo fields', () => {
  describe('# resolve', () => {
    it('## throw error', () => resolve(
      () => ({
        updateTime: '',
        data: {}
      })
    )(
      {}, {
        geo: {
          lat: 121,
          lon: 23.5,
          range: 1000
        }
      }
    ).should.be.eventually.eql({}));
  });
});
