import { IRecordCategory, IRecordTarget } from './firebase';

export type TEditType = 'category' | 'target';
export type TDialogType = 'none' | 'create' | 'edit' | 'delete';
export type TEditData = IRecordCategory | IRecordTarget;
export type TListData = IRecordCategory[] | IRecordTarget[];
