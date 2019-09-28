import { Nullable } from '.';

export type ObjectOrDocId<T> = T | string;

export type TBase = {
  id: Nullable<string>;
  // createdAt: Nullable<Date>;
  // updatedAt: Nullable<Date>;
};

export type TAuth = TBase & {
  isAdmin: boolean;
};

export type TUser = TBase & {
  uid: string;
  username: string;
  auth: Nullable<string>;
};

export type TCategory = TBase & {
  user: Nullable<string>;
  name: string;
  hasDeleted: boolean;
};

type TTargetTerm = 'day' | 'week' | 'month';

export type TTarget = TBase & {
  user: Nullable<string>;
  category: Nullable<string>;
  count: number;
  term: TTargetTerm;
};

export type TRecord = TBase & {
  user: Nullable<string>;
  category: Nullable<string>;
  date: string;
  record: string;
};
