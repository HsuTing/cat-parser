'use strict';

import chalk from 'chalk';

import getCountyTownship from 'bin/core/get-county-township';

describe('get county township', () => {
  it('# run', () => expect(
    getCountyTownship('http://download.post.gov.tw/post/download/county_h_10603.xml')
  ).resolves.toBe(chalk.cyan('Get data.')));
});
