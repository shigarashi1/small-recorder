import React from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Typography from '@material-ui/core/Typography';

import styles from './SampleDraggablePage.module.scss';

import { ObjectIndexes } from '../../../../types';
import { isMobile } from '../../../../helpers/generals/agent';
import ExampleCardContent from '../../../molecules/ExampleCardContent/ExampleCardContent';
import { TPageProps } from '../../../../containers/pages/samples/SampleDraggablePage';

type TProps = TPageProps;

interface IState {
  state?: boolean;
}

type TState = IState & ObjectIndexes;

const SampleDraggablePage: React.FC<TProps> = (props: TProps) => {
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
}; // Render End

export default SampleDraggablePage;
