import { IRecordCategory } from './firebase';

export type TSort = 'date' | 'category' | 'record';

export type TOrder = 'asc' | 'desc';

export interface ISearchFilter {
  from: number;
  to: number;
  category: IRecordCategory;
  record: string;
  sortType: TSort;
  orderType: TOrder;
  hasDeleted: boolean;
}
