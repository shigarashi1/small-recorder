import { IApiResponseError } from '../types/api';
import { ErrorClass } from '../types/error';

export function interceptResponse(response: Response): Promise<any> | undefined {
  if (response.ok) {
    return response.json();
  }

  if (response.statusText) {
    throw new ErrorClass(response.statusText);
  }

  response.json().then((res: IApiResponseError) => {
    throw new ErrorClass(res.errors);
  });
}
