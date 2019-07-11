import React, { Component } from 'react';

import styles from './SamplePage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid, { GridSize } from '@material-ui/core/Grid';
import SampleCard from '../../molecules/SampleCard/SampleCard';
import { MOLECULES_SAMPLES, ATOMS_SAMPLES } from '../../../samples/Samples';
import { ObjectIndexes } from '../../../types';
import Divider from '@material-ui/core/Divider';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

const breakPoint: ObjectIndexes<GridSize> = {
  xs: 12,
  sm: 6,
  md: 4,
  lg: 3,
};

class SamplePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { state: false };
  }

  render() {
    return (
      <div id={styles.container}>
        <PageTitle title="SamplePage" />
        <div className={styles.contents}>
          <Typography variant="h5">Atoms</Typography>
          <Grid container={true} spacing={2}>
            {ATOMS_SAMPLES.map((sample, i) => {
              return (
                <Grid
                  key={i}
                  item={true}
                  xs={breakPoint.xs}
                  sm={breakPoint.sm}
                  md={breakPoint.md}
                  lg={breakPoint.lg}
                  xl={breakPoint.lg}
                >
                  <SampleCard {...sample} />
                </Grid>
              );
            })}
          </Grid>
          <Divider className={styles.divider} />
          <Typography variant="h5">Molecules</Typography>
          <Grid container={true} spacing={2}>
            {MOLECULES_SAMPLES.map((sample, i) => {
              return (
                <Grid
                  key={i}
                  item={true}
                  xs={breakPoint.xs}
                  sm={breakPoint.sm}
                  md={breakPoint.md}
                  lg={breakPoint.lg}
                  xl={breakPoint.lg}
                >
                  <SampleCard {...sample} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

export default SamplePage;
