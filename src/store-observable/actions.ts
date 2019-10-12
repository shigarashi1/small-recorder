import { actionCreatorFactory } from 'typescript-fsa';

// actions
const ac = actionCreatorFactory('[root]');
const actions = {
  clearAllState: ac<void>('clearAllState'),
};

export const rootActions = actions;
