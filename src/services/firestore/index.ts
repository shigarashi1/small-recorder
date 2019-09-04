import { IFirebaseBase, TFirebaseQuery } from '../../types/firebase';
import { db } from '../../lib/firebase';
import { KeyExclude } from '../../types';

const read = async <T extends IFirebaseBase>(id?: string) => {
  const snapshot = await db.collection('').get();
};

export const firestoreService = {};

const toData = <T extends IFirebaseBase>(query: TFirebaseQuery): T => {
  const _id = query.id;
  const data = query.data() as KeyExclude<T, '_id'>;
  return { ...data, _id } as T;
};

class FirestoreBase<T extends IFirebaseBase> {
  async readById(id: string): Promise<T> {
    const snapshot = await db
      .collection('')
      .doc(id)
      .get();

    const ref = snapshot.ref;
    const _id = snapshot.id;
    const data = snapshot.data() as KeyExclude<T, '_id'>;
    return { _id, ...data } as T;
  }
}
