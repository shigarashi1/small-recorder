import React from 'react';
import Logger from '../helpers/logger';
import SampleCard from '../components/molecules/SampleCard/SampleCard';
import HeaderTitle from '../components/atoms/HeaderTitle/HeaderTitle';
import PageTitle from '../components/atoms/PageTitle/PageTitle';
import Header from '../components/molecules/Header/Header';
import { ISampleCardProps } from '../types/sample-card';

const brackFunc = (text: string) => {
  return () => {
    Logger.log(`output: ${text}`);
  };
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
];

export const MOLECULES_SAMPLES: ISampleCardProps[] = [
  {
    title: 'Header',
    contexts: 'Headerです。',
    node: <Header isLoggedIn={false} onOpen={brackFunc('Header Open!')} isFixed={false} />,
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
