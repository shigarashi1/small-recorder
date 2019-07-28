import React, { Component } from 'react';

import styles from './SampleAtomsPage.module.scss';

import * as fromUtility from '../../../store/utility';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SampleCard from '../../molecules/SampleCard/SampleCard';
import { ATOMS_SAMPLES } from '../../../samples/Atoms';
import { ObjectIndexes } from '../../../types';
import { ISampleCardProps } from '../../../types/components/sample-card';
import { BREAK_POINT } from '../../../lookups/page-layout';

interface IProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
  onOpenKeyboard: typeof fromUtility.changeHasOpenKeyboard;
}

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

class SampleAtomsPage extends Component<IProps, TState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    const atomsSamples = this.getAtomsSampleWithProps();
    return (
      <div id={styles.container}>
        <div className={styles.contents}>
          <Typography variant="h5">Atoms</Typography>
          <Grid container={true} spacing={2}>
            {atomsSamples.map((sample, i) => {
              return this.renderSample(sample, i);
            })}
            {ATOMS_SAMPLES.map((sample, i) => {
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

  getAtomsSampleWithProps(): ISampleCardProps[] {
    return [
      {
        title: 'PopupNumberKeyboard',
        contexts: 'PopupNumberKeyboardだよー',
        node: <p>buttonで表示・非表示</p>,
        onAction: () => this.props.onOpenKeyboard(!this.props.hasOpenKeyboard),
      },
    ];
  }
}

export default SampleAtomsPage;
