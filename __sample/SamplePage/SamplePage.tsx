import React, { Component } from 'react';

import styles from './SamplePage.module.scss';

import PageTitle from '../../src/components/atoms/PageTitle/PageTitle';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

class SamplePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div id={styles.container}>
        <PageTitle title="SamplePage" />
      </div>
    );
  }
}

export default SamplePage;
