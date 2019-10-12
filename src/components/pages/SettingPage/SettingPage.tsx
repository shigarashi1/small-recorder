import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import styles from './SettingPage.module.scss';

import { TPageProps } from '../../../containers/pages/SettingPage';
import Button from '../../atoms/Button/Button';
import SettingTable from '../../organisms/SettingTable/SettingTable';
import { TCategory } from '../../../types/firebase';

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
          <Typography variant="h4" color="inherit">
            SettingPage
          </Typography>
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
