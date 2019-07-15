import React, { Component } from 'react';

import styles from './SampleOrganismsPage.module.scss';

import * as fromUtility from '../../../store/utility';

import Typography from '@material-ui/core/Typography';
import { ObjectIndexes } from '../../../types';
// import Grid from '@material-ui/core/Grid';
// import SampleCard from '../../molecules/SampleCard/SampleCard';
// import { MOLECULES_SAMPLES, ATOMS_SAMPLES } from '../../../samples/Samples';
// import Divider from '@material-ui/core/Divider';
// import InputText from '../../atoms/InputText/InputText';
// import NumberKeyboard from '../../atoms/NumberKeyboard/NumberKeyboard';
// import { ISampleCardProps } from '../../../types/sample-card';
// import { TKeyboardKey } from '../../../types/number-keyboard';
// import { changeValue } from '../../../helpers/number-keyboard';
// import InputNumber from '../../atoms/InputNumber/InputNumber';
// import { BREAK_POINT } from '../../../lookups/page-layout';

interface IProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
  onOpenKeyboard: typeof fromUtility.changeHasOpenKeyboard;
}

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

class SampleOrganismsPage extends Component<IProps, TState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputText: '',
      numberKeyboard: '',
    };
  }

  render() {
    return (
      <div id={styles.container}>
        <div className={styles.contents}>
          <Typography variant="h5">Organisms</Typography>
        </div>
      </div>
    );
  } // Render End
}

export default SampleOrganismsPage;
