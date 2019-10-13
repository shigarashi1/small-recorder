import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './HomePage.module.scss';

import { TPageProps } from '../../../containers/pages/HomePage';

interface IState {
  state?: boolean;
}

type TProps = TPageProps;

const HomePage: React.FC<TProps> = (props: TProps) => {
  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        HomePage
      </Typography>
    </div>
  );
};

export default HomePage;
