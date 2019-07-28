import { IListItem } from '../types/components/sidebar';
import { EPath } from '../types';

export const SIDEBAR_LIST: IListItem[][] = [
  [
    {
      text: 'Home',
      icon: 'home',
      path: EPath.Home,
    },
    {
      text: 'Record',
      icon: 'create',
      path: EPath.Record,
    },
    {
      text: 'Report',
      icon: 'date_range',
      path: EPath.Report,
    },
    {
      text: 'Search',
      icon: 'search',
      path: EPath.Search,
    },
    {
      text: 'Setting',
      icon: 'settings',
      path: EPath.Setting,
    },
  ],
  [
    {
      text: 'How to',
      icon: 'import_contacts',
      path: EPath.Manual,
    },
    {
      text: 'Sample',
      icon: 'accessibility_new',
      path: EPath.Sample,
    },
  ],
];
