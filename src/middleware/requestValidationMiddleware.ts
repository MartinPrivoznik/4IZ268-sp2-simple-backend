import { ClassConstructor } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validateData } from '../utils/validators/classValidator';

export function requestValidationMiddleware<T extends object>(
  targetClass: ClassConstructor<T>
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await validateData(req.body, targetClass);
      next();
    } catch (err) {
      next(err);
    }
  };
}
