'use strict';

import process from 'process';
import chalk from 'chalk';

export default word => {
  if(process.env.NODE_ENV !== 'production')
    throw new Error(word);

  console.log(chalk.red(word));
};
