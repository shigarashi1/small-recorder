import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '../../../store';
import { authActions } from '../../auth';
import { TFirebaseUser } from '../../../lib/firebase';
import { TAuthSetData } from '../../auth/action-reducers';
import { THandleError } from '../../error/action-reducers';
import { errorActions } from '../../error';
import { Nullable } from '../../../types';
import { TUser, TCategory, TTarget, TRecord } from '../../../types/firebase';
import { userActions } from '../../user';
import { categoryActions } from '../../category';
import { targetActions } from '../../target';
import { recordActions } from '../../record';

// actions
const ac = actionCreatorFactory('[listen-background]');

export const backgroundActions = {
  onChangedAuth: ac<Nullable<TFirebaseUser>>('onAutoSignIn'),
  onChangedUser: ac<Nullable<TUser>>('onChangedUser'),
  onChangedCategories: ac<TCategory[]>('onChangedCategories'),
  onChangedTargets: ac<TTarget[]>('onChangedTargets'),
  onChangedRecords: ac<TRecord[]>('onChangedRecords'),
  onThrowError: ac<any>('onThrowError'),
};

const onChangedAuth: Epic<AnyAction, Action<TAuthSetData>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedAuth),
    map(({ payload }) => authActions.setData({ isSignedIn: !!payload, user: payload })),
  );

const onChangedUser: Epic<AnyAction, Action<Nullable<TUser>>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedUser),
    map(({ payload }) => userActions.setData(payload)),
  );

const onChangedCategories: Epic<AnyAction, Action<TCategory[]>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedCategories),
    map(({ payload }) => categoryActions.setData(payload)),
  );

const onChangedTargets: Epic<AnyAction, Action<TTarget[]>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedTargets),
    map(({ payload }) => targetActions.setData(payload)),
  );

const onChangedRecords: Epic<AnyAction, Action<TRecord[]>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedRecords),
    map(({ payload }) => recordActions.setData(payload)),
  );

const onThrowError: Epic<AnyAction, Action<THandleError>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onThrowError),
    map(({ payload }) => errorActions.handle({ error: payload })),
  );

export const backgroundEpics = combineEpics(
  onChangedAuth,
  onChangedUser,
  onChangedCategories,
  onChangedTargets,
  onChangedRecords,
  onThrowError,
);
