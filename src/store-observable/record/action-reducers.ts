import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TRecord } from '../../types/firebase';
import { NestedPartial, TDateRange } from '../../types';

// type
export type TCreateRecord = Omit<TRecord, 'id' | 'user'>;
export type TUpdateRecord = {
  id: string;
  data: NestedPartial<TCreateRecord>;
};
export type TDeleteRecord = {
  id: string;
};

// actions
const ac = actionCreatorFactory('[record]');
const actions = {
  setData: ac<TRecord[]>('setData'),
  setDateRange: ac<TDateRange>('setDateRange'),
  create: ac.async<TCreateRecord, {}, {}>('create'),
  update: ac.async<TUpdateRecord, {}, {}>('update'),
  delete: ac.async<TDeleteRecord, {}, {}>('delete'),
};
export const recordActions = actions;

// reducers
export type TRecordFeatureState = {
  records: TRecord[];
  dateRange: TDateRange;
};

const initialState: TRecordFeatureState = {
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
