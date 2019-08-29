import { IApiResponseError } from '../../types/api';
import { ErrorBase } from '../../models/error-base';

export function interceptResponse(response: Response): Promise<any> | undefined {
  if (response.ok) {
    return response.json();
  }

  if (response.statusText) {
    throw new ErrorBase(response.statusText);
  }

  response.json().then((res: IApiResponseError) => {
    throw new ErrorBase(res.errors);
  });
}
