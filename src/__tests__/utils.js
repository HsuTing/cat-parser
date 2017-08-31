'use strict';

import process from 'process';
import chalk from 'chalk';

import * as db from 'utils/db';
import fetch from 'utils/fetch';
import synonym from 'utils/synonym';
import notIncluded from 'utils/notIncluded';

describe('utils', () => {
  describe('# db', () => {
    it('## writeFile', () => {
      expect(db.writeFile('test', {key: 'value'}))
        .toMatchObject({key: 'value'});
    });

    it('## checkUpdated', () => {
      expect(db.checkUpdated('test'))
        .toBe(false);
    });
  });

  describe('# fetch', () => {
    it('## no data', async () => {
      expect(await fetch('test-fetch')).toMatchObject({});
    });

    it('## need update', async () => {
      expect(await fetch('test')).toMatchObject({});
    });
  });

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
