import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class NotFoundException extends BaseException {
  constructor(message = 'Not found', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.NotFound, metadata });
  }
}

export { NotFoundException };
