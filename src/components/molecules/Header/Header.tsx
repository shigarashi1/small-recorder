import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from './Header.module.scss';

import { THeaderProps } from '../../../containers/components/Header';

type TProps = THeaderProps & {
  isFixed?: boolean;
};

const Header: React.FC<TProps> = props => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const onOpen = () => {
    props.onTogleSidebar(true);
  };

  const onSignOut = () => {
    props.onSignOut();
  };

  return (
    <React.Fragment>
      <AppBar id={styles.container} position={props.isFixed ? 'fixed' : 'static'}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={onOpen}>
            <Icon>menu_icon</Icon>
          </IconButton>
          <Typography variant="h6" color="inherit">
            Small Recorder
          </Typography>
        </Toolbar>
        <Toolbar className={styles.right}>
          <IconButton onClick={onOpenMenu} aria-owns={'menu-appbar'} aria-haspopup="true" color="inherit">
            <Icon>account_circle</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu id="icon-menu" anchorEl={anchorEl} keepMounted={true} open={Boolean(anchorEl)} onClose={onCloseMenu}>
        <MenuItem onClick={onCloseMenu}>User Profile</MenuItem>
        <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

Header.defaultProps = {
  isFixed: true,
};

export default Header;
