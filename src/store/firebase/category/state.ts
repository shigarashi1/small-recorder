import { IRecordCategory } from '../../../types/firebase';

export type TCategoryState = {
  data: IRecordCategory[];
};

export const INITIAL_CATEGORY_STATE: TCategoryState = {
  data: [],
};
