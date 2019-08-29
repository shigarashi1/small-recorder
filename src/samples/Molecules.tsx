import React, { useState } from 'react';

import Logger from '../helpers/generals/logger';
import { Nullable } from '../types';
import { ISampleCardProps } from '../types/components/sample-card';

import Header from '../components/molecules/Header/Header';
import SampleCard from '../components/molecules/SampleCard/SampleCard';
import DeteSelector from '../components/molecules/DateSelector/DateSelector';
import { onChangedValue } from '../helpers/components/text-field';
import TextWithLabel from '../components/molecules/TextWithLabel/TextWithLabel';
import SignInForm from '../components/molecules/SignInForm/SignInForm';
import SignUpForm from '../components/molecules/SignUpForm/SignUpForm';
import InformationDialog from '../components/molecules/dialogs/InformationDialog/InformationDialog';
import Button from '../components/atoms/Button/Button';
import OkCancelDialog from '../components/molecules/dialogs/OkCancelDialog/OkCancelDialog';
import SelectionDialog from '../components/molecules/dialogs/SelectionDialog/SelectionDialog';

const brackFunc = (text: string) => {
  return () => {
    Logger.log(`output: ${text}`);
  };
};

const DateSelectorComp: React.FC = props => {
  const initialDate: Nullable<Date> = new Date();
  const [result, setResult] = useState(initialDate);
  const onChangeDate = (date: Nullable<Date>) => {
    if (!date) {
      return;
    }
    setResult(date);
  };

  const onToday = () => {
    setResult(new Date());
  };

  return (
    <React.Fragment>
      <DeteSelector
        showToday={true}
        selectedDate={result}
        onChangeDate={onChangeDate}
        disableFuture={true}
        maltiButtonLabel="today"
        onMaltiButtonClick={onToday}
      />
      <DeteSelector
        showToday={true}
        selectedDate={result}
        onChangeDate={onChangeDate}
        disableFuture={true}
        maltiButtonLabel="今日"
        onMaltiButtonClick={onToday}
      />
    </React.Fragment>
  );
};

const HeaderComp: React.FC = props => {
  const onOpen = () => {
    console.log('header onOpen clicked.');
  };

  const onSignOut = () => {
    console.log('header signout clicked.');
  };

  return (
    <React.Fragment>
      <Header isLoggedIn={false} onOpen={onOpen} isFixed={false} onSignOut={onSignOut} />
    </React.Fragment>
  );
};

const TextWithLabelComp: React.FC = props => {
  const [result, setResult] = useState('');
  const setValue = (v: string) => {
    setResult(v);
  };

  const onChanged = onChangedValue(result, setValue);

  return (
    <React.Fragment>
      <p>{result}</p>
      <TextWithLabel label="textLabel" value={result} onChange={onChanged} />
    </React.Fragment>
  );
};

const SignInFormComp: React.FC = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setMail = (v: string) => {
    setEmail(v);
  };
  const setPass = (v: string) => {
    setPassword(v);
  };

  const onChangedEmail = onChangedValue(email, setMail);
  const onChangedPass = onChangedValue(password, setPass);

  return (
    <React.Fragment>
      <SignInForm email={email} password={password} onChangedEmail={onChangedEmail} onChangedPassword={onChangedPass} />
    </React.Fragment>
  );
};

const SignUpFormComp: React.FC = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const setUser = (v: string) => {
    setUsername(v);
  };
  const setMail = (v: string) => {
    setEmail(v);
  };
  const setPass = (v: string) => {
    setPassword(v);
  };
  const setPassConf = (v: string) => {
    setPasswordConfirm(v);
  };

  const onChangedUsername = onChangedValue(username, setUser);
  const onChangedEmail = onChangedValue(email, setMail);
  const onChangedPass = onChangedValue(password, setPass);
  const onChangedPassConf = onChangedValue(passwordConfirm, setPassConf);

  return (
    <React.Fragment>
      <SignUpForm
        username={username}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        onChangedUsername={onChangedUsername}
        onChangedEmail={onChangedEmail}
        onChangedPassword={onChangedPass}
        onChangedPasswordConfirm={onChangedPassConf}
      />
    </React.Fragment>
  );
};

