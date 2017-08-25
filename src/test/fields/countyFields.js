'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import fields, {resolve} from 'schemas/countyFields';

describe('county fields', () => {
  it('# not in counties list', () => {
    (() => {
      fields('county')
        .county.resolve({county: 'test'})
    }).should.throw('[graphql] "test" is not in counties list.');
  });

  describe('# resolve', () => {
    it('## throw error', () => resolve(
      () => ({
        updateTime: '',
        data: {}
      })
    )(
      {}, {
        counties: ['county']
      }
    ).should.be.eventually.eql({}));
  });
});
