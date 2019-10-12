import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

// actions
const ac = actionCreatorFactory('[---utilities/keyboard]');
const actions = {
  initialize: ac('initialize'),
  createCategory: ac<string>('createCategory'),
};
export const keyboardActions = actions;

// reducers
interface ISample {
  sample: string;
}

const initialState: ISample = {
  sample: '',
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.initialize, (state, payload) => ({ ...state }))
  .case(actions.createCategory, (state, payload) => ({ ...state, sample: payload }));
export const keyboardReducers = reducers;
