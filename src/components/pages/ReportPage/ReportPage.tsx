import React, { Component } from 'react';

// import styles from './ReportPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/ReportPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

class ReportPage extends Component<TProps, IState> {
  constructor(props: TProps) {
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
