import React, { Component } from 'react';

// import styles from './ManualPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/ManualPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

class ManualPage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="ManualPage" />
      </div>
    );
  }
}

export default ManualPage;
