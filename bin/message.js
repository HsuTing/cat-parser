'use strict';

const chalk = require('chalk');

const error = (projectName, message) => {
  console.error(`${chalk.bgCyan(projectName)} ${chalk.red('Fail!')} ${message}`);
};

const success = (projectName, message) => {
  console.log(`${chalk.bgCyan(projectName)} ${chalk.green('Success!')} ${message}`);
};

module.exports = {
  error,
  success
};
