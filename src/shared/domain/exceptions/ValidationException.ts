import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class ValidationException extends BaseException {
  readonly details?: Record<string, string>;

  constructor(message = 'Unprocessable Entity', metadata?: Record<string, unknown>, details?: Record<string, string>) {
    super({ message, code: ExceptionCode.Validation, metadata });
    this.details = details;
  }
}

export { ValidationException };
