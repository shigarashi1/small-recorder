import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './ReportPage.module.scss';

import { TPageProps } from '../../../containers/pages/ReportPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

const ReportPage: React.FC<TProps> = (props: TProps) => {
  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        ReportPage
      </Typography>
    </div>
  );
};

export default ReportPage;
