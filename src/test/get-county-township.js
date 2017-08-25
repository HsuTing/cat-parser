'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import chalk from 'chalk';

import getCountyTownship from 'bin/core/get-county-township';

describe('get county township', () => {
  it('# run', () => getCountyTownship(
    'http://download.post.gov.tw/post/download/county_h_10603.xml'
  ).should.be.eventually.eql(chalk.cyan('Get data.')));
});
