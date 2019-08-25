import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './SettingPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/SettingPage';
import Button from '../../atoms/Button/Button';
import { TRecordCategory } from '../../../types/firebase';
import SettingTable from '../../organisms/SettingTable/SettingTable';

type TProps = TPageProps;

interface IState {
  tabIndex: number;
}

const LABELS = ['Record Title', 'Record Target'];

const ROWS: TRecordCategory[] = [
  {
    _id: '1',
    name: 'aaaaaa',
  },
  {
    _id: '2',
    name: 'bbbb',
  },
  {
    _id: '3',
    name: 'cccc',
  },
  {
    _id: '4',
    name: 'dddd',
  },
];

class SettingPage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  render() {
    const { tabIndex } = this.state;
    return (
      <div id={styles.root}>
        <div className={styles.title}>
          <PageTitle title="SettingPage" />
        </div>
        <div className={styles.tab}>
          <AppBar position="static">
            <Tabs value={tabIndex} onChange={this.handleChange}>
              {LABELS.map((v, i) => (
                <Tab key={i} label={v} />
              ))}
            </Tabs>
          </AppBar>
        </div>
        <div className={styles.contents}>
          <div className={styles.btnWrapper}>
            <Button label="create new" onClick={this.handleCreateNew} color="primary" />
          </div>
          <div className={styles.table}>
            <SettingTable rows={ROWS} />
          </div>
        </div>
      </div>
    );
  }

  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const { tabIndex } = this.state;
    if (tabIndex === newValue) {
      return;
    }
    this.setState({ tabIndex: newValue });
  };

  handleCreateNew = () => {
    const { tabIndex } = this.state;
    console.log('push create', tabIndex);
  };
}

export default SettingPage;
