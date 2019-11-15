import { actionCreatorFactory } from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[recordPage]');

export const recordPageActions = {
  changeDate: ac<{ date: Date }>('changeDate'),
  createRecord: ac<{ record: string; category: string }>('createRecord'),
  deleteRecord: ac<{ id: string }>('deleteRecord'),
  updateRecord: ac<{ id: string; record: string }>('updateRecord'),
};