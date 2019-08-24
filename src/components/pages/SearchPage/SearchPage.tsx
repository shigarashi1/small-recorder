import React, { Component } from 'react';

// import styles from './SearchPage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import { TPageProps } from '../../../containers/pages/SearchPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

class SearchPage extends Component<TProps, IState> {
  constructor(props: TProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div className="sample-page">
        <PageTitle title="SearchPage" />
      </div>
    );
  }
}

export default SearchPage;
