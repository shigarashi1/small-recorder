import React, { Component } from 'react';

import styles from './MainTemplate.module.scss';

import * as fromUser from '../../../store/users';
import * as fromUtility from '../../../store/utility';

import AppRouter from '../../AppRouter';
import { TKeyboardKey } from '../../../types/number-keyboard';
import DraggableNumberKeyboard from '../../atoms/DraggableNumberKeyboard/DraggableNumberKeyboard';
import Header from '../../../containers/components/Header/Header';
import Sidebar from '../../../containers/components/Sidebar/Sidebar';

interface IProps {
  isLoggedIn: boolean;
  logout: typeof fromUser.signOut;
  hasOpenKeyboard: boolean;
  currentValue: string;
  pushKeyboard: typeof fromUtility.pushKeyKeyboard;
}

type TProps = IProps;

const MainTemplate: React.FC<TProps> = (props: TProps) => {
  const onPushKeyboard = (key: TKeyboardKey) => {
    props.pushKeyboard(key);
  };

  return (
    <div id={styles.template}>
      <Header />
      <div className={styles.container}>
        <AppRouter />
      </div>
      {renderUtilities()}
    </div>
  );

  function renderUtilities() {
    const { hasOpenKeyboard, currentValue } = props;
    return (
      <React.Fragment>
        <Sidebar />
        <DraggableNumberKeyboard hasOpen={hasOpenKeyboard} onPush={onPushKeyboard} />
        <p className={styles.currentValue}>{currentValue}</p>
      </React.Fragment>
    );
  }
};

export default MainTemplate;
