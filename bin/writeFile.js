'use strict';

const fs = require('fs');
const process = require('process');
const path = require('path');

module.exports = (outputPath = '', data = []) => {
  fs.writeFileSync(
    path.resolve(process.cwd(), `./public/${outputPath}.json`),
    JSON.stringify(data, null, 2)
  );
};
