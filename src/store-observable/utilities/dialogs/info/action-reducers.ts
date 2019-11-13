import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TInfoDialog } from '../../../../types/components/dialog';
//

// actions
const ac = actionCreatorFactory('[dialog - information]');
const actions = {
  show: ac<TInfoDialog>('set'),
  close: ac<void>('clear'),
};
export const infoDialogActions = actions;

// reducers
const initialState: TInfoDialog = {
  hasOpen: false,
  title: '情報',
  context: '',
  onClose: () => console.log('close'),
};
const reducers = reducerWithInitialState(initialState)
  .case(actions.show, (state, payload) => ({ ...state, ...payload }))
  .case(actions.close, (state, payload) => ({ ...initialState }));
export const infoDialogReducers = reducers;
