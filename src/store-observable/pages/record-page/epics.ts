import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map, filter, debounceTime, delay } from 'rxjs/operators';
import { AppState } from '../../../store';
import { recordPageActions, TRecordPageState } from '../record-page';
import { isValidDate, matchCondition, by } from '../../../helpers/generals';
import { formatDate } from '../../../helpers/generals/date';
import { recordActions } from '../../record';
import { appStateSelector } from '../../state-selector';
import { WrapAction } from '../../../types/actions';
import { THandleError, errorActions } from '../../error/action-reducers';
import { BusinessError } from '../../../models/error';
import { TWarmCode } from '../../../i18n';
import { TDateRange } from '../../../types';
import { TPageStateKey, PartialPageState } from './actions-reducer';
import { INITIAL_RECORD } from '../../../lookups/initial-object';

const load: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.load),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { recordPageState } = stateSelector;
      return { recordPageState };
    }),
    filter(({ recordPageState }) => recordPageState !== undefined),
    map(({ recordPageState }) => {
      const { displayedDate } = recordPageState as TRecordPageState;
      if (!isValidDate(displayedDate)) {
        const today = formatDate();
        return recordActions.setDateRange({ from: today, to: today });
      }
      const date = formatDate(displayedDate);
      return recordActions.setDateRange({ from: date, to: date });
    }),
  );

const changeDate: Epic<AnyAction, Action<TDateRange>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.changeDate),
    filter(({ payload }) => isValidDate(payload.date)),
    debounceTime(400),
    map(({ payload }) => {
      const date = formatDate(payload.date);
      return recordActions.setDateRange({ from: date, to: date });
    }),
  );

const createRecord: Epic<
  AnyAction,
  | Action<void>
  | WrapAction<typeof recordActions.create.started>
  | Action<THandleError>
  | Action<TPageStateKey>
  | Action<boolean>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.createRecord),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { userId, recordDateRange: dateRange, recordPageState } = stateSelector;
      return { userId, dateRange, recordPageState };
    }),
    filter(({ recordPageState }) => !!recordPageState),
    map(({ userId, dateRange, recordPageState }) => {
      const { inputForm, editForm, isEditForm } = recordPageState as TRecordPageState;
      const { categoryId: category, recordText: record } = isEditForm ? editForm : inputForm;
      return { userId, dateRange, category, record, isEditForm };
    }),
    mergeMap(({ userId, dateRange, category, record, isEditForm }) => {
      if (isEditForm && !record) {
        return [
          recordPageActions.setInitialState('editForm'), //
          recordPageActions.changeIsEditForm(false),
        ];
      }
      const errorCode = matchCondition<TWarmCode>(
        [
          ['0000', !userId], //
          ['0000', dateRange.from !== dateRange.to],
          ['0003', !category],
          ['0004', !record],
        ],
        undefined,
      );
      if (errorCode) {
        return [errorActions.handle({ error: new BusinessError(errorCode) })];
      }
      return [recordActions.create.started({ category, date: dateRange.from, record })];
    }),
  );

const createRecordDone: Epic<AnyAction, Action<TPageStateKey> | Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.create.done),
    mergeMap(({ payload }) => [
      recordPageActions.setInitialState('inputForm'), //
      recordPageActions.changeIsEditForm(false),
    ]),
  );

const deleteRecord: Epic<
  AnyAction,
  Action<void> | WrapAction<typeof recordActions.delete.started> | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.deleteRecord),
    debounceTime(200),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const records = stateSelector.records;
      return { payload, records };
    }),
    map(({ payload, records }) => {
      const { id } = payload;
      const errorCode = matchCondition<TWarmCode>(
        [
          ['0005', !id], //
          ['0005', !records.find(by('id')(id))],
        ],
        undefined,
      );
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return recordActions.delete.started({ id });
    }),
  );

const updateRecord: Epic<
  AnyAction,
  Action<TPageStateKey> | WrapAction<typeof recordActions.update.started> | Action<THandleError> | Action<boolean>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.updateRecord),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { recordPageState } = stateSelector;
      return { recordPageState };
    }),
    filter(({ recordPageState }) => !!recordPageState),
    mergeMap(({ recordPageState }) => {
      const { recordId: id, recordText: record, previousRecordText } = (recordPageState as TRecordPageState).editForm;
      if (record === previousRecordText) {
        return [
          recordPageActions.setInitialState('editForm'), //
          recordPageActions.changeIsEditForm(false),
        ];
      }
      const errorCode = matchCondition<TWarmCode>(
        [
          ['0011', !id], //
          ['0011', !record],
        ],
        undefined,
      );
      if (errorCode) {
        return [errorActions.handle({ error: new BusinessError(errorCode) })];
      }
      return [recordActions.update.started({ id, data: { record } })];
    }),
  );

const updateRecordDone: Epic<AnyAction, Action<TPageStateKey> | Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordActions.update.done),
    mergeMap(({ payload }) => [
      recordPageActions.setInitialState('editForm'), //
      recordPageActions.changeIsEditForm(false),
    ]),
  );

const selectModifyRecord: Epic<AnyAction, Action<PartialPageState> | Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.selectModifyRecord),
    filter(({ payload }) => !!payload),
    delay(200),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { recordPageState, records } = stateSelector;
      return { payload, recordPageState, records };
    }),
    mergeMap(({ payload, records }) => {
      const { record } = records.find(by('id')(payload)) || { ...INITIAL_RECORD };
      return [
        recordPageActions.updateState({
          editForm: {
            recordId: payload,
            recordText: record,
            previousRecordText: record,
          },
        }),
        recordPageActions.changeIsEditForm(true),
      ];
    }),
  );

const selectCategoryRecord: Epic<AnyAction, Action<PartialPageState> | Action<boolean>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(recordPageActions.selectCategoryRecord),
    filter(({ payload }) => !!payload),
    delay(200),
    mergeMap(({ payload }) => {
      return [
        recordPageActions.updateState({
          editForm: {
            recordText: '',
            categoryId: payload,
          },
        }),
        recordPageActions.changeIsEditForm(true),
      ];
    }),
  );

export const recordPageEpics = combineEpics(
  load,
  changeDate,
  createRecord,
  createRecordDone,
  updateRecord,
  updateRecordDone,
  deleteRecord,
  selectModifyRecord,
  selectCategoryRecord,
);
