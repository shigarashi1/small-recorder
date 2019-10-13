import actionCreatorFactory from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[settingPage]');

export const settingPageActions = {
  createCategory: ac<{ name: string }>('createCategory'),
  updateCategory: ac<{ id: string; name: string }>('updateCategory'),
  deleteCategory: ac<{ id: string }>('deleteCategory'),
  createTarget: ac<void>('createTarget'),
  updateTarget: ac<void>('updateTarget'),
  deleteTarget: ac<void>('deleteTarget'),
};
