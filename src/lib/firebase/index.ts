import firebase from './import';

import { firebaseConfig } from './config';

const instance = firebase.initializeApp(firebaseConfig);
export const auth = instance.auth();
export const db = firebase.firestore(instance);
export const dbPath = 'api/v1';

// types
const c = db.collection('docs');
export type QueryListener = ReturnType<typeof c.onSnapshot>;
export type ServerTimestamp = ReturnType<typeof firebase.firestore.FieldValue.serverTimestamp>;
export type QueryDocSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type DocRef = firebase.firestore.DocumentReference;
export type CollectionRef = firebase.firestore.CollectionReference;
export type TimeStamp = firebase.firestore.Timestamp;
export type TDocRefColumn = {
  fieldPath: string | firebase.firestore.FieldPath;
  opStr: firebase.firestore.WhereFilterOp;
  ref: DocRef;
};

// functions
export const getCollection = (collectionName: string): CollectionRef => db.collection(`${dbPath}/${collectionName}`);
export const getServerTime = (): ServerTimestamp => firebase.firestore.FieldValue.serverTimestamp();
export const toDateTimeStamp = (seconds: number, nanoseconds: number): Date =>
  new firebase.firestore.Timestamp(seconds, nanoseconds).toDate();
