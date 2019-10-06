import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, delay, tap } from 'rxjs/operators';
//
import { TSignIn, TSignUp } from '../../types';
import { AppState } from '../../../store';
import Logger from '../../../helpers/generals/logger';

// actions
const ac = actionCreatorFactory('[listener-loginPage]');

// ===== login page =====
export const loginPageActions = {
  onSignIn: ac<TSignIn>('onSignIn'),
  onSignUp: ac<TSignUp>('onSignUp'),
};

const onSignIn: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(loginPageActions.onSignIn),
    tap(x => Logger.log('signIn', x.type)),
    delay(300),
    mergeMap(action => []),
  );

const onSignUp: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(loginPageActions.onSignUp),
    delay(300),
    mergeMap(action => []),
  );

export const loginPageEpics = combineEpics(onSignIn, onSignUp);
