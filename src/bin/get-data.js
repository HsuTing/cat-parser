#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import path from 'path';
import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

import getCountyTownship from './core/get-county-township';
import getRiver from './core/get-river';

const store = memFs.create();
const fs = editor.create(store);

process.on('unhandledRejection', reason => {
  console.log(reason);
});

(async () => {
  try {
    const data = {
      ...(await getCountyTownship),
      ...(await getRiver)
    };

    Object.keys(data).forEach(name => {
      fs.copyTpl(
        path.resolve(process.cwd(), './templates/data.js'),
        path.resolve(process.cwd(), './src/constants', `${name}.js`), {
          data: data[name]
        }
      );

      fs.commit(() => {
        console.log(chalk.cyan(`Get ${name}.`));
      });
    });
  } catch(e) {
    throw new Error(e);
  }
})();
