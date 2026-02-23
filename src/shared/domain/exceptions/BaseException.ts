import type { ExceptionCode } from '../enums/ExceptionCode.ts';

interface BaseExceptionOptions {
  message: string;
  code: ExceptionCode;
  metadata?: Record<string, unknown>;
  reportable?: boolean;
}

class BaseException extends Error {
  readonly code: ExceptionCode;
  readonly metadata?: Record<string, unknown>;
  readonly reportable: boolean;

  constructor({ message, code, metadata, reportable = false }: BaseExceptionOptions) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.metadata = metadata;
    this.reportable = reportable;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { BaseException };
