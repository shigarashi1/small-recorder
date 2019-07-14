import * as React from 'react';
import { DragLayer, XYCoord, DragLayerMonitor } from 'react-dnd';
import { ObjectIndexes } from '../../types';

type TOffsetType = XYCoord | null;
type TItemType = string | symbol | null;

interface IProps {
  item: any;
  itemType: TItemType;
  initialOffset: TOffsetType;
  currentOffset: TOffsetType;
  isDragging: boolean;
}

const layerStyles: ObjectIndexes = {
  position: 'fixed',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

class CustomDragLayer extends React.Component<IProps> {
  getItemStyles(currentOffset: TOffsetType): ObjectIndexes {
    if (!currentOffset) {
      return {
        display: 'none',
      };
    }

    // move position
    const x = currentOffset.x;
    const y = currentOffset.y;
    const transform = `translate(${x}px, ${y}px) scale(1.05)`;

    return {
      WebkitTransform: transform,
      transform: { transform },
    };
  }

  render() {
    const { item, itemType, isDragging, currentOffset } = this.props;

    if (!isDragging) {
      return null;
    }

    // render
    if (itemType === 'item') {
      return (
        <div style={layerStyles}>
          <div style={this.getItemStyles(currentOffset)}>{item.name}</div>
        </div>
      );
    }
    return null;
  }
}

function collect(monitor: DragLayerMonitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default DragLayer<IProps>(collect)(CustomDragLayer);
