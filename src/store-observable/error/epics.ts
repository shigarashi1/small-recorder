import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '../../store';
import { errorActions } from '.';
import { ApiError, SystemError, BusinessError } from '../../models/error';
import { IError } from '../../types/error';

// epics
const errorHandler: Epic<AnyAction, Action<IError>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.handle),
    map(({ payload }) => {
      const { error } = payload;
      if (error instanceof BusinessError) {
        return errorActions.setBusinessError(error.error);
      }
      if (error instanceof ApiError || error instanceof SystemError) {
        return errorActions.setSystemError(error.error);
      }
      return errorActions.setSystemError(error.error);
    }),
  );

export const errorEpics = combineEpics(errorHandler);
