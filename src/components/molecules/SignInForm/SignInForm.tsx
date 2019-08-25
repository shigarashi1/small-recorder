import React from 'react';

import styles from './SignInForm.module.scss';

import { onChangedValue } from '../../../helpers/components/text-field';
import TextField from '../../atoms/TextField/TextField';

interface IProps {
  email: string;
  password: string;
  onChangedEmail: ReturnType<typeof onChangedValue>;
  onChangedPassword: ReturnType<typeof onChangedValue>;
}

const SignInForm: React.FC<IProps> = (props: IProps) => {
  const { email, password, onChangedEmail, onChangedPassword } = props;
  return (
    <div id={styles.container}>
      <div className={styles.formGroup}>
        <div className={styles.email}>
          <TextField label="Email" value={email} onChange={onChangedEmail} />
        </div>
        <div className={styles.password}>
          <TextField label="Password" value={password} onChange={onChangedPassword} />
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
