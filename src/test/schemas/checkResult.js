'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

export default query =>
  query.then(result => result.data)
    .should.eventually.not.be.null();
