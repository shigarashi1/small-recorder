import { TFirebaseBase } from '../../types/firebase';
import { db, dbPath, getServerTime, QueryDocSnapshot, CollectionRef } from '../../lib/firebase';
import { TBase } from '../../types/redux';

export abstract class FirestoreServiceBase<T extends TBase, U extends TFirebaseBase> {
  private _collectionPath: string;
  private _subscription: any;

  constructor(collectionName: string) {
    this._collectionPath = `${dbPath}/${collectionName}`;
    this._subscription = '';
  }

  /**
   * collectionの変更をsubscribeし、storeにデータを設定する
   */
  abstract subscribe(onChange: (v: any) => void, ...v: any): void;

  /**
   * unsubscribe
   */
  unsubscribe(): void {
    this._subscription();
  }

  /**
   * subscribeを設定する
   */
  protected set subscriber(v: () => void) {
    this.subscriber = v;
  }

  /**
   * 新しいデータを登録する
   */
  async create(data: T) {
    const serverTime = getServerTime();
    const firebaseData = { ...this.toFirebaseDataFormat(data), createdAt: serverTime, updatedAt: serverTime };
    const _ref = await this.collection.add(firebaseData);
    const id = _ref.id;
    // FIXME: データも返すべき？
    return { _ref, id };
  }

  /**
   * データを更新する
   */
  async update(data: T) {
    const firebaseData = this.toFirebaseDataFormat(data);
    firebaseData.updatedAt = getServerTime();
    if (data.id === null) {
      throw Error('because not set doc id');
    }
    return this.collection.doc(data.id).update(firebaseData);
  }

  /**
   * データを削除する
   */
  async deleteDoc(id: string): Promise<void> {
    return this.collection.doc(id).delete();
  }

  /**
   * queryをデータ化する
   */
  protected abstract toDoc(query: QueryDocSnapshot): T;

  /**
   *
   */
  protected abstract toFirebaseDataFormat(data: T): Exclude<U, 'createdAt' | 'updatedAt'>;

  /**
   * db.collectionを生成し、返却する
   */
  protected get collection(): CollectionRef {
    return db.collection(this._collectionPath);
  }
}
