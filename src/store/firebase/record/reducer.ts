import { ActionType, TRecordActions } from './actions';
import { TRecordState, INITIAL_RECORD_STATE } from './state';

export function recordReducer(state: TRecordState = INITIAL_RECORD_STATE, action: TRecordActions): TRecordState {
  switch (action.type) {
    case ActionType.CREATE:
      return { ...state };

    case ActionType.READ:
      return { ...state };

    case ActionType.UPDATE:
      return { ...state };

    case ActionType.DEL:
      return { ...state };
  }
  return state;
}
