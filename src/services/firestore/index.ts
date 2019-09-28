// import {
//   IFirebaseBase,
//   TQueryDocSnapshot,
//   TFirestoreData,
//   IUser,
//   IRecordCategory,
//   IRecordTarget,
//   IRecord,
//   IAuth,
// } from '../../types/firebase';
// import { db } from '../../lib/firebase';

// class FirestoreService<T extends IFirebaseBase> {
//   private _collectionPath: string;

//   private get collection(): string {
//     return this._collectionPath;
//   }

//   constructor(collectionPath: string) {
//     this._collectionPath = collectionPath;
//   }

//   async readDoc(id: string) {
//     const snapshot = await db
//       .collection(this.collection)
//       .doc(id)
//       .get();

//     const _ref = snapshot.ref;
//     const _id = snapshot.id;
//     const data = snapshot.data() as TFirestoreData<T>;
//     return { ...data, _id, _ref } as T;
//   }

//   async readDocs() {
//     const snapshot = await db.collection(this.collection).get();
//     return snapshot.docs.map(v => this.toDoc(v));
//   }

//   async deleteDoc(id: string) {
//     return db
//       .collection(this.collection)
//       .doc(id)
//       .delete();
//   }

//   async createDoc(data: TFirestoreData<T>) {
//     const _ref = await db.collection(this.collection).add(data);
//     return _ref.id;
//   }

//   private toDoc(query: TQueryDocSnapshot): T {
//     const _ref = query.ref;
//     const _id = query.id;
//     const data = query.data() as TFirestoreData<T>;
//     return { ...data, _id, _ref } as T;
//   }
// }

export const aaa = 'a';

// export const firestoreServices = {
//   user: new FirestoreService<IUser>('user'),
//   auth: new FirestoreService<IAuth>('auth'),
//   category: new FirestoreService<IRecordCategory>('category'),
//   target: new FirestoreService<IRecordTarget>('target'),
//   record: new FirestoreService<IRecord>('record'),
// };
