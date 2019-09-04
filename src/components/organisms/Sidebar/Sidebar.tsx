import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

import styles from './Sidebar.module.scss';

import { IListItem } from '../../../types/components/sidebar';
import { SIDEBAR_LIST } from '../../../lookups/sidebar';
import { EPath } from '../../../types';
import { TSidebarProps } from '../../../containers/components/Sidebar';

type TProps = RouteComponentProps & TSidebarProps;

const Sidebar: React.FC<TProps> = (props: TProps) => {
  const { history, hasOpen } = props;

  const togleHasOpen = () => {
    props.onTogleSidebar();
  };

  const activeRoute = (path: EPath): boolean => {
    const pathname = window.location.pathname;
    return pathname === path ? true : false;
  };

  const getClassName = (path: EPath): string => {
    const isActive = activeRoute(path);
    return isActive ? styles.listItemActive : styles.listItem;
  };

  const onClickMenu = (path: EPath) => (event: React.MouseEvent<HTMLDivElement>): void => {
    if (window.location.pathname === path) {
      return;
    }
    history.push(path);
    togleHasOpen();
  };

  const renderListItem = (menuList: IListItem[]) => {
    return menuList.map(menu => {
      return (
        <ListItem button={true} key={menu.text} className={getClassName(menu.path)} onClick={onClickMenu(menu.path)}>
          {renderIcon(menu.icon)}
          <ListItemText primary={menu.text} />
        </ListItem>
      );
    });
  };

  const renderSidebarContent = () => {
    return (
      <div className={styles.list}>
        <Toolbar>
          <IconButton onClick={togleHasOpen}>
            <Icon>chevron_right_icon</Icon>
          </IconButton>
        </Toolbar>
        {SIDEBAR_LIST.map((menuList, index) => {
          return (
            <React.Fragment key={index}>
              <Divider />
              {renderListItem(menuList)}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) {
      return null;
    }

    return (
      <ListItemIcon>
        <Icon>{iconName}</Icon>
      </ListItemIcon>
    );
  };

  // const renderSidebarOver = () => {
  //   return (
  //     <Drawer variant="permanent" open={props.hasOpen} onClose={props.onOpenClose}>
  //       {renderSidebarContent()}
  //     </Drawer>
  //   );
  // };

  const renderSidebarUnder = () => {
    return (
      <Drawer variant="temporary" anchor="right" open={hasOpen} onClose={togleHasOpen}>
        {renderSidebarContent()}
      </Drawer>
    );
  };

  return (
    <nav>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp={true} implementation="css">
        {renderSidebarUnder()}
      </Hidden>
      {/* <Hidden mdDown={true} implementation="css">
          {this.renderSidebarOver()}
        </Hidden> */}
    </nav>
  );
};

export default withRouter(Sidebar);
