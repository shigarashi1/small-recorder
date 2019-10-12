import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import styles from './SettingPage.module.scss';

import { TPageProps } from '../../../containers/pages/SettingPage';
import Button from '../../atoms/Button/Button';
import SettingTable from '../../organisms/SettingTable/SettingTable';
import { TCategory } from '../../../types/firebase';
import Logger from '../../../helpers/generals/logger';

type TProps = TPageProps;

interface IState {
  tabIndex: number;
}

const LABELS = ['Record Title', 'Record Target'];

const ROWS: TCategory[] = [
  {
    id: '1',
    name: 'aaaaaa',
    user: '',
    hasDeleted: false,
  },
  {
    id: '2',
    name: 'bbbb',
    user: '',
    hasDeleted: false,
  },
  {
    id: '3',
    name: 'cccc',
    user: '',
    hasDeleted: false,
  },
  {
    id: '4',
    name: 'dddd',
    user: '',
    hasDeleted: false,
  },
];

const SettingPage: React.FC<TProps> = (props: TProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  const onChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (tabIndex === newValue) {
      return;
    }
    setTabIndex(newValue);
  };

  const onCreate = () => {
    Logger().log('');
  };

  return (
    <div id={styles.root}>
      <div className={styles.title}>
        <Typography variant="h4" color="inherit">
          SettingPage
        </Typography>
      </div>
      <div className={styles.tab}>
        <AppBar position="static">
          <Tabs value={tabIndex} onChange={onChangeTab}>
            {LABELS.map((v, i) => (
              <Tab key={i} label={v} />
            ))}
          </Tabs>
        </AppBar>
      </div>
      <div className={styles.contents}>
        <div className={styles.btnWrapper}>
          <Button label="create new" onClick={onCreate} color="primary" />
        </div>
        <div className={styles.table}>
          <SettingTable rows={ROWS} />
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
