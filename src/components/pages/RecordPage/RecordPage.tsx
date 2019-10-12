import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './RecordPage.module.scss';

import { TPageProps } from '../../../containers/pages/RecordPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

const RecordPage: React.FC<TProps> = (props: TProps) => {
  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        RecordPage
      </Typography>
    </div>
  );
};

export default RecordPage;
