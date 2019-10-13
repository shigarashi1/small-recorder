export type ObjectIndexes<T = any> = { [key: string]: T };
export type Nullable<T> = T | null;
export type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R> ? Array<NestedPartial<R>> : NestedPartial<T[K]>;
};

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
export const Mode: ObjectIndexes<TMode> = {
  create: 'CREATE',
  edit: 'EDIT',
  delete: 'DELETE',
};
