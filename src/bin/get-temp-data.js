#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import fetch from 'node-fetch';
import path from 'path';
import process from 'process';
import nodeFs from 'fs';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import * as firebase from 'firebase';
import chalk from 'chalk';

import link from 'constants/link';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../data');

firebase.initializeApp({
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId
});

process.on('unhandledRejection', reason => {
  console.log(reason);
});

(async () => {
  try {
    await firebase.auth().signInWithEmailAndPassword(
      process.env.email,
      process.env.password
    );

    const snapshot = await firebase.database().ref('/').once('value');
    const data = snapshot.val();

    await Promise.all(
      nodeFs.readdirSync(path.resolve(process.cwd(), './src/schemas'))
        .map(async schema => {
          try {
            if(!nodeFs.lstatSync(path.resolve(process.cwd(), './src/schemas', schema)).isDirectory())
              return;

            const name = schema[0].toUpperCase() + schema.slice(1);

            if(!Object.keys(data).includes(name)) {
              if(!link[name])
                throw new Error(`[link] ${name} is not included.`);

              const data = await fetch(link[name]).then(res => res.json());

              fs.write(
                path.resolve(root, `${name}.json`),
                JSON.stringify(data, null, 2)
              );

              return firebase.database().ref(`/${name}/`).set(data);
            }
          } catch(e) {
            throw new Error(e);
          }
        })
    );

    Object.keys(data).forEach(name => {
      fs.write(
        path.resolve(root, `${name}.json`),
        JSON.stringify(data[name], null, 2)
      );
    });

    fs.commit(err => {
      if(err)
        console.log(err);

      console.log(chalk.cyan('Done'));
      process.exit();
    });
  } catch(e) {
    console.log(e);
    process.exit();
  }
})();
