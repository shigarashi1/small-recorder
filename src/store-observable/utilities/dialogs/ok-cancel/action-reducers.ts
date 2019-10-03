import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

//
import { TOkCancelDialog } from '../../../../types/components/dialog';

// actions
const ac = actionCreatorFactory('[dialog - ok]');
const actions = {
  show: ac<TOkCancelDialog>('set'),
  close: ac<void>('clear'),
};
export const okCancelDialogActions = actions;

// reducers
const initialState: TOkCancelDialog = {
  hasOpen: false,
  title: '確認',
  context: '',
  onOk: () => console.log('ok'),
  onCancel: () => console.log('cancel'),
  onClose: () => console.log('close'),
};
const reducers = reducerWithInitialState(initialState)
  .case(actions.show, (state, payload) => ({ ...state, payload }))
  .case(actions.close, (state, payload) => ({ ...initialState }));
export const okCancelDialogReducers = reducers;
