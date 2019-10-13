import React from 'react';

import styles from './LoadingSpiner.module.scss';
import { CircularProgress } from '@material-ui/core';

type TProps = {
  isLoading: boolean;
};

const LoadingSpiner: React.FC<TProps> = ({ isLoading, children }) => {
  return (
    <React.Fragment>
      {isLoading ? (
        <div id={styles.container}>
          <CircularProgress className={styles.progress} />
        </div>
      ) : null}
      {children}
    </React.Fragment>
  );
};

export default LoadingSpiner;
