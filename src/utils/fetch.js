'use strict';

import fetch from 'node-fetch';

import {
  writeFile,
  getLocalData
} from './local-test';

export default async (name = '', link = '') => {
  try {
    let data = getLocalData(name)

    if(!data) {
      const res = await fetch(link);

      data = await res.json();
    }

    writeFile(name, data);

    return data;
  } catch(e) {
    console.log(e);
    return null;
  }
};
