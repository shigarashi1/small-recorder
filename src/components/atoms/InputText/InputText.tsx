import React from 'react';

import styles from './InputText.module.scss';

export interface IProps {
  id?: string;
  value?: string;
  onChange?: (v: string) => void;
  // option
  isNumber?: boolean;
}

const InputText: React.FC<IProps> = (props: IProps) => {
  const { value, isNumber } = props;

  return (
    <div id={styles.container}>
      <input className={getClassName()} type="text" value={value} onChange={onChange} />
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

  function getClassName(): string {
    const baseClasses = [styles.input];
    if (isNumber) {
      baseClasses.push(styles.number);
    }
    return baseClasses.join(' ');
  }
};

InputText.defaultProps = {
  isNumber: false,
};

export default InputText;
