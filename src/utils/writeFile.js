'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import chalk from 'chalk';
import json2csv from 'json2csv';

const root = path.resolve(process.cwd(), './public/data');

const writeJson = (name, data) => new Promise((resolve, reject) => {
  fs.writeFile(
    path.resolve(root, name, `${name}.json`),
    JSON.stringify(data), 'utf8',
    err => {
      if(err)
        reject(`${name}.json`);
      else
        resolve(`${chalk.green('Success!')} ${name}.json`);
    }
  );
});

const writeCsv = (name, data) => new Promise((resolve, reject) => {
  try {
    const fields = Object.keys(data[0]);
    const output = json2csv({data, fields});

    fs.writeFile(
      path.resolve(root, name, `${name}.csv`),
      output, 'utf8',
      err => {
        if(err)
          reject(`${name}.csv`);
        else
          resolve(`${chalk.green('Success!')} ${name}.csv`);
      }
    );
  } catch(e) {
    reject(`${name}.csv (convert fail)`);
  }
});

export default (name, data) => {
  Promise.all([
    writeJson(name, data),
    writeCsv(name, data)
  ]).then(tasks => {
    tasks.forEach(status => console.log(status));
  }).catch(err => console.log(
    `${chalk.red('Fail!')} ${err}`
  ));
};
