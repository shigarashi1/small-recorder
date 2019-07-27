import React, { useState } from 'react';

import Logger from '../helpers/logger';
import { Nullable } from '../types';
import { ISampleCardProps } from '../types/sample-card';

import Header from '../components/molecules/Header/Header';
import SampleCard from '../components/molecules/SampleCard/SampleCard';
import DeteSelector from '../components/molecules/DateSelector/DateSelector';

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

export const MOLECULES_SAMPLES: ISampleCardProps[] = [
  {
    title: 'Header',
    contexts: 'Headerです。',
    node: <Header isLoggedIn={false} onOpen={brackFunc('Header Open!')} isFixed={false} />,
  },
  {
    title: 'DateSelector',
    contexts: 'DateSelector',
    node: <DateSelectorComp />,
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
