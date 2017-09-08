#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import path from 'path';
import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import * as firebase from 'firebase';
import chalk from 'chalk';

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

    Object.keys(data).forEach(name => {
      fs.write(
        path.resolve(root, `${name}.json`),
        JSON.stringify(data[name], null, 2)
      );
    });

    fs.commit((err) => {
      /* istanbul ignore if */
      if(err)
        console.log(err);

      console.log(chalk.cyan('Done'));
      process.exit();
    });
  } catch(e) {
    throw new Error(e);
  }
})();
