import { Types } from 'mongoose';
import { ValidateError } from 'tsoa';

/**
 * Data validation function.
 * Validates the given id against the MongoDB ObjectId format.
 * @param id Identifier to be validated
 * @throws The {@link ValidateError}
 */
export function validateObjectId(id?: string): void {
  if (!id || !Types.ObjectId.isValid(id)) {
    throw new ValidateError(
      { id: { message: 'Given id is not a valid ObjectId', value: id } },
      'Field validation'
    );
  }
}
