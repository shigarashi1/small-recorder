import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './ReportPage.module.scss';

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
        <Typography variant="h4" color="inherit">
          ReportPage
        </Typography>
      </div>
    );
  }
}

export default ReportPage;
