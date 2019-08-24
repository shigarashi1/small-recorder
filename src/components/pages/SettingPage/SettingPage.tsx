import React, { Component } from 'react';

// import styles from './SettingPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/SettingPage';

interface IState {
  state?: boolean;
}

class SettingPage extends Component<TPageProps, IState> {
  constructor(props: TPageProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="SettingPage" />
      </div>
    );
  }
}

export default SettingPage;
