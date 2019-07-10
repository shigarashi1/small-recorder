import React, { Component } from 'react';

import styles from './SamplePage.module.scss';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SampleCard from '../../molecules/SampleCard/SampleCard';
import { MOLECULES_SAMPLES, ATOMS_SAMPLES } from '../../../samples/Samples';

interface IProps {
  prop?: string;
}

interface IState {
  state?: boolean;
}

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
          <Typography component="h4">Atoms</Typography>
          <Grid container={true} spacing={2}>
            {ATOMS_SAMPLES.map((sample, i) => {
              return (
                <Grid key={i} item={true} xs={4}>
                  <SampleCard {...sample} />
                </Grid>
              );
            })}
          </Grid>
          <Typography component="h4">Molecules</Typography>
          <Grid container={true} spacing={2}>
            {MOLECULES_SAMPLES.map((sample, i) => {
              return (
                <Grid key={i} item={true} xs={4}>
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
