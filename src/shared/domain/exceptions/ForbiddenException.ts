import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class ForbiddenException extends BaseException {
  constructor(message = 'Forbidden', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.Forbidden, metadata });
  }
}

export { ForbiddenException };
