import actionCreatorFactory, { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '../../../store';
import { authActions } from '../../auth';
import { TFirebaseUser } from '../../../lib/firebase';
import { TAuthSetData } from '../../auth/action-reducers';

// actions
const ac = actionCreatorFactory('[listen-background]');

export const backgroundActions = {
  onAutoSignIn: ac<TFirebaseUser>('onAutoSignIn'),
};

const onAutoSignIn: Epic<AnyAction, Action<TAuthSetData>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(backgroundActions.onAutoSignIn),
    map(({ payload }) => authActions.setData({ isSignedIn: true, user: payload })),
  );

export const backgroundEpics = combineEpics(onAutoSignIn);
