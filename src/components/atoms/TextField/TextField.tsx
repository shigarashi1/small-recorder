import React from 'react';
import MTextField, { TextFieldProps } from '@material-ui/core/TextField';

import styles from './TextField.module.scss';

type TInputType = string | number;

interface IProps<T = TInputType> {
  value: T;
  label?: string;
  id?: string | number;
}

type TProps = TextFieldProps & IProps;

const TextField: React.FC<TProps> = (props: TProps) => {
  const { value, label } = props;

  return (
    <div id={styles.container}>
      <MTextField
        {...props}
        id={getId()}
        label={label}
        className={styles.input}
        value={value}
        onChange={props.onChange}
      />
    </div>
  );

  function getId(): string {
    const { id } = props;
    return typeof id === 'string' ? id : String(id);
  }
};

TextField.defaultProps = {
  label: '',
};

export default TextField;
