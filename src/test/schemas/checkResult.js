'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

export default query =>
  query.then(({errors}) => errors)
    .should.eventually.be.undefined();
