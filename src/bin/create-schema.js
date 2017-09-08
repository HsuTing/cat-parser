#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import path from 'path';
import process from 'process';
import inquirer from 'inquirer';
import validator from 'validator';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import chalk from 'chalk';

const store = memFs.create();
const fs = editor.create(store);

process.on('unhandledRejection', reason => {
  console.log(reason);
});

(async () => {
  try {
    const {name, ...options} = await inquirer.prompt([{
      name: 'name',
      message: 'schema name',
      validate: word => !word || word === '' ? 'can not be empty' : true,
      filter: name => name[0].toLowerCase() + name.slice(1)
    }, {
      name: 'link',
      message: 'data link',
      validate: value => validator.isURL(value) ? true : 'Must be an url.'
    }, {
      type: 'checkbox',
      name: 'fields',
      message: 'choose fields',
      choices: [
        'geo',
        'county',
        'township',
        'river'
      ]
    }, {
      name: 'lat',
      message: 'lat key',
      default: 'lat',
      when: ({fields}) => fields.includes('geo')
    }, {
      name: 'lon',
      message: 'lon key',
      default: 'lon',
      when: ({fields}) => fields.includes('geo')
    }].concat(
      [
        'county',
        'township',
        'river'
      ].map(name => ({
        name,
        message: `${name} key`,
        default: name,
        when: ({fields}) => fields.includes(name)
      }))
    ));

    const upperName = name[0].toUpperCase() + name.slice(1);

    [
      'dataType',
      'index',
      'query'
    ].forEach(fileName => {
      const outputName = fileName === 'query' ? `get${upperName}` : fileName;

      fs.copyTpl(
        path.resolve(process.cwd(), './templates/schema', `${fileName}.js`),
        path.resolve(process.cwd(), './src/schemas', name, `${outputName}.js`), {
          ...options,
          name,
          upperName
        }
      );
    });

    fs.commit(err => {
      if(err)
        throw new Error(err);

      console.log(chalk.cyan(`Create ${upperName}.`));
    });
  } catch(e) {
    throw new Error(e);
  }
})();
