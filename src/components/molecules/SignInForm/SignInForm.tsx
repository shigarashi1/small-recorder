import React from 'react';

import styles from './SignInForm.module.scss';
import TextWithLabel from '../TextWithLabel/TextWithLabel';

import { onChangedValue } from '../../../helpers/text-field';

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
      <div className={styles.email}>
        <TextWithLabel label="Email" value={email} onChange={onChangedEmail} />
      </div>
      <div className={styles.password}>
        <TextWithLabel label="Password" value={password} onChange={onChangedPassword} />
      </div>
    </div>
  );
};

export default SignInForm;
