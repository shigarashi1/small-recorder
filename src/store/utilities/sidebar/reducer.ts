import { ActionType, TSidebarActions } from './actions';
import { TSidebarState, INITIAL_SIDEBAR_STATE } from './state';

export function sidebarReducer(state: TSidebarState = INITIAL_SIDEBAR_STATE, action: TSidebarActions): TSidebarState {
  switch (action.type) {
    case ActionType.TOGLE:
      return { ...state, hasOpen: !state.hasOpen };
  }
  return state;
}
