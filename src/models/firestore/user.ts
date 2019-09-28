import { FirestoreServiceBase } from './base';
import { Nullable } from '../../types';
import { FirestoreUser } from '../../types/firebase';
import { TUser } from '../../types/redux';
import { QueryDocSnapshot, QuerySnapshot } from '../../lib/firebase';

export class UserService extends FirestoreServiceBase<TUser, FirestoreUser> {
  private _user: Nullable<TUser> = null;

  constructor() {
    super('users');
  }

  get user() {
    return this._user;
  }

  subscribe(onChange: (user: TUser) => void, uid: string): void {
    this.subscriber = this.collection.where('uid', '==', uid).onSnapshot(this.setData(onChange, uid));
  }

  protected toDoc(query: QueryDocSnapshot): TUser {
    const data = query.data();
    const id = query.id;
    return { id, ...data } as TUser;
  }

  protected toFirebaseDataFormat(data: TUser) {
    return { _ref: data.id, ...data } as FirestoreUser;
  }

  private setData = (onChange: (user: TUser) => void, uid: string) => (q: QuerySnapshot) => {
    const user = q.docs.map(this.toDoc).find(v => v.uid === uid) as TUser;
    this._user = user;
    onChange(user as TUser);
  };
}
