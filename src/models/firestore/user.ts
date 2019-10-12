import { FirestoreServiceBase } from './base';
import { Nullable } from '../../types';
import { QueryDocSnapshot, QuerySnapshot } from '../../lib/firebase';
import { TUser, FirebaseUser } from '../../types/firebase';

export class User extends FirestoreServiceBase<TUser, FirebaseUser> {
  private _user: Nullable<TUser> = null;

  constructor() {
    super('users');
  }

  get user() {
    return this._user;
  }

  subscribe(onChange: (user: TUser) => void, uid: string): void {
    this.collection
      .where('uid', '==', uid)
      .get()
      .then(v => v.docs.map(vv => console.log(vv.data)));
    this.subscriber = this.collection.where('uid', '==', uid).onSnapshot(this.setData(onChange, uid));
  }

  protected toDoc(query: QueryDocSnapshot): TUser {
    const data = query.data();
    const id = query.id;
    return { id, ...data } as TUser;
  }

  protected toFirebaseDataFormat(data: TUser) {
    return { _ref: data.id, ...data } as FirebaseUser;
  }

  private setData = (onChange: (user: TUser) => void, uid: string) => (q: QuerySnapshot) => {
    const user = q.docs.map(this.toDoc).find(v => v.uid === uid) as TUser;
    this._user = user;
    onChange(user as TUser);
  };
}
