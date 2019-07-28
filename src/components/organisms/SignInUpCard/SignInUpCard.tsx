import React from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './SignInUpCard.module.scss';

import { onChangedValue } from '../../../helpers/text-field';
import Button from '../../atoms/Button/Button';
import SignInForm from '../../molecules/SignInForm/SignInForm';
import SignUpForm from '../../molecules/SignUpForm/SignUpForm';

interface IProps {
  isSignUp: boolean;
  onChangeTab: () => void;
  onSingIn: () => void;
  onSingUp: () => void;
  onCancel: () => void;
  // form
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  onChangedUsername: ReturnType<typeof onChangedValue>;
  onChangedEmail: ReturnType<typeof onChangedValue>;
  onChangedPassword: ReturnType<typeof onChangedValue>;
  onChangedPasswordConfirm: ReturnType<typeof onChangedValue>;
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
        <CardHeader className={styles.header}>Small Recorder</CardHeader>
        <CardContent className={styles.card}>
          <div className={styles.tab}>{renderTab()}</div>
          <div className={styles.form}>{renderForm()}</div>
        </CardContent>
        <CardActions className={styles.action}>
          <Button label="Cancel" onClick={onCancel} />
          {renderActionButton()}
        </CardActions>
      </Card>
    </div>
  );

  function renderTab() {
    const { onChangeTab } = props;
    const tabIndex = isSignUp ? 1 : 0;
    return (
      <Tabs value={tabIndex} onChange={onChangeTab}>
        {[LABEL.signIn, LABEL.signUp].map((v, i) => (
          <Tab key={i} label={v} />
        ))}
      </Tabs>
    );
  }

  function renderForm() {
    const {
      username,
      email,
      password,
      passwordConfirm,
      onChangedUsername,
      onChangedEmail,
      onChangedPassword,
      onChangedPasswordConfirm,
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
        passwordConfirm={passwordConfirm}
        onChangedUsername={onChangedUsername}
        onChangedEmail={onChangedEmail}
        onChangedPassword={onChangedPassword}
        onChangedPasswordConfirm={onChangedPasswordConfirm}
      />
    );
  }

  function renderActionButton() {
    const { onSingIn, onSingUp } = props;
    const label = isSignUp ? LABEL.signUp : LABEL.signIn;
    const onClick = isSignUp ? onSingUp : onSingIn;
    return <Button label={label} onClick={onClick} />;
  }
};

export default SignInUpCard;
