import React, { useState } from 'react';

import { ISampleCardProps } from '../types/sample-card';
import { changeValue } from '../helpers/number-keyboard';
import { TKeyboardKey } from '../types/number-keyboard';
import { Nullable } from '../types';

import HeaderTitle from '../components/atoms/HeaderTitle/HeaderTitle';
import PageTitle from '../components/atoms/PageTitle/PageTitle';
import Button from '../components/atoms/Button/Button';
import InputNumber from '../components/atoms/InputNumber/InputNumber';
import NumberKeyboard from '../components/atoms/NumberKeyboard/NumberKeyboard';
import InputDate from '../components/atoms/InputDate/InputDate';
import InputText from '../components/atoms/InputText/InputText';
import TextField from '../components/atoms/TextField/TextField';
import { onChangedValue } from '../helpers/text-field';

const ButtonComponent: React.FC = props => {
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  return (
    <React.Fragment>
      <p>{`count: ${count}`}</p>
      <Button label="default" onClick={onClick} />
      <Button label="icon" onClick={onClick} iconType="left" icon="keyboard_arrow_left" />
      <Button label={null} onClick={onClick} iconType="right" icon="keyboard_arrow_right" />
      <Button label="primary" color="primary" onClick={onClick} />
      <Button label="secondary" color="secondary" onClick={onClick} />
      <Button label="contained" color="primary" variant="contained" onClick={onClick} />
      <Button label="outlined" color="default" variant="outlined" onClick={onClick} />
      <Button label="text" color="secondary" variant="text" onClick={onClick} />
      <Button label="isFullWidth" color="primary" variant="contained" onClick={onClick} isFullWidth={true} />
    </React.Fragment>
  );
};

// const stringArray: string[] = Array.from({ length: 10 }).map((v, i) => String(i));

const TextFieldComp: React.FC = props => {
  const [result, setResult] = useState('');
  const setValue = (v: string) => {
    setResult(v);
  };

  const onChanged = onChangedValue(result, setValue);

  return (
    <React.Fragment>
      <p>{result}</p>
      <TextField value={result} onChange={onChanged} />
      <TextField value={result} onChange={onChanged} label="text field" />
      <TextField value={result} onChange={onChanged} margin="dense" />
      <TextField value={result} onChange={onChanged} fullWidth={true} />
      <TextField value={result} onChange={onChanged} placeholder="xxxxx-xxxx" />
      <TextField value={result} onChange={onChanged} variant="filled" />
      <TextField value={result} onChange={onChanged} label="outlined" variant="outlined" />
      <TextField value={result} onChange={onChanged} label="outlined & fullWidth" variant="outlined" fullWidth={true} />
    </React.Fragment>
  );
};

const NumberKeyboardComp: React.FC = props => {
  const [result, setResult] = useState('');
  const onPushNumberKeyboard = (key: TKeyboardKey) => {
    const stateValue = result;
    const value = changeValue(stateValue, key);
    setResult(value);
  };

  return (
    <React.Fragment>
      <InputNumber value={result} />
      <NumberKeyboard onPush={onPushNumberKeyboard} />
    </React.Fragment>
  );
};

const InputDateComp: React.FC = props => {
  const initialDate: Nullable<Date> = new Date();
  const [result, setResult] = useState(initialDate);
  const onChangeDate = (date: Nullable<Date>) => {
    if (!date) {
      return;
    }
    setResult(date);
  };

  return (
    <React.Fragment>
      <InputDate selectedDate={result} onChangeDate={onChangeDate} />
    </React.Fragment>
  );
};

const InputTextComp: React.FC = props => {
  const [result, setResult] = useState('');
  const onChangeText = (value: string) => {
    setResult(value);
  };
  return (
    <React.Fragment>
      <InputText value={result} onChange={onChangeText} />
    </React.Fragment>
  );
};

export const ATOMS_SAMPLES: ISampleCardProps[] = [
  {
    title: 'HeaderTitle',
    contexts: 'HeaderTitleです。',
    node: <HeaderTitle title="HeaderTitle" />,
  },
  {
    title: 'PageTitle',
    contexts: 'PageTitleです。',
    node: <PageTitle title="PageTitle" />,
  },
  {
    title: 'Button',
    contexts: 'Buttonです。',
    node: <ButtonComponent />,
  },
  {
    title: 'NumberKeyboard',
    contexts: 'NumberKeyboardだよー',
    node: <NumberKeyboardComp />,
  },
  {
    title: 'InputText',
    contexts: 'InputTextだよー',
    node: <InputTextComp />,
  },
  {
    title: 'InputDate',
    contexts: 'InputDateです',
    node: <InputDateComp />,
  },
  {
    title: 'TextField',
    contexts: 'TextFieldです',
    node: <TextFieldComp />,
  },
];
