import React from 'react';
import Typography from '@material-ui/core/Typography';

// import styles from './SearchPage.module.scss';

import { TPageProps } from '../../../containers/pages/SearchPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

const SearchPage: React.FC<TProps> = (props: TProps) => {
  return (
    <div className="sample-page">
      <Typography variant="h4" color="inherit">
        SearchPage
      </Typography>
    </div>
  );
};

export default SearchPage;
