export type TKeyboardState = {
  hasOpen: boolean;
  focusedOnValue: string;
  currentValue: string;
};

export const INITIAL_KEYBOARD_STATE: TKeyboardState = {
  hasOpen: false,
  focusedOnValue: '',
  currentValue: '',
};
