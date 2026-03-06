import { BadRequestException } from '@shared/domain/exceptions/BadRequestException.ts';
import type { BaseException } from '@shared/domain/exceptions/BaseException.ts';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException.ts';
import { ValidationException } from '@shared/domain/exceptions/ValidationException.ts';
import type { ErrorExceptionMapper } from '@shared/domain/mappers/ErrorExceptionMapper.ts';
import { ValidationError } from 'elysia';

const ELYSIA_EXCEPTION_MAP: Record<string, (error: unknown) => BaseException> = {
  VALIDATION: error => {
    if (error instanceof ValidationError) {
      const details: Record<string, string> = {};
      for (const e of error.all) {
        details[e.path] = e.message;
      }
      return new ValidationException('Validation failed', undefined, details);
    }
    return new ValidationException();
  },
  NOT_FOUND: () => new NotFoundException(),
  PARSE: () => new BadRequestException('Malformed request body'),
};

class ElysiaExceptionMapper implements ErrorExceptionMapper {
  canHandle(code: string | number): boolean {
    return typeof code === 'string' && code in ELYSIA_EXCEPTION_MAP;
  }

  toException(code: string | number, error: unknown): BaseException {
    const factory = ELYSIA_EXCEPTION_MAP[code] as (error: unknown) => BaseException;
    return factory(error);
  }
}

export { ElysiaExceptionMapper };
