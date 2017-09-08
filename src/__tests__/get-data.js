'use strict';

import getCountyTownship from 'bin/core/get-county-township';
import counties from 'constants/counties';
import townships from 'constants/townships';
import getRiver from 'bin/core/get-river';
import rivers from 'constants/rivers';

describe('get data', () => {
  it('# counties and townships', () => expect(
    getCountyTownship
  ).resolves.toMatchObject({
    counties,
    townships
  }));

  it('# rivers', () => expect(
    getRiver
  ).resolves.toMatchObject({rivers}));
});
