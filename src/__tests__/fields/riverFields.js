'use strict';

import fields, {resolve} from 'schemas/riverFields';

describe('river fields', () => {
  it('# not in rivers list', () => {
    expect(() => {
      fields('river')
        .river.resolve({river: 'test'})
    }).toThrowError('[graphql] "test" is not in rivers list.');
  });

  describe('# resolve', () => {
    it('## throw error', () => expect(
      resolve({
        updateTime: '',
        data: {}
      })(
        {}, {
          rivers: ['river']
        }
      )
    ).resolves.toMatchObject({}));
  });
});
