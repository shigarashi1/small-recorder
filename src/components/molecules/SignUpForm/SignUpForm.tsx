import React from 'react';

import styles from './SignUpForm.module.scss';

import { onChangedValue } from '../../../helpers/components/text-field';
import TextField from '../../atoms/TextField/TextField';

interface IProps {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  onChangedUsername: ReturnType<typeof onChangedValue>;
  onChangedEmail: ReturnType<typeof onChangedValue>;
  onChangedPassword: ReturnType<typeof onChangedValue>;
  onChangedPasswordConfirm: ReturnType<typeof onChangedValue>;
}

const SignUpForm: React.FC<IProps> = (props: IProps) => {
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

  return (
    <div id={styles.container}>
      <div className={styles.formGroup}>
        <div className={styles.username}>
          <TextField label="Username" value={username} onChange={onChangedUsername} />
        </div>
        <div className={styles.email}>
          <TextField label="Email" value={email} onChange={onChangedEmail} />
        </div>
        <div className={styles.password}>
          <TextField label="Password" value={password} onChange={onChangedPassword} />
        </div>
        <div className={styles.passwordConfirm}>
          <TextField label="Password Confirm" value={passwordConfirm} onChange={onChangedPasswordConfirm} />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
