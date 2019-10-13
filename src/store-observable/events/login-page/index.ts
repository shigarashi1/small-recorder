import { actionCreatorFactory, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
//
import { AppState } from '../../../store';
import { authActions } from '../../auth';
import { TSignIn, TSignUp } from '../../auth/action-reducers';
import { WrapAction } from '../../types';

// actions
const ac = actionCreatorFactory('[listen-loginPage]');

// ===== login page =====
export const loginPageActions = {
  onSignIn: ac<TSignIn>('onSignIn'),
  onSignUp: ac<TSignUp>('onSignUp'),
};

const onSignIn: Epic<AnyAction, WrapAction<typeof authActions.signIn.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(loginPageActions.onSignIn),
    map(({ payload }) => authActions.signIn.started({ ...payload })),
  );

const onSignUp: Epic<AnyAction, WrapAction<typeof authActions.signUp.started>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(loginPageActions.onSignUp),
    map(({ payload }) => authActions.signUp.started({ ...payload })),
  );

export const loginPageEpics = combineEpics(onSignIn, onSignUp);
