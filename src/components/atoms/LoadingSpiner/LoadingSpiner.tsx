import React from 'react';

import styles from './LoadingSpiner.module.scss';
import { CircularProgress } from '@material-ui/core';

type TProps = {
  isLoading: boolean;
};

const LoadingSpiner: React.FC<TProps> = ({ isLoading, children }) => {
  return isLoading ? (
    <React.Fragment>
      <div id={styles.container}>
        <CircularProgress className={styles.progress} />
      </div>
      {children}
    </React.Fragment>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
};

export default LoadingSpiner;
