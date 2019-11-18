import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, filter } from 'rxjs/operators';
import { AppState } from '../../../../store';
import { categoryDialogActions } from '.';
import { WrapAction } from '../../../../types/actions';
import { categoryActions } from '../../../category';
import { appStateSelector } from '../../../state-selector';
import { matchCondition, by } from '../../../../helpers/generals';
import { errorActions } from '../../../error';
import { BusinessError } from '../../../../models/error';
import { THandleError } from '../../../error/action-reducers';
import { TWarmCode } from '../../../../i18n';
import { TCategoryDialog } from './action-reducers';

// epics
const show: Epic<AnyAction, Action<{ key: keyof TCategoryDialog; value: string }>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(categoryDialogActions.show),
    filter(({ payload }) => !!payload),
    map(({ payload }) => {
      const id = payload || '';
      const match = appStateSelector(store.value).categories.find(by('id')(id));
      return { match };
    }),
    filter(({ match }) => !!match),
    map(({ match }) => {
      const { name } = match || { name: '' };
      return categoryDialogActions.setState({ key: 'name', value: name });
    }),
  );

// const setState: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
//   action$.pipe(
//     ofAction(categoryDialogActions.setState),
//     map(({ payload }) => payload),
//     mergeMap(action => []),
//   );

const create: Epic<
  AnyAction,
  Action<void> | WrapAction<typeof categoryActions.create.started> | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryDialogActions.create),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { userId, categories, categoryDialogData } = stateSelector;
      return { payload, userId, categories, categoryDialogData };
    }),
    map(({ userId, categories, categoryDialogData }) => {
      const { name } = categoryDialogData;
      const errorCode = matchCondition<TWarmCode>(
        [
          ['0000', !userId], //
          ['0010', !!categories.find(v => !v.hasDeleted && v.name === name)],
        ],
        undefined,
      );
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return categoryActions.create.started({ name });
    }),
  );

const createDone: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.create.done),
    map(({ payload }) => categoryDialogActions.close()),
  );

const update: Epic<
  AnyAction,
  Action<void> | WrapAction<typeof categoryActions.update.started> | Action<THandleError>,
  AppState
> = (action$, store) =>
  action$.pipe(
    ofAction(categoryDialogActions.update),
    map(({ payload }) => {
      const stateSelector = appStateSelector(store.value);
      const { userId, categories, categoryDialogData } = stateSelector;
      const previous = categories.find(by('id')(categoryDialogData.id));
      return { payload, userId, categories, categoryDialogData, previous };
    }),
    filter(({ categoryDialogData, previous }) => !!previous && previous.name !== categoryDialogData.name),
    map(({ userId, categories, categoryDialogData }) => {
      const { id, name } = categoryDialogData;
      const errorCode = matchCondition<TWarmCode>(
        [
          ['0000', !userId], //
          ['0010', !!categories.find(v => !v.hasDeleted && v.name === name)],
        ],
        undefined,
      );
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return categoryActions.update.started({ id, data: { name } });
    }),
  );

const updateDone: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(categoryActions.update.done),
    map(({ payload }) => categoryDialogActions.close()),
  );

export const categoryDialogEpics = combineEpics(show, create, createDone, update, updateDone);
