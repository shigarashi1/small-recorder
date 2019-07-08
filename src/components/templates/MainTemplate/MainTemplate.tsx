import React, { Component } from 'react';

import styles from './MainTemplate.module.scss';

import AppRouter from '../../AppRouter';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import Header from '../../molecules/Header/Header';

interface IProps {
  isLoggedIn: boolean;
}

interface IState {
  hasOpen: boolean;
}

class MainTemplate extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasOpen: false };
  }

  onChangeSidebar = () => {
    this.setState({ hasOpen: !this.state.hasOpen });
  };

  render() {
    const { isLoggedIn } = this.props;
    const { hasOpen } = this.state;
    return (
      <div id={styles.template}>
        <Header isLoggedIn={isLoggedIn} onOpen={this.onChangeSidebar} />
        <Sidebar hasOpen={hasOpen} onOpenClose={this.onChangeSidebar} />
        <div className={styles.container}>
          <AppRouter />
        </div>
      </div>
    );
  }
}

export default MainTemplate;
