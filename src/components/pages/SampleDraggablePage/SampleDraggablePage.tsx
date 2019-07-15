import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Typography from '@material-ui/core/Typography';

import styles from './SampleDraggablePage.module.scss';

import * as fromUtility from '../../../store/utility';

import { ObjectIndexes } from '../../../types';
import { isMobile } from '../../../helpers/agent';
import ExampleCardContent from '../../molecules/ExampleCardContent/ExampleCardContent';

interface IProps {
  isLoggedIn: boolean;
  hasOpenKeyboard: boolean;
  onOpenKeyboard: typeof fromUtility.changeHasOpenKeyboard;
}

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

class SampleDraggablePage extends Component<IProps, TState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      inputText: '',
      numberKeyboard: '',
    };
  }

  render() {
    const backEnd = isMobile ? TouchBackend : HTML5Backend;

    return (
      <div id={styles.container}>
        <div className={styles.title}>
          <Typography variant="h5">Draggable Sample</Typography>
        </div>
        <div className={styles.contents}>
          <DndProvider backend={backEnd}>
            <ExampleCardContent />
          </DndProvider>
        </div>
      </div>
    );
  } // Render End
}

export default SampleDraggablePage;
