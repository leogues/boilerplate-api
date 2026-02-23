import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class UnprocessableException extends BaseException {
  constructor(message = 'Unprocessable Entity', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.Unprocessable, metadata });
  }
}

export { UnprocessableException };
