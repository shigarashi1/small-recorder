import React from 'react';
import NumberFormat from 'react-number-format';

import styles from '../InputText/InputText.module.scss';
import { isIOS } from '../../../helpers/generals/agent';

interface IProps {
  id: string;
  value: string | number;
  prefix?: string;
  decimalScale?: number;
  onFocus?: (v: string) => void;
}

type TProps = IProps;

const InputNumber: React.FC<TProps> = (props: TProps) => {
  const { prefix, decimalScale, value } = props;

  return (
    <div id={styles.container} className={styles.number}>
      <NumberFormat
        value={value}
        prefix={prefix}
        decimalScale={decimalScale}
        thousandSeparator={true}
        displayType="input"
        onFocus={onFocus}
      />
    </div>
  );

  function onFocus(event: React.FocusEvent<HTMLInputElement>) {
    if (isIOS) {
      event.target.blur();
    }
    if (props.onFocus) {
      const id = props.id ? props.id : 'unknown';
      props.onFocus(id);
    }
  }
};

export default InputNumber;
