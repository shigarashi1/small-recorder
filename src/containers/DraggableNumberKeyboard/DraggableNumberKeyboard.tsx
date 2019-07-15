import React, { Component } from 'react';
import { DragSource, DropTarget, ConnectDragSource, ConnectDropTarget } from 'react-dnd';
import { ObjectIndexes } from '../../types';
import { IProps as IKeyboardProps } from '../../components/atoms/PopupNumberKeyboard/PopupNumberKeyboard';

// interface IProps {

// }

// type TProps = IProps;

// const KEYBOARD_NAME = 'NUMBER_KEY_BOARD';

// // ドラッグされるSourceの動作を定義する
// const dragSource = DragSource<IKeyboardProps>(
//   KEYBOARD_NAME,
//   {
//     beginDrag(props) {
//       return props;
//     },
//   },
//   (connect, monitor) => {
//     return {
//       connectDragSource: connect.dragSource(),
//       connectDragPreview: connect.dragPreview(),
//       isDragging: monitor.isDragging(),
//     };
//   },
// );

// // ドロップされるTargetの動作を定義する
// const dropTarget = DropTarget<IKeyboardProps>(
//   KEYBOARD_NAME,
//   {
//     drop(dropProps, monitor, _dropComponent) {
//       const dragProps = monitor.getItem();
//       if (dropProps.id !== dragProps.id) {
//         dragProps.onDrop(dragProps.id, dropProps.id);
//       }
//     },
//   },
//   connect => {
//     return {
//       connectDropTarget: connect.dropTarget(),
//     };
//   },
// );

// class DraggableNumberKeyboard extends Component<TProps> {
//   constructor(props: TProps) {
//     super(props);
//   }

//   getStyles(): ObjectIndexes {
//     const { isDragging } = this.props;
//     return {
//       opacity: isDragging ? 0.4 : 1,
//     };
//   }

//   render() {
//     return this.props.connectDragSource(
//       this.props.connectDropTarget(<div style={this.getStyles()}>{this.props.name}</div>),
//     );
//   }
// }

// export default dragSource(dropTarget(DraggableNumberKeyboard));
