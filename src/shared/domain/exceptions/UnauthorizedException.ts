import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class UnauthorizedException extends BaseException {
  constructor(message = 'Unauthorized', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.Unauthorized, metadata });
  }
}

export { UnauthorizedException };
