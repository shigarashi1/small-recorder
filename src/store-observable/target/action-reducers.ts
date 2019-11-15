import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TTarget, TCreateTarget, TUpdateTarget, NestIdData, OmitUser } from '../../types/firebase';

// actions
const ac = actionCreatorFactory('[target]');
const actions = {
  setData: ac<TTarget[]>('setData'),
  create: ac.async<OmitUser<TCreateTarget>, {}, {}>('create'),
  update: ac.async<NestIdData<TUpdateTarget>, {}, {}>('update'),
  delete: ac.async<{ id: string }, {}, {}>('delete'),
};
export const targetActions = actions;

// reducers
interface ITargetState {
  targets: TTarget[];
}

const initialState: ITargetState = {
  targets: [],
};

const reducers = reducerWithInitialState(initialState).case(actions.setData, (state, payload) => ({
  ...state,
  targets: payload,
}));

export const targetReducers = reducers;
