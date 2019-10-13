import actionCreatorFactory from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[settingPage]');

export const settingPageActions = {
  createCategory: ac<void>('createCategory'),
  updateCategory: ac<void>('updateCategory'),
  deleteCategory: ac<void>('deleteCategory'),
  createTarget: ac<void>('createTarget'),
  updateTarget: ac<void>('updateTarget'),
  deleteTarget: ac<void>('deleteTarget'),
};
