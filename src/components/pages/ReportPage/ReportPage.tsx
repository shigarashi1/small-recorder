import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './ReportPage.module.scss';

import { TPageProps } from '../../../containers/pages/ReportPage';
import Logger from '../../../helpers/generals/logger';

type TProps = TPageProps;

const ReportPage: React.FC<TProps> = props => {
  Logger.log(props);

  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        ReportPage
      </Typography>
    </div>
  );
};

export default ReportPage;
