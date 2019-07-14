import { TKeyboardKey } from '../types/number-keyboard';

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
