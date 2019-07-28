import React, { Component } from 'react';

// import styles from './LoginPage.module.scss';

import * as fromUser from '../../../store/users';

import SignInUpCard from '../../organisms/SignInUpCard/SignInUpCard';
import { ISignUpForm } from '../../../types/login-page';
import { onChangedValue } from '../../../helpers/text-field';

interface IProps {
  onSignIn: typeof fromUser.signIn;
}

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

class LoginPage extends Component<IProps, TState> {
  constructor(props: IProps) {
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
      <div className="sample-page">
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
