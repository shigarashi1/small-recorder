import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, delay } from 'rxjs/operators';
import { AppState } from '../../store';
import { authActions } from '.';

const signIn: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signIn.started),
    delay(300),
    mergeMap(action => []),
  );

const signUp: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signOut.started),
    delay(300),
    mergeMap(action => []),
  );

const signOut: Epic<AnyAction, Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(authActions.signOut.started),
    delay(300),
    mergeMap(action => []),
  );

export const authEpics = combineEpics(signIn, signUp, signOut);
