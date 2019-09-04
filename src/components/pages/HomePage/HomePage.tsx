import React, { Component } from 'react';

// import styles from './HomePage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/HomePage';

interface IState {
  state?: boolean;
}

type TProps = TPageProps;

class HomePage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    const { onSignOut } = this.props;
    return (
      <div className="sample-page">
        <PageTitle title="HomePage" />
        <button onClick={onSignOut}>Signout</button>
      </div>
    );
  }
}

export default HomePage;
