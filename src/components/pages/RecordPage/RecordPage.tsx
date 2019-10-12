import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './RecordPage.module.scss';

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
        <Typography variant="h4" color="inherit">
          RecordPage
        </Typography>
      </div>
    );
  }
}

export default RecordPage;
