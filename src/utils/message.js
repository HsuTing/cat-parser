'use strict';

import chalk from 'chalk';

export const error = message => {
  console.log(`${chalk.red('Fail!')} ${message}`);
};

export const success = message => {
  console.log(`${chalk.green('Success!')} ${message}`);
};
