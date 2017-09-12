'use strict';

import path from 'path';
import process from 'process';
import memFs from 'mem-fs';
import editor from 'mem-fs-editor';
import moment from 'moment';
import * as firebase from 'firebase';

import updateTime from 'constants/update-time';

const store = memFs.create();
const fs = editor.create(store);
const root = path.resolve(__dirname, './../../data');

/* istanbul ignore if */
if(process.env.NODE_ENV === 'production') {
  firebase.initializeApp({
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId
  });

  firebase.auth().signInWithEmailAndPassword(
    process.env.email,
    process.env.password
  ).catch(e => console.log(e));
}

export const getData = async name => {
  try {
    /* istanbul ignore if */
    if(process.env.NODE_ENV === 'production') {
      const snapshot = await firebase.database().ref(`/${name}/`).once('value');
      return snapshot.val();
    }

    return require(path.resolve(root, `${name}.json`));
  } catch(e) {
    return null;
  }
};

export const writeFile = (name, data) => {
  /* istanbul ignore if */
  if(process.env.NODE_ENV === 'production')
    return firebase.database().ref(`/${name}/`).set(data);

  fs.write(
    path.resolve(root, `${name}.json`),
    JSON.stringify(data, null, 2)
  );

  fs.commit(err => {
    /* istanbul ignore if */
    if(err)
      console.log(err);
  });

  return data;
};

export const checkUpdated = (name, time = moment().format()) => (
  moment(updateTime[name]).format('x') < moment().format('x') - moment(time).format('x')
);
