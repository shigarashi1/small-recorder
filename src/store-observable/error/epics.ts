import { Action, AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { mergeMap, tap } from 'rxjs/operators';
import { AppState } from '../../store';
import { errorActions } from '.';
import { ApiError, SystemError, BusinessError } from '../../models/error';
import { IError } from '../../types/error';
import { loadingActions } from '../utilities';
import Logger from '../../helpers/generals/logger';

// epics
const errorHandler: Epic<AnyAction, Action<IError> | Action<void>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.handle),
    tap(({ payload }) => Logger.log(payload)),
    mergeMap(({ payload }) => {
      const { error } = payload;
      if (error instanceof BusinessError) {
        return [
          errorActions.setBusinessError(error.error),
          // MEMO: rootReducerでfailedの時にfalseにしているが効かないので入れてみた
          loadingActions.end(),
        ];
      }
      if (error instanceof ApiError || error instanceof SystemError) {
        return [
          errorActions.setSystemError(error.error), //
          loadingActions.end(),
        ];
      }
      return [
        errorActions.setSystemError(error), //
        loadingActions.end(),
      ];
    }),
  );

export const errorEpics = combineEpics(errorHandler);
