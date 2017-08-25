'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import fields, {resolve} from 'schemas/townshipFields';

describe('township fields', () => {
  it('# not in townships list', () => {
    (() => {
      fields('township')
        .township.resolve({township: 'test'})
    }).should.throw('[graphql] "test" is not in townships list.');
  });

  describe('# resolve', () => {
    it('## throw error', () => resolve(
      () => ({
        updateTime: '',
        data: {}
      })
    )(
      {}, {
        townships: ['township']
      }
    ).should.be.eventually.eql({}));
  });
});
