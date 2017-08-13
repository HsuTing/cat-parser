'use strict';

import path from 'path';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import moment from 'moment';

import updateTime from 'constants/update-time';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../data');

export const getData = (name = 'data') => {
  try {
    return require(path.resolve(root, `${name}.json`));
  } catch(e) {
    return null;
  }
};

export const writeFile = (name = 'data', data) => {
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

export const checkUpdated = (name = 'data', time = moment().format()) => (
  moment(updateTime[name]).format('x') < moment().format('x') - moment(time).format('x')
);
