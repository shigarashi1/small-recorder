import React from 'react';
import Icon from '@material-ui/core/Icon';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import styles from './Header.module.scss';

import { THeaderProps } from '../../../containers/components/Header';

type TProps = THeaderProps & {
  isFixed?: boolean;
};

const Header: React.FC<TProps> = ({ isFixed, onTogleSidebar }) => {
  const position = isFixed ? 'fixed' : 'static';

  const onOpen = () => {
    onTogleSidebar(true);
  };

  return (
    <AppBar id={styles.container} position={position}>
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu" onClick={onOpen}>
          <Icon>menu_icon</Icon>
        </IconButton>
        <Typography variant="h6" color="inherit">
          Small Recorder
        </Typography>
      </Toolbar>
      <Toolbar className={styles.right}>
        <IconButton aria-owns={'menu-appbar'} aria-haspopup="true" color="inherit">
          <Icon>account_circle</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Header.defaultProps = {
  isFixed: true,
};

export default Header;
