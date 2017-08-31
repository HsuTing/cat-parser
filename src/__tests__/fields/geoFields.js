'use strict';

import {resolve} from 'schemas/geoFields';

describe('geo fields', () => {
  describe('# resolve', () => {
    it('## throw error', () => expect(
      resolve(
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
      )
    ).resolves.toMatchObject({}));
  });
});
