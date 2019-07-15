import React, { Component } from 'react';

import styles from './SamplePage.module.scss';

import * as fromUtility from '../../../store/utility';

import PageTitle from '../../atoms/PageTitle/PageTitle';
import Typography from '@material-ui/core/Typography';
import Grid, { GridSize } from '@material-ui/core/Grid';
import SampleCard from '../../molecules/SampleCard/SampleCard';
import { MOLECULES_SAMPLES, ATOMS_SAMPLES } from '../../../samples/Samples';
import { ObjectIndexes } from '../../../types';
import Divider from '@material-ui/core/Divider';
import InputText from '../../atoms/InputText/InputText';
import NumberKeyboard from '../../atoms/NumberKeyboard/NumberKeyboard';
import { ISampleCardProps } from '../../../types/sample-card';
import { TKeyboardKey } from '../../../types/number-keyboard';
import { changeValue } from '../../../helpers/number-keyboard';
import InputNumber from '../../atoms/InputNumber/InputNumber';
// import Logger from '../../../helpers/logger';

interface IProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
  onOpenKeyboard: typeof fromUtility.changeHasOpenKeyboard;
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

type TState = IState & ObjectIndexes;

class SamplePage extends Component<IProps, TState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputText: '',
      numberKeyboard: '',
    };
  }

  render() {
    const atomsSamples = this.getAtomsSampleWithState();
    return (
      <div id={styles.container}>
        <PageTitle title="SamplePage" />
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
          <Divider className={styles.divider} />
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
        xs={breakPoint.xs}
        sm={breakPoint.sm}
        md={breakPoint.md}
        lg={breakPoint.lg}
        xl={breakPoint.lg}
      >
        <SampleCard {...sample} />
      </Grid>
    );
  }

  getAtomsSampleWithState(): ISampleCardProps[] {
    return [
      {
        title: 'InputText',
        contexts: 'InputTextだよー',
        node: this.renderInputText(),
      },
      {
        title: 'NumberKeyboard',
        contexts: 'NumberKeyboardだよー',
        node: this.renderNumberKeyboard(),
      },
      {
        title: 'PopupNumberKeyboard',
        contexts: 'PopupNumberKeyboardだよー',
        node: <p>buttonで表示・非表示</p>,
        onAction: () => this.props.onOpenKeyboard(!this.props.hasOpenKeyboard),
      },
    ];
  }

  getState<T = any>(key: string, initialValue: T): T {
    const state = this.state[key];
    return typeof state === 'undefined' ? initialValue : state;
  }

  renderInputText() {
    const value = this.getState('inputText', '');
    return <InputText value={value} onChange={this.onChangedInputText} />;
  }

  onChangedInputText = (value: string) => {
    this.setState({ inputText: value });
  };

  renderNumberKeyboard() {
    const value = this.getState('numberKeyboard', '');
    return (
      <React.Fragment>
        <InputNumber value={value} />
        <NumberKeyboard onPush={this.onPushNumberKeyboard} />
      </React.Fragment>
    );
  }

  onChangedNumberKeyboard = (value: string) => {
    this.setState({ numberKeyboard: value });
  };

  onPushNumberKeyboard = (key: TKeyboardKey) => {
    const stateValue = this.getState('numberKeyboard', '');
    const value = changeValue(stateValue, key);
    this.onChangedNumberKeyboard(value);
  };
}

export default SamplePage;
