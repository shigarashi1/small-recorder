import React, { Component } from 'react';

// import styles from './RecordPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/RecordPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

class RecordPage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="RecordPage" />
      </div>
    );
  }
}

export default RecordPage;
