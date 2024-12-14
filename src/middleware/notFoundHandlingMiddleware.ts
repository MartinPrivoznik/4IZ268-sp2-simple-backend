import { Response } from 'express';
import { BaseApiResponse } from '../controllers/dto/ApiResponse';

/**
 * Application global not found handler.
 * Triggers if requested route was not found
 */
export const notFoundHandlingMiddleware = (
  _req: unknown,
  res: Response<BaseApiResponse>
) => {
  res.status(404).send({
    success: false,
    message: 'Endpoint not found',
  });
};
