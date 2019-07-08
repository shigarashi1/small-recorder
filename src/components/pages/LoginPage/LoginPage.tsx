import React, { Component } from 'react';

// import styles from './LoginPage.module.scss';

import * as fromUser from '../../../store/users';

import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  login: typeof fromUser.login;
}

interface IState {
  state?: boolean;
}

class LoginPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="LoginPage" />
        <button onClick={this.props.login}>login</button>
      </div>
    );
  }
}

export default LoginPage;
