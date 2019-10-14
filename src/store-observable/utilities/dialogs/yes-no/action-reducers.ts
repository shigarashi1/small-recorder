import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

//
import { TYesNoDialog } from '../../../../types/components/dialog';

// actions
const ac = actionCreatorFactory('[dialog - yes no]');
const actions = {
  show: ac<TYesNoDialog>('show'),
  close: ac<void>('close'),
};
export const yesNoDialogActions = actions;

// reducers
const initialState: TYesNoDialog = {
  hasOpen: false,
  title: '選択',
  context: '',
  onYes: () => console.log('yes'),
  onNo: () => console.log('no'),
  onClose: () => console.log('close'),
};
const reducers = reducerWithInitialState(initialState)
  .case(actions.show, (state, payload) => ({ ...state, ...payload }))
  .case(actions.close, (state, payload) => ({ ...initialState }));
export const yesNoDialogReducers = reducers;
