export { recordPageActions, recordPageReducers } from './actions-reducer';
export { recordPageEpics } from './epics';

export type TRecordPageState = {
  displayedDate: Date;
  isEditForm: boolean;
  inputForm: {
    categoryId: string;
    recordText: string;
  };
  editForm: {
    categoryId: string;
    recordText: string;
    recordId: string;
    previousRecordText: string;
  };
};
