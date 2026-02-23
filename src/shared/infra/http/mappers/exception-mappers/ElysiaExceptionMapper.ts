import { BadRequestException } from '@shared/domain/exceptions/BadRequestException.ts';
import type { BaseException } from '@shared/domain/exceptions/BaseException.ts';
import { NotFoundException } from '@shared/domain/exceptions/NotFoundException.ts';
import { UnprocessableException } from '@shared/domain/exceptions/UnprocessableException.ts';
import type { ErrorExceptionMapper } from '@shared/domain/mappers/ErrorExceptionMapper.ts';

const ELYSIA_EXCEPTION_MAP: Record<string, () => BaseException> = {
  VALIDATION: () => new UnprocessableException(),
  NOT_FOUND: () => new NotFoundException(),
  PARSE: () => new BadRequestException('Malformed request body'),
};

class ElysiaExceptionMapper implements ErrorExceptionMapper {
  canHandle(code: string | number): boolean {
    return typeof code === 'string' && code in ELYSIA_EXCEPTION_MAP;
  }

  toException(code: string | number): BaseException {
    const factory = ELYSIA_EXCEPTION_MAP[code] as () => BaseException;
    return factory();
  }
}

export { ElysiaExceptionMapper };
