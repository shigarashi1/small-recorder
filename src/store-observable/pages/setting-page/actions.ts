import actionCreatorFactory from 'typescript-fsa';
import { TCreateTarget, TUpdateTarget, TDeleteTarget } from '../../target/action-reducers';

// actions
const ac = actionCreatorFactory('[settingPage]');

export const settingPageActions = {
  createCategory: ac<{ name: string }>('createCategory'),
  updateCategory: ac<{ id: string; name: string }>('updateCategory'),
  deleteCategory: ac<{ id: string }>('deleteCategory'),
  createTarget: ac<TCreateTarget>('createTarget'),
  updateTarget: ac<TUpdateTarget>('updateTarget'),
  deleteTarget: ac<TDeleteTarget>('deleteTarget'),
};
