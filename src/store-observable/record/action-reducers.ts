import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TRecord } from '../../types/firebase';
import { NestedPartial } from '../../types';

// type
export type TCreateRecord = Omit<TRecord, 'id' | 'user'>;
export type TUpdateRecord = {
  id: string;
  data: NestedPartial<TCreateRecord>;
};
export type TDeleteRecord = {
  id: string;
};
export type TDateRange = {
  from: string;
  to: string;
};

// actions
const ac = actionCreatorFactory('[record]');
const actions = {
  setData: ac<TRecord[]>('setData'),
  setDateRange: ac<TDateRange>(''),
  create: ac.async<TCreateRecord, {}, {}>('create'),
  update: ac.async<TUpdateRecord, {}, {}>('update'),
  delete: ac.async<TDeleteRecord, {}, {}>('delete'),
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
    records: payload,
  }))
  .case(actions.setDateRange, (state, payload) => ({
    ...state,
    date: { ...payload },
  }));

export const recordReducers = reducers;
