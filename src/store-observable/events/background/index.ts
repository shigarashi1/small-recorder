import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, mergeMap } from 'rxjs/operators';
import { AppState } from '../../../store';
import { authActions } from '../../auth';
import { TFirebaseUser } from '../../../lib/firebase';
import { TAuthSetData } from '../../auth/action-reducers';
import { THandleError } from '../../error/action-reducers';
import { errorActions } from '../../error';
import { Nullable } from '../../../types';
import { TUser, TCategory, TTarget } from '../../../types/firebase';
import { userActions } from '../../user';
import { categoryActions } from '../../category';

// actions
const ac = actionCreatorFactory('[listen-background]');

export const backgroundActions = {
  onChangedAuth: ac<Nullable<TFirebaseUser>>('onAutoSignIn'),
  onChangedUser: ac<Nullable<TUser>>('onChangedUser'),
  onChangedCategories: ac<TCategory[]>('onChangedCategories'),
  onChangedTargets: ac<TTarget[]>('onChangedTargets'),
  onChangedRecord: ac<void>('onChangedRecord'), // これは多分使わない。。。
  onThrowError: ac<any>('onThrowError'),
};

const onChangedAuth: Epic<AnyAction, Action<TAuthSetData>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedAuth),
    map(({ payload }) => authActions.setData({ isSignedIn: true, user: payload })),
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

const onChangedTargets: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onChangedTargets),
    mergeMap(({ payload }) => []),
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
  onThrowError,
);
