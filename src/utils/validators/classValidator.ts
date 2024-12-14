import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateError } from 'tsoa';

/**
 * Data validation function.
 * Accepts data and target class and validates the data against the class.
 * Throws a ValidateError if validation fails for compatibility with TSOA.
 * See {@link class-validator} for more information.
 * @param data Data to be validated
 * @param targetClass Class to validate the data against
 * @throws The {@link ValidateError}
 * @reference {@link https://tsoa-community.github.io/docs/custom-validation.html#custom-validation-with-class-validator}
 */
export async function validateData<T extends object>(
  data: unknown,
  targetClass: ClassConstructor<T>
): Promise<void> {
  const instance = plainToInstance(targetClass, data);
  const errors = await validate(instance, {
    forbidUnknownValues: true,
    validationError: {
      target: false,
    },
  });
  const fieldsErrors: Record<string, { message: string; value: string }> = {};

  if (errors.length > 0) {
    errors.forEach((error) => {
      if (error.constraints) {
        fieldsErrors[error.property] = {
          message: Object.values(error.constraints).join(', '),
          value: error.value,
        };
      }
      if (error.children) {
        error.children.forEach((errorNested) => {
          if (errorNested.constraints) {
            fieldsErrors[errorNested.property] = {
              message: Object.values(errorNested.constraints).join(', '),
              value: errorNested.value,
            };
          }
        });
      }
    });

    throw new ValidateError(fieldsErrors, 'Field validation');
  }
}
