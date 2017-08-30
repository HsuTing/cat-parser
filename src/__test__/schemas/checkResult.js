'use strict';

export default query =>
  expect(query.then(({errors}) => errors))
    .resolves.toBeUndefined();
