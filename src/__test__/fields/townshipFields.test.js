'use strict';

import fields, {resolve} from 'schemas/townshipFields';

describe('township fields', () => {
  it('# not in townships list', () => {
    expect(() => {
      fields('township')
        .township.resolve({township: 'test'})
    }).toThrowError('[graphql] "test" is not in townships list.');
  });

  describe('# resolve', () => {
    it('## throw error', () => expect(
      resolve({
        updateTime: '',
        data: {}
      })(
        {}, {
          townships: ['township']
        }
      )
    ).resolves.toMatchObject({}));
  });
});
