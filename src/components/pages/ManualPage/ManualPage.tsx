import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './ManualPage.module.scss';

import { TPageProps } from '../../../containers/pages/ManualPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

const ManualPage: React.FC<TProps> = (props: TProps) => {
  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        ManualPage
      </Typography>
    </div>
  );
};

export default ManualPage;
