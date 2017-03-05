'use strict';

const fs = require('fs');
const path = require('path');
const parse = require('csv').parse;

const getData = require('./../../lib/utils/taiwan/landfill').default;

fs.readFile(path.resolve(__dirname, './../../data/taiwan/landfill.csv'), (readError, input) => {
  if(readError)
    throw new Error(readError);

  parse(input, {comment: '#'}, (parseError, output) => {
    if(parseError)
      throw new Error(parseError);

    const tasks = output.slice(1)
      .map(item => getData(item[1]));

    Promise.all(tasks.slice(1))
      .then(data => console.log(data))
      .catch(err => console.log(err));
  });
});
