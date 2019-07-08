import React, { Component } from 'react';

// import styles from './ManualPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

class ManualPage extends Component<IProps, IState> {
  constructor(props: IProps) {
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
