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
    const { isLoggedIn } = this.props;
    const { hasOpen } = this.state;
    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} onOpen={this.onChangeSidebar} />
        <Sidebar hasOpen={hasOpen} onOpenClose={this.onChangeSidebar} />
      </React.Fragment>
    );
  }
}

export default MainTemplate;
