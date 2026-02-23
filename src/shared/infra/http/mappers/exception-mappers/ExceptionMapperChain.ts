import { BaseException } from '@shared/domain/exceptions/BaseException.ts';
import { InternalException } from '@shared/domain/exceptions/InternalException.ts';
import type { ErrorExceptionMapper } from '@shared/domain/mappers/ErrorExceptionMapper.ts';

class ExceptionMapperChain {
  private readonly mappers: ErrorExceptionMapper[];

  constructor(mappers: ErrorExceptionMapper[]) {
    this.mappers = mappers;
  }

  toException(code: string | number, error: unknown): BaseException {
    if (error instanceof BaseException) return error;

    for (const mapper of this.mappers) {
      if (mapper.canHandle(code, error)) {
        return mapper.toException(code, error);
      }
    }

    if (error instanceof Error) {
      return new InternalException({
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    }

    return new InternalException({ message: String(error) });
  }
}

export { ExceptionMapperChain };
