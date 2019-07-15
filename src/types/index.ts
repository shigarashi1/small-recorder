export type ObjectIndexes<T = any> = { [key: string]: T };

export type Nullable<T> = T | null;

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
