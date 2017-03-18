'use strict';

const chalk = require('chalk');

const error = message => {
  console.error(`${chalk.red('Fail!')} ${message}`);
};

const success = message => {
  console.log(`${chalk.green('Success!')} ${message}`);
};

module.exports = {
  error,
  success
};
