import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';

import styles from './LoadingSpiner.module.scss';

type TProps = {
  isLoading: boolean;
};

const LoadingSpiner: React.FC<TProps> = ({ isLoading: loading, children }) => {
  const [isLoading, setLoading] = useState(loading);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

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
