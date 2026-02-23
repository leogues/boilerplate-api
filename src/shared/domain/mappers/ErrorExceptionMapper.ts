import type { BaseException } from '@shared/domain/exceptions/BaseException.ts';

interface ErrorExceptionMapper {
  canHandle(code: string | number, error: unknown): boolean;
  toException(code: string | number, error: unknown): BaseException;
}

export type { ErrorExceptionMapper };
