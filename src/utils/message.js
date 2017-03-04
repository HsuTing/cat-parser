'use strict';

import process from 'process';
import chalk from 'chalk';

export const error = message => {
  if(process.env.log)
    console.log(`${chalk.red('Fail!')} ${message}`);
};

export const success = message => {
  if(process.env.log)
    console.log(`${chalk.green('Success!')} ${message}`);
};
