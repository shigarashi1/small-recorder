import { TCategory, TTarget } from '../firebase';

export type TEditType = 'category' | 'target';
export type TDialogType = 'none' | 'create' | 'edit' | 'delete';
export type TEditData = TCategory | TTarget;
export type TListData = TCategory[] | TTarget[];
