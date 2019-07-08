import React, { Component } from 'react';

// import styles from './HomePage.module.scss';

import * as fromUser from '../../../store/users';
import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  logout: typeof fromUser.signOut;
}

interface IState {
  state?: boolean;
}

class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    const { logout } = this.props;
    return (
      <div className="sample-page">
        <PageTitle title="HomePage" />
        <button onClick={logout}>Logout</button>
      </div>
    );
  }
}

export default HomePage;
