import { ValidateError } from 'tsoa';
import { BaseApiResponse } from '../controllers/dto/ApiResponse';
import NotFoundError from '../utils/exceptions/NotFoundError';
import { NextFunction, Request, Response } from 'express';

/**
 * Application global error handler.
 * Logs the error and sends a response based on error type
 */
export const errorHandlingMiddleware = (
  err: Error,
  req: Request,
  res: Response<BaseApiResponse>,
  next: NextFunction
) => {
  if (err instanceof ValidateError) {
    res.status(400).json({
      success: false,
      message: 'Validation error occured',
      validationErrors: err.fields,
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).json({ success: false, message: err.message });
  } else {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }

  next();
};
