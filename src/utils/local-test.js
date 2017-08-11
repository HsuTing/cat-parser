'use strict';

import path from 'path';
import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../data');

export const writeFile = (name = 'data', data) => {
  if(process.env.NODE_ENV === 'production')
    return;

  fs.write(
    path.resolve(root, `${name}.json`),
    JSON.stringify(data, null, 2)
  );


  fs.commit((err) => {
    if(err)
      console.log(err);
  });
  return;
};

export const getLocalData = (name = 'data') => {
  if(process.env.NODE_ENV === 'production')
    return null;

  try {
    return require(path.resolve(root, `${name}.json`));
  } catch(e) {
    console.log(chalk.cyan(`[local] can not get "${name}" from local.`));
    console.log(chalk.cyan('[local] fetch data from the website.'));
    return null;
  }
};
