'use strict';

import process from 'process';
import firebase from 'cat-utils/lib/firebaseInit';
import checkEnv from 'cat-utils/lib/checkEnv';

checkEnv([
  'FIREBASE_EMAIL',
  'FIREBASE_PASSWORD'
]);

firebase.auth()
  .signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
  .catch(err => {
    throw new Error(err);
  });

export default firebase;
