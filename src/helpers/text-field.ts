import { TInputType, TChangeEvent } from '../types/components/text-field';

export function onChangedValue(value: TInputType, setFunc: (v: any) => void): (event: TChangeEvent) => void {
  return (event: TChangeEvent) => {
    const changedValue = typeof value === 'string' ? event.target.value : +event.target.value;
    if (value === changedValue) {
      return;
    }
    setFunc(changedValue);
  };
}
