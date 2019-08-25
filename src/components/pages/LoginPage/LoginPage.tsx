import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import styles from './LoginPage.module.scss';

import SignInUpCard from '../../organisms/SignInUpCard/SignInUpCard';
import { TPageProps } from '../../../containers/pages/LoginPage';
import { ISignUpForm } from '../../../types/pages/login-page';
import { onChangedValue } from '../../../helpers/components/text-field';
import { BREAK_POINT } from '../../../lookups/page-layout';

type TProps = TPageProps;

interface IState {
  isSignUp: boolean;
}

type TState = IState & ISignUpForm;

const initialState: TState = {
  isSignUp: false,
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

class LoginPage extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = initialState;
  }

  render() {
    const { isSignUp, username, email, password, confirmation } = this.state;
    const {
      onChangeTab,
      onSignIn,
      onSignUp,
      onCancel,
      changeUsername,
      changeEmail,
      changePassword,
      changeConfirmation,
    } = this;

    const onChangedUsername = onChangedValue(this.state.username, changeUsername);
    const onChangedEmail = onChangedValue(this.state.username, changeEmail);
    const onChangedPassword = onChangedValue(this.state.username, changePassword);
    const onChangedConfirmation = onChangedValue(this.state.username, changeConfirmation);

    return (
      <div id={styles.container} style={{ height: window.innerHeight }}>
        <Grid container={true} spacing={2} alignContent="space-around" justify="center">
          <Grid item={true} xs={11} sm={8} md={BREAK_POINT.sm} lg={BREAK_POINT.sm} xl={BREAK_POINT.md}>
            <SignInUpCard
              onChangeTab={onChangeTab}
              isSignUp={isSignUp}
              username={username}
              onSignIn={onSignIn}
              onSignUp={onSignUp}
              onCancel={onCancel}
              email={email}
              password={password}
              passwordConfirmation={confirmation}
              onChangedUsername={onChangedUsername}
              onChangedEmail={onChangedEmail}
              onChangedPassword={onChangedPassword}
              onChangedConfirmation={onChangedConfirmation}
            />
          </Grid>
        </Grid>
      </div>
    );
  }

  onChangeTab = () => {
    const { isSignUp } = this.state;
    this.setState({ isSignUp: !isSignUp });
  };

  onSignIn = () => {
    const { onSignIn } = this.props;
    // FIXME:
    const { email, password } = this.state;
    console.log('sign in', { email, password });
    onSignIn();
  };

  onSignUp = () => {
    // FIXME:
    const { username, email, password, confirmation } = this.state;
    console.log('sign up', { username, email, password, confirmation });
  };

  onCancel = () => {
    // FIXME:
    this.setState({ ...initialState });
  };

  changeUsername = (v: string) => {
    this.setState({ username: v });
  };

  changeEmail = (v: string) => {
    this.setState({ email: v });
  };

  changePassword = (v: string) => {
    this.setState({ password: v });
  };

  changeConfirmation = (v: string) => {
    this.setState({ confirmation: v });
  };
}

export default LoginPage;
