import { AppState } from '../..';
import { TSidebarState } from '../../utilities/sidebar/state';
import { createSelector } from 'reselect';

const sidebarSelector = (state: AppState): TSidebarState => state.utils.sidebar;

export const getSidebar = {
  hasOpen: createSelector(
    sidebarSelector,
    state => state.hasOpen,
  ),
};
