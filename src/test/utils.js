'use strict';

import process from 'process';
import should from 'should'; // eslint-disable-line no-unused-vars
import chalk from 'chalk';

import synonym from 'utils/synonym';
import notIncluded from 'utils/notIncluded';

describe('utils', () => {
  it('# synonym', () => {
    synonym('台')
      .should.be.equal('臺');
  });

  describe('# notIncluded', () => {
    before(() => {
      process.env.NODE_ENV = 'production';
    });

    it('normal', () => {
      notIncluded('test')
        .should.be.equal(chalk.red('test'));
    });

    after(() => {
      process.env.NODE_ENV = undefined;
    });
  });
});
