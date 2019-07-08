import React, { Component } from 'react';

// import styles from './SamplePage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';

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
      <div className="sample-page">
        <PageTitle title="SamplePage" />
      </div>
    );
  }
}

export default SamplePage;
