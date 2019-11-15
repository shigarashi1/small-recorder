import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TRecord, TUpdateRecord, TCreateRecord, NestIdData, OmitUser } from '../../types/firebase';
import { TDateRange } from '../../types';

// actions
const ac = actionCreatorFactory('[record]');
const actions = {
  setData: ac<TRecord[]>('setData'),
  setDateRange: ac<TDateRange>('setDateRange'),
  create: ac.async<OmitUser<TCreateRecord>, {}, {}>('create'),
  update: ac.async<NestIdData<TUpdateRecord>, {}, {}>('update'),
  delete: ac.async<{ id: string }, {}, {}>('delete'),
};
export const recordActions = actions;

// reducers
interface IRecordState {
  records: TRecord[];
  dateRange: TDateRange;
}

const initialState: IRecordState = {
  records: [],
  dateRange: {
    from: '',
    to: '',
  },
};

const reducers = reducerWithInitialState(initialState)
  .case(actions.setData, (state, payload) => ({
    ...state,
    records: [...payload],
  }))
  .case(actions.setDateRange, (state, payload) => ({
    ...state,
    dateRange: { ...payload },
  }));

export const recordReducers = reducers;
