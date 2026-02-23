import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class BadRequestException extends BaseException {
  constructor(message = 'Bad request', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.BadRequest, metadata });
  }
}

export { BadRequestException };
