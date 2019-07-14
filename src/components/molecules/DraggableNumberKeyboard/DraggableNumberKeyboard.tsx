import React from 'react';
import { ConnectDragSource, DragSource, DragSourceConnector } from 'react-dnd';
import ReactDnDHTML5Backend from 'react-dnd-html5-backend';

import styles from './SampleComponent.module.scss';
import NumberKeyboard, { IProps } from '../../atoms/NumberKeyboard/NumberKeyboard';

interface IDragProps {
  connectDragSource: ConnectDragSource;
}

type TProps = IProps & IDragProps;

const DraggableComponent: React.FC<TProps> = (props: TProps) => {
  return props.connectDragSource(<NumberKeyboard {...props} />);
};

const source = {
  beginDrag(props: IProps): IProps {
    return {
      onPush: props.onPush,
    };
  },
};

function mapDragProps(connect: DragSourceConnector): IDragProps {
  return { connectDragSource: connect.dragSource() };
}

export default DragSource<IProps>('NumberKeyboard', source, mapDragProps)(DraggableComponent);
