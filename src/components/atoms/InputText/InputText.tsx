import React from 'react';
// import TextField from '@material-ui/core/TextField';

import styles from './InputText.module.scss';

interface IProps {
  value?: string;
  onChange?: (value: string) => void;
}

const InputText: React.FC<IProps> = (props: IProps) => {
  const { value } = props;
  return (
    <div id={styles.container}>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const changedValue = event.target.value;
    if (!props.onChange) {
      return;
    }
    if (changedValue === value) {
      return;
    }
    props.onChange(changedValue);
  }
};

export default InputText;
