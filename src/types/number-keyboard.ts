export type TKeyboardKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'C' | 'BS' | 'R' | '' | 'X' | '.' | '-';

export interface IPosition {
  x: number;
  y: number;
  top: number;
  left: number;
}

export interface IDraggableAction {
  changeCanDrag: (canDrag: boolean) => void;
  onMoveEnd: (pageY: number, pageX: number) => void;
  onMove: (pageY: number, pageX: number) => void;
}
