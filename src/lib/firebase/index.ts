import firebase from './import';

import { firebaseConfig } from './config';

const instance = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore(instance);
export const dbPath = 'api/v1';
