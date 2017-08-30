'use strict';

import fetch from 'node-fetch';

let server = null;

describe('server', () => {
  beforeAll(() => {
    server = require('./../server').default;
  });

  it('# run', () => expect(
    fetch('http://localhost:8000/')
      .then(res => res.json())
  ).resolves.toMatchObject({
    errors: [{
      message: 'Must provide query string.'
    }]
  }));

  afterAll(() => {
    server.close();
  });
});
