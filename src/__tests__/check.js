'use strict';

import fs from 'fs';
import path from 'path';

import updateTime from 'constants/update-time';

it('check update-time', () => {
  expect(
    fs.readdirSync(path.resolve(__dirname, './../schemas/'))
      .filter(name => !(/.js/).test(name))
      .map(name => name[0].toUpperCase() + name.slice(1))
  ).toMatchObject(Object.keys(updateTime));
});
