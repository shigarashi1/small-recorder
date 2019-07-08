export type ObjectIndexes<T = any> = { [key: string]: T };

export type Nullable<T> = T | null;

export enum EPath {
  Home = '/',
  Login = '/login',
  Sample = '/sample',
  Manual = '/manual',
  Record = '/record',
  Report = '/report',
  Search = '/search',
  Setting = '/setting',
}
