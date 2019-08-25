import React from 'react';

import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './SignInUpCard.module.scss';

import { onChangedValue } from '../../../helpers/components/text-field';
import Button from '../../atoms/Button/Button';
import SignInForm from '../../molecules/SignInForm/SignInForm';
import SignUpForm from '../../molecules/SignUpForm/SignUpForm';
import AppBar from '@material-ui/core/AppBar';
import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  isSignUp: boolean;
  onChangeTab: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onCancel: () => void;
  // form
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  onChangedUsername: ReturnType<typeof onChangedValue>;
  onChangedEmail: ReturnType<typeof onChangedValue>;
  onChangedPassword: ReturnType<typeof onChangedValue>;
  onChangedConfirmation: ReturnType<typeof onChangedValue>;
}

const LABEL = {
  signIn: 'Sign In',
  signUp: 'Sign Up',
};

const SignInUpCard: React.FC<IProps> = (props: IProps) => {
  const { isSignUp, onCancel } = props;
  return (
    <div id={styles.container}>
      <Card className={styles.card}>
        <CardContent className={styles.card}>
          <PageTitle title="Small Recorder" />
          {/* <CardHeader className={styles.header} title="Small Recorder" /> */}
          <div className={styles.tabGroup}>{renderTab()}</div>
          <div className={styles.form}>{renderForm()}</div>
        </CardContent>
        <CardActions className={styles.action}>
          <Button label="Cancel" onClick={onCancel} variant="contained" />
          {renderActionButton()}
        </CardActions>
      </Card>
    </div>
  );

  function renderTab() {
    const { onChangeTab } = props;
    const tabIndex = isSignUp ? 1 : 0;
    return (
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={onChangeTab} variant="fullWidth">
          {[LABEL.signIn, LABEL.signUp].map((v, i) => (
            <Tab key={i} label={v} />
          ))}
        </Tabs>
      </AppBar>
    );
  }

  function renderForm() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      onChangedUsername,
      onChangedEmail,
      onChangedPassword,
      onChangedConfirmation,
    } = props;

    if (!isSignUp) {
      return (
        <SignInForm
          email={email}
          password={password}
          onChangedEmail={onChangedEmail}
          onChangedPassword={onChangedPassword}
        />
      );
    }

    return (
      <SignUpForm
        username={username}
        email={email}
        password={password}
        passwordConfirm={passwordConfirmation}
        onChangedUsername={onChangedUsername}
        onChangedEmail={onChangedEmail}
        onChangedPassword={onChangedPassword}
        onChangedPasswordConfirm={onChangedConfirmation}
      />
    );
  }

  function renderActionButton() {
    const { onSignIn: onSingIn, onSignUp: onSingUp } = props;
    const label = isSignUp ? LABEL.signUp : LABEL.signIn;
    const onClick = isSignUp ? onSingUp : onSingIn;
    return <Button label={label} onClick={onClick} variant="contained" color="primary" />;
  }
};

export default SignInUpCard;
