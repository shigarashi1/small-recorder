import { IApiResponseError } from '../../types/api';
import { ApiError } from '../../models/error';

export function interceptResponse(response: Response): Promise<any> | undefined {
  if (response.ok) {
    return response.json();
  }

  if (response.statusText) {
    throw new ApiError(response.statusText);
  }

  response.json().then((res: IApiResponseError) => {
    throw new ApiError(res.errors[0]);
  });
}
