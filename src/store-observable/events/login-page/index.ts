import { actionCreatorFactory, Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
//
import { TSignIn, TSignUp } from '../../types';
import { AppState } from '../../../store';
import { authActions } from '../../auth';

// actions
const ac = actionCreatorFactory('[listener-loginPage]');

// ===== login page =====
export const loginPageActions = {
  onSignIn: ac<TSignIn>('onSignIn'),
  onSignUp: ac<TSignUp>('onSignUp'),
};

const onSignIn: Epic<AnyAction, Action<Parameters<typeof authActions.signIn.started>[0]>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(loginPageActions.onSignIn),
    map(({ payload }) => authActions.signIn.started({ ...payload })),
  );

const onSignUp: Epic<AnyAction, Action<Parameters<typeof authActions.signUp.started>[0]>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(loginPageActions.onSignUp),
    map(({ payload }) => authActions.signUp.started({ ...payload })),
  );

export const loginPageEpics = combineEpics(onSignIn, onSignUp);
