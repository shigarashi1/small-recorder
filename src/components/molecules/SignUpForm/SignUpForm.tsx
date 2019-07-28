import React from 'react';

import styles from './SignUpForm.module.scss';
import TextWithLabel from '../TextWithLabel/TextWithLabel';

import { onChangedValue } from '../../../helpers/text-field';

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
      <div className={styles.username}>
        <TextWithLabel label="Username" value={username} onChange={onChangedUsername} />
      </div>
      <div className={styles.email}>
        <TextWithLabel label="Email" value={email} onChange={onChangedEmail} />
      </div>
      <div className={styles.password}>
        <TextWithLabel label="Password" value={password} onChange={onChangedPassword} />
      </div>
      <div className={styles.passwordConfirm}>
        <TextWithLabel label="Password Confirm" value={passwordConfirm} onChange={onChangedPasswordConfirm} />
      </div>
    </div>
  );
};

export default SignUpForm;
