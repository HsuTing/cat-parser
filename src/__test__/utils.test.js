'use strict';

import process from 'process';
import chalk from 'chalk';

import synonym from 'utils/synonym';
import notIncluded from 'utils/notIncluded';

describe('utils', () => {
  it('# synonym', () => {
    expect(synonym('台')).toBe('臺');
  });

  describe('# notIncluded', () => {
    beforeAll(() => {
      process.env.NODE_ENV = 'production';
    });

    it('normal', () => {
      expect(notIncluded('test')).toBe(chalk.red('test'));
    });

    afterAll(() => {
      process.env.NODE_ENV = undefined;
    });
  });
});
