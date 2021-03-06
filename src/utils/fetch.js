'use strict';

import fetch from 'node-fetch';
import chalk from 'chalk';
import moment from 'moment';

import link from 'constants/link';

import {
  getData,
  writeFile,
  checkUpdated
} from './db';

export default async name => {
  try {
    const time = await getData('time') || /* istanbul ignore next */ {};
    const check = !time[name] || checkUpdated(name, time[name]);
    let data = await getData(name);

    if(!link[name])
      throw new Error(`[link] ${name} is not included.`);

    /* istanbul ignore next */
    if(!data || check) {
      if(check)
        console.log(chalk.cyan(`[db] update "${name}".`));
      else {
        console.log(chalk.cyan(`[db] can not get "${name}" from db.`));
        console.log(chalk.cyan('[db] fetch data from the website.'));
      }

      fetch(link[name])
        .then(res => res.json())
        .then(data => {
          time[name] = moment().format();
          writeFile('time', time);
          writeFile(name, data);
        })
        .catch(e => console.log(e));
    }

    return {
      updateTime: time[name],
      data
    };
  } catch(e) {
    /* istanbul ignore next */
    console.log(e);
    /* istanbul ignore next */
    return {};
  }
};
