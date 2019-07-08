import React, { Component } from 'react';

// import styles from './ReportPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

class ReportPage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="ReportPage" />
      </div>
    );
  }
}

export default ReportPage;
