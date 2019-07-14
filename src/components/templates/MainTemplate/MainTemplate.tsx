import React, { Component } from 'react';

import styles from './MainTemplate.module.scss';

import AppRouter from '../../AppRouter';
import Sidebar from '../../organisms/Sidebar/Sidebar';
import Header from '../../molecules/Header/Header';

interface IProps {
  isLoggedIn: boolean;
}

type TProps = IProps;

interface IState {
  hasOpen: boolean;
  text: string;
}

const initialState: IState = {
  hasOpen: false,
  text: '',
};

class MainTemplate extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
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

  onPush = (value: string) => {
    this.setState({ text: value });
  };

  renderUtilities() {
    const { isLoggedIn } = this.props;
    const { hasOpen } = this.state;
    return (
      <React.Fragment>
        <Header isLoggedIn={isLoggedIn} onOpen={this.onChangeSidebar} />
        <Sidebar hasOpen={hasOpen} onOpenClose={this.onChangeSidebar} />
        {/* <p>{text}</p>
        <DraggableNumberKeyboard value={text} isAbsolute={true} onPush={this.onPush} /> */}
      </React.Fragment>
    );
  }
}

export default MainTemplate;
