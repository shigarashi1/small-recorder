export type ObjectIndexes<T = any> = { [key: string]: T };
export type Nullable<T> = T | null;
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};

export interface IError {
  code: string;
  message: string;
}

export enum EPath {
  Home = '/',
  Login = '/login',
  Sample = '/sample',
  SampleAtoms = '/sample/atoms',
  SampleMolecules = '/sample/molecules',
  SampleOrganisms = '/sample/organisms',
  SampleDraggable = '/sample/draggable',
  Manual = '/manual',
  Record = '/record',
  Report = '/report',
  Search = '/search',
  Setting = '/setting',
}

export type TMode = 'CREATE' | 'EDIT' | 'DELETE';
export const Mode = {
  create: 'CREATE' as TMode,
  edit: 'EDIT' as TMode,
  delete: 'DELETE' as TMode,
};

export type TI18nObj = {
  jp: string;
  en?: string;
};

export type TMaster<TCode = string, TValue = string> = Array<{ code: TCode; value: TValue }>;
