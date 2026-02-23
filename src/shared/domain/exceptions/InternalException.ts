import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class InternalException extends BaseException {
  constructor(metadata?: Record<string, unknown>) {
    super({ message: 'Internal Server Error', code: ExceptionCode.Internal, metadata, reportable: true });
  }
}

export { InternalException };
