import React, { Component } from 'react';

// import styles from './SettingPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

class SettingPage extends Component<IProps, IState> {
  constructor(props: IProps) {
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
