import React from 'react';

import styles from './SampleOrganismsPage.module.scss';

import Typography from '@material-ui/core/Typography';
import { ObjectIndexes } from '../../../../types';
import { TPageProps } from '../../../../containers/pages/samples/SampleOrganismsPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

const SampleOrganismsPage: React.FC<TProps> = (props: TProps) => {
  return (
    <div id={styles.container}>
      <div className={styles.contents}>
        <Typography variant="h5">Organisms</Typography>
      </div>
    </div>
  );
}; // Render End

export default SampleOrganismsPage;
