'use strict';

const shell = require('shelljs');

const message = require('./message');

if(!shell.which('wget'))
  throw new Error('Sorry, this script requires wget');

module.exports = (projectName, name, outputPath, link) => {
  message.success(projectName, name);
  shell.exec(`wget -O ${outputPath} -q ${link}`);
};
