import React from 'react';
import MTextField, { TextFieldProps } from '@material-ui/core/TextField';

import styles from './TextField.module.scss';
import { TInputType } from '../../../types/components/text-field';

interface IProps<T = TInputType> {
  value: T;
  label?: string;
  id?: string | number;
  isWithLabel?: boolean;
}

export type TProps = TextFieldProps & IProps;

const TextField: React.FC<TProps> = (props: TProps) => {
  const { value, label } = props;

  return (
    <div id={styles.container}>
      {/* {renderSideLabel()} */}
      <MTextField
        className={styles.input}
        {...props}
        id={getId()}
        label={label}
        value={value}
        onChange={props.onChange}
      />
    </div>
  );

  function getId(): string {
    const { id } = props;
    return typeof id === 'string' ? id : String(id);
  }

  // function renderSideLabel() {
  //   if (!isWithLabel || !label) {
  //     return null;
  //   }
  //   return <Label label={label} styles={['textField']} />;
  // }
};

TextField.defaultProps = {
  label: '',
};

export default TextField;
