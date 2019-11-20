import { merge } from 'lodash';
import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { TRecordPageState } from '.';
import { NestedPartial } from '../../../types';

// actions
const ac = actionCreatorFactory('[---- Record Page]');

export const actions = {
  load: ac<void>('load'),
  changeDate: ac<{ date: Date }>('changeDate'),
  selectModifyRecord: ac<string>('selectModifyRecord'),
  selectCategoryRecord: ac<string>('selectCategoryRecord'),
  changeIsEditForm: ac<boolean>('changeIsEditForm'),
  updateState: ac<PartialPageState>('updateState'),
  setInitialState: ac<TPageStateKey>('setInitialState'),
  setInputFormState: ac<{ key: TInputFormKey; value: string }>('setInputFormState'),
  setEditFormState: ac<{ key: TEditFormKey; value: string }>('setEditFormState'),
  createRecord: ac<void>('createRecord'),
  deleteRecord: ac<{ id: string }>('deleteRecord'),
  updateRecord: ac<void>('updateRecord'),
};
export const recordPageActions = actions;

// reducers
const initialState: TRecordPageState = {
  displayedDate: new Date(),
  isEditForm: false,
  inputForm: {
    categoryId: '',
    recordText: '',
  },
  editForm: {
    categoryId: '',
    recordText: '',
    recordId: '',
    previousRecordText: '',
  },
};

export type TPageStateKey = keyof Omit<typeof initialState, 'displayedDate' | 'isEditForm'>;
export type TInputFormKey = keyof typeof initialState.inputForm;
export type TEditFormKey = keyof typeof initialState.editForm;
export type PartialPageState = NestedPartial<TRecordPageState>;

const reducers = reducerWithInitialState(initialState)
  .case(actions.changeDate, (state, payload) => ({ ...state, displayedDate: payload.date }))
  .case(actions.changeIsEditForm, (state, payload) => ({ ...state, isEditForm: payload }))
  .case(actions.setInitialState, (state, payload) => ({
    ...state,
    [payload]: { ...initialState[payload] },
  }))
  .case(actions.updateState, (state, payload) => ({
    ...state,
    ...merge(state, payload),
  }))
  .case(actions.setInputFormState, (state, payload) => ({
    ...state,
    inputForm: { ...state.inputForm, [payload.key]: payload.value },
  }))
  .case(actions.setEditFormState, (state, payload) => ({
    ...state,
    editForm: { ...state.editForm, [payload.key]: payload.value },
  }));
export const recordPageReducers = reducers;
