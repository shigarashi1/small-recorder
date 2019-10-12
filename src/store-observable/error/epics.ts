import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, map } from 'rxjs/operators';
import { AppState } from '../../store';
import { errorActions } from '.';
import { ApiError } from '../../models/ApiError';
import { IError } from '../../types/error';

// epics
const errorHandler: Epic<AnyAction, Action<void> | Action<IError>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.handle),
    map(({ payload }) => {
      const { error, option } = payload;
      if (error instanceof ApiError) {
        return errorActions.setSystemError(error.error[0]);
      }

      return errorActions.setSystemError(error.error[0]);
    }),
  );

export const errorEpics = combineEpics(errorHandler);
