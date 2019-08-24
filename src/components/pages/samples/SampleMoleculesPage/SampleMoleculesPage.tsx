import React, { Component } from 'react';

import styles from './SampleMoleculesPage.module.scss';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SampleCard from '../../../molecules/SampleCard/SampleCard';
import { MOLECULES_SAMPLES } from '../../../../samples/Molecules';
import { ObjectIndexes } from '../../../../types';
import { ISampleCardProps } from '../../../../types/components/sample-card';
import { BREAK_POINT } from '../../../../lookups/page-layout';
import { TPageProps } from '../../../../containers/pages/samples/SampleMoleculesPage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

class SampleMoleculesPage extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id={styles.container}>
        <div className={styles.contents}>
          <Typography variant="h5">Molecules</Typography>
          <Grid container={true} spacing={2}>
            {MOLECULES_SAMPLES.map((sample, i) => {
              return this.renderSample(sample, i);
            })}
          </Grid>
        </div>
      </div>
    );
  } // Render End

  renderSample(sample: ISampleCardProps, key: number) {
    return (
      <Grid
        key={key}
        item={true}
        xs={BREAK_POINT.xs}
        sm={BREAK_POINT.sm}
        md={BREAK_POINT.md}
        lg={BREAK_POINT.lg}
        xl={BREAK_POINT.lg}
      >
        <SampleCard {...sample} />
      </Grid>
    );
  }
}

export default SampleMoleculesPage;
