import actionCreatorFactory from 'typescript-fsa';
import { TCreateTarget, TUpdateTarget, NestIdData, OmitUser } from '../../../types/firebase';

// actions
const ac = actionCreatorFactory('[settingPage]');

export const settingPageActions = {
  createCategory: ac<{ name: string }>('createCategory'),
  updateCategory: ac<{ id: string; name: string }>('updateCategory'),
  deleteCategory: ac<{ id: string }>('deleteCategory'),
  createTarget: ac<OmitUser<TCreateTarget>>('createTarget'),
  updateTarget: ac<NestIdData<TUpdateTarget>>('updateTarget'),
  deleteTarget: ac<{ id: string }>('deleteTarget'),
};
