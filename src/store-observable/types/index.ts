import { Action } from 'typescript-fsa';

export type WrapAction<T extends (...args: any[]) => any> = Action<Parameters<T>[0]>;
