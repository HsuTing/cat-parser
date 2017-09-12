'use strict';

import fields, {resolve} from 'schemas/countyFields';

describe('county fields', () => {
  it('# not in counties list', () => {
    expect(() => {
      fields('county')
        .county.resolve({county: 'test'});
    }).toThrowError('[graphql] "test" is not in counties list.');
  });

  describe('# resolve', () => {
    it('## throw error', () => expect(
      resolve({
        updateTime: '',
        data: {}
      })(
        {}, {
          counties: ['county']
        }
      )
    ).resolves.toMatchObject({}));
  });
});
