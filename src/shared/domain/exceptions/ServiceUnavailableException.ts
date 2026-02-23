import { ExceptionCode } from '../enums/ExceptionCode.ts';
import { BaseException } from './BaseException.ts';

class ServiceUnavailableException extends BaseException {
  constructor(message = 'Service Unavailable', metadata?: Record<string, unknown>) {
    super({ message, code: ExceptionCode.ServiceUnavailable, metadata, reportable: true });
  }
}

export { ServiceUnavailableException };
