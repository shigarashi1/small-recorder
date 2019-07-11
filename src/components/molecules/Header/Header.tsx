import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import styles from './Header.module.scss';

import HeaderTitle from '../../atoms/HeaderTitle/HeaderTitle';

interface IProps {
  isLoggedIn: boolean;
  isFixed?: boolean;
  onOpen: () => void;
}

const Header: React.FC<IProps> = (props: IProps) => {
  const { onOpen, isLoggedIn, isFixed } = props;
  const position = isFixed ? 'fixed' : 'static';

  const renderLeftBlock = () => {
    return (
      <React.Fragment>
        <IconButton color="inherit" aria-label="Menu" onClick={onOpen}>
          <Icon>menu_icon</Icon>
        </IconButton>
        <HeaderTitle title="Small Recorder" />
      </React.Fragment>
    );
  };

  const renderRightBlock = () => {
    if (!isLoggedIn) {
      return null;
    }
    return (
      <IconButton aria-owns={'menu-appbar'} aria-haspopup="true" color="inherit">
        <Icon>account_circle</Icon>
      </IconButton>
    );
  };

  return (
    <AppBar id={styles.container} position={position}>
      <Toolbar>{renderLeftBlock()}</Toolbar>
      <Toolbar className={styles.right}>{renderRightBlock()}</Toolbar>
    </AppBar>
  );
};

Header.defaultProps = {
  isFixed: true,
};

export default Header;
