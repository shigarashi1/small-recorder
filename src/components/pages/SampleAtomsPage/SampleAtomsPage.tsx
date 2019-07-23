import React, { Component } from 'react';

import styles from './SampleAtomsPage.module.scss';

import * as fromUtility from '../../../store/utility';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SampleCard from '../../molecules/SampleCard/SampleCard';
import { ATOMS_SAMPLES } from '../../../samples/Samples';
import { ObjectIndexes, Nullable } from '../../../types';
import InputText from '../../atoms/InputText/InputText';
import NumberKeyboard from '../../atoms/NumberKeyboard/NumberKeyboard';
import { ISampleCardProps } from '../../../types/sample-card';
import { TKeyboardKey } from '../../../types/number-keyboard';
import { changeValue } from '../../../helpers/number-keyboard';
import InputNumber from '../../atoms/InputNumber/InputNumber';
import { BREAK_POINT } from '../../../lookups/page-layout';
import InputDate from '../../atoms/InputDate/InputDate';

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
    this.state = {
      inputText: '',
      numberKeyboard: '',
      inputDate: new Date(),
    };
  }

  render() {
    const atomsSamples = this.getAtomsSampleWithState();
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
      {
        title: 'InputDate',
        contexts: 'InputDateです',
        node: this.renderInputDate(),
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

  renderInputDate() {
    const value = this.getState('inputDate', new Date());
    return <InputDate selectedDate={value} onChangeDate={this.onChangeDate} />;
  }

  onChangeDate = (date: Nullable<Date>) => {
    this.setState({ inputDate: date });
  };
}

export default SampleAtomsPage;
