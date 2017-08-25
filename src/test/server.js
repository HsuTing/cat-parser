'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import fetch from 'node-fetch';

let server = null;

describe('server', () => {
  before(() => {
    server = require('./../server').default;
  });

  it('# run', () => fetch('http://localhost:8000/')
    .then(res => res.json())
    .should.be.eventually.eql({
      errors: [{
        message: 'Must provide query string.'
      }]
    }));

  after(() => {
    server.close();
  });
});
