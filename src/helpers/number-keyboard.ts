import { TKeyboardKey } from '../types/components/number-keyboard';

export function changeValue(value: string, pushedKey: TKeyboardKey, defaultValue: string = ''): string {
  switch (pushedKey) {
    case 'C':
      return '';

    case 'BS':
      return value.length !== 0 ? value.slice(0, value.length - 1) : '';

    case 'R':
      return defaultValue;

    case 'X':
    case '':
      return value;

    default:
      return value ? value + String(pushedKey) : String(pushedKey);
  }
}

export function getTopPosition(pageY: number, y: number): number {
  const min = 70;
  const result = pageY - y;
  if (result < min) {
    return min;
  }
  return result;
}

export function getLeftPosition(pageX: number, x: number): number {
  const min = 0;
  const max = window.parent.screen.width - 210;
  const result = pageX - x;
  if (result < min) {
    return min;
  }
  if (result > max) {
    return max;
  }
  return result;
}
