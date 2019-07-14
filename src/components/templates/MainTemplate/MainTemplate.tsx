import React, { Component } from 'react';

import styles from './MainTemplate.module.scss';

import * as fromUser from '../../../store/users';
import * as fromUtility from '../../../store/utility';

import AppRouter from '../../AppRouter';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import Header from '../../molecules/Header/Header';
import PopupNumberKeyboard from '../../molecules/PopupNumberKeyboard/PopupNumberKeyboard';
import { TKeyboardKey } from '../../../types/number-keyboard';

interface IProps {
  isLoggedIn: boolean;
  logout: typeof fromUser.signOut;
  hasOpenKeyboard: boolean;
  currentValue: string;
  pushKeyboard: typeof fromUtility.pushKeyKeyboard;
}

type TProps = IProps;

interface IState {
  hasOpen: boolean;
}

const initialState: IState = {
  hasOpen: false,
};

class MainTemplate extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  onChangeSidebar = () => {
    this.setState({ hasOpen: !this.state.hasOpen });
  };

  onPushKeyboard = (key: TKeyboardKey) => {
    this.props.pushKeyboard(key);
  };

  render() {
    return (
      <div id={styles.template}>
        {this.renderUtilities()}
        <div className={styles.container}>
          <AppRouter />
        </div>
      </div>
    );
  }

  renderUtilities() {
    const { isLoggedIn, hasOpenKeyboard, currentValue } = this.props;
    const { hasOpen } = this.state;
    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} onOpen={this.onChangeSidebar} />
        <Sidebar hasOpen={hasOpen} onOpenClose={this.onChangeSidebar} />
        <PopupNumberKeyboard hasOpen={hasOpenKeyboard} onPush={this.onPushKeyboard} />
        <p className={styles.currentValue}>{currentValue}</p>
      </React.Fragment>
    );
  }
}

export default MainTemplate;
