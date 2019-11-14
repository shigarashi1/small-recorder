import { actionCreatorFactory, Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, debounceTime } from 'rxjs/operators';
//
import { AppState } from '../../../store';
import { authActions } from '../../auth';
import { TSignIn, TSignUp } from '../../auth/action-reducers';
import { WrapAction } from '../../types';
import { matchCondition } from '../../../helpers/generals';
import { TWarmCode } from '../../../i18n';
import { errorActions } from '../../error';
import { BusinessError } from '../../../models/error';
import { THandleError } from '../../error/action-reducers';

// actions
const ac = actionCreatorFactory('[listen-loginPage]');

// ===== login page =====
export const loginPageActions = {
  onSignIn: ac<TSignIn>('onSignIn'),
  onSignUp: ac<TSignUp>('onSignUp'),
};

const onSignIn: Epic<AnyAction, WrapAction<typeof authActions.signIn.started> | Action<THandleError>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(loginPageActions.onSignIn),
    map(({ payload }) => {
      const { email, password } = payload;
      const errorCode = matchCondition<TWarmCode>([['0006', !email], ['0009', !password]], undefined);
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return authActions.signIn.started({ ...payload });
    }),
  );

const onSignUp: Epic<AnyAction, WrapAction<typeof authActions.signUp.started> | Action<THandleError>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(loginPageActions.onSignUp),
    debounceTime(200),
    map(({ payload }) => {
      const { email, password, confirmation, username } = payload;
      const errorCode = matchCondition<TWarmCode>(
        [['0006', !email], ['0002', !username], ['0008', password.length < 8], ['0001', password !== confirmation]],
        undefined,
      );
      if (errorCode) {
        return errorActions.handle({ error: new BusinessError(errorCode) });
      }
      return authActions.signUp.started({ ...payload });
    }),
  );

export const loginPageEpics = combineEpics(onSignIn, onSignUp);
