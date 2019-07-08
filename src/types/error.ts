export interface IError {
  code: string;
  error: string;
}

export class ErrorClass extends Error {
  private _errors: IError[] = [];

  constructor(error: string | IError[]) {
    super();
    if (typeof error === 'string') {
      this._errors.push({ code: 'E0000', error });
    } else {
      this._errors = [...error];
    }
  }

  get errors() {
    return this._errors;
  }
}