const InformationDialogComp: React.FC = props => {
  const [hasOpen, setHasOpen] = useState(false);
  const information = '確認しろ！確認しろ！確認しろ！確認しろ！確認しろ！確認しろ！確認しろ！';

  const onClose = () => {
    setHasOpen(false);
  };

  const show = () => {
    setHasOpen(true);
  };

  return (
    <React.Fragment>
      <Button label="open" onClick={show} />
      <InformationDialog hasOpen={hasOpen} title="確認" onClose={onClose} context={information} />
    </React.Fragment>
  );
};

const OkCancelDialogComp: React.FC = props => {
  const [hasOpen, setHasOpen] = useState(false);
  const information = 'OkCancelOkCancelOkCancelOkCancelOkCancelOkCancel';

  const onClose = () => {
    setHasOpen(false);
  };

  const onOk = () => {
    window.alert('OK');
  };

  const onCancel = () => {
    window.alert('Cancle');
  };

  const show = () => {
    setHasOpen(true);
  };

  return (
    <React.Fragment>
      <Button label="open" onClick={show} />
      <OkCancelDialog
        hasOpen={hasOpen}
        title="確認"
        onClose={onClose}
        onOk={onOk}
        onCancel={onCancel}
        content={information}
      />
    </React.Fragment>
  );
};

const SelectionDialogComp: React.FC = props => {
  const [hasOpen, setHasOpen] = useState(false);
  const information = 'SelectionDialogSelectionDialogSelectionDialogSelectionDialogSelectionDialog';

  const onClose = () => {
    setHasOpen(false);
  };

  const onOk = () => {
    window.alert('Yes');
  };

  const onCancel = () => {
    window.alert('No');
  };

  const show = () => {
    setHasOpen(true);
  };

  return (
    <React.Fragment>
      <Button label="open" onClick={show} />
      <SelectionDialog
        hasOpen={hasOpen}
        title="確認"
        onClose={onClose}
        onYes={onOk}
        onNo={onCancel}
        content={information}
      />
    </React.Fragment>
  );
};

export const MOLECULES_SAMPLES: ISampleCardProps[] = [
  {
    title: 'SelectionDialog',
    contexts: 'SelectionDialog',
    node: <SelectionDialogComp />,
  },
  {
    title: 'OkCancelDialog',
    contexts: 'OkCancelDialog',
    node: <OkCancelDialogComp />,
  },
  {
    title: 'InformationDialog',
    contexts: 'InformationDialog',
    node: <InformationDialogComp />,
  },
  {
    title: 'Header',
    contexts: 'Headerです。',
    node: <HeaderComp />,
  },
  {
    title: 'DateSelector',
    contexts: 'DateSelector',
    node: <DateSelectorComp />,
  },
  {
    title: 'TextWithLabel',
    contexts: 'TextWithLabel',
    node: <TextWithLabelComp />,
  },
  {
    title: 'SignInForm',
    contexts: 'SignInForm',
    node: <SignInFormComp />,
  },
  {
    title: 'SignUpForm',
    contexts: 'SignUpForm',
    node: <SignUpFormComp />,
  },
  {
    title: 'SampleCard1',
    contexts: 'SampleCardのテストです。',
    node: <p>SampleCardのテスト</p>,
  },
  {
    title: 'SampleCard2',
    contexts: 'SampleCardのテストです。Tryを押すとconsoleに出力します',
    node: (
      <SampleCard
        contexts="SampleCard2 Child(not output title)"
        node={<p>SampleCard2 Child</p>}
        onAction={brackFunc('SampleCard2')}
      />
    ),
    onAction: brackFunc('SampleCard2'),
  },
];
