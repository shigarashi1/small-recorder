import React from 'react';

import styles from './TextWithLabel.module.scss';
import Label from '../../atoms/Label/Label';
import TextField, { TProps as TTextFieldProps } from '../../atoms/TextField/TextField';

interface IProps {
  label: string;
}

type TProps = TTextFieldProps & IProps;

const TextWithLabel: React.FC<TProps> = (props: TProps) => {
  const { label } = props;
  return (
    <div id={styles.container}>
      <div className={styles.label}>
        <Label label={label} styles={['textField']} />
      </div>
      <div className={styles.text}>
        <TextField {...props} label="" />
      </div>
    </div>
  );
};

export default TextWithLabel;
