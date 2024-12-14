import { FieldErrors } from 'tsoa';

export interface ApiResponse<T> extends BaseApiResponse {
  data: T;
}

export interface BaseApiResponse {
  message?: string;
  success: boolean;
  validationErrors?: FieldErrors;
}
