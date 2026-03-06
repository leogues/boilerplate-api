import { DEPENDENCIES } from '@di/dependencies.ts';
import { ValidationException } from '@shared/domain/exceptions/ValidationException.ts';
import type { LoggerProvider } from '@shared/domain/providers/LoggerProvider/LoggerProvider.ts';
import { Elysia } from 'elysia';
import { container } from 'tsyringe';
import { ExceptionHttpMapper } from '../mappers/ExceptionHttpMapper';
import { ElysiaExceptionMapper } from '../mappers/exception-mappers/ElysiaExceptionMapper';
import { ExceptionMapperChain } from '../mappers/exception-mappers/ExceptionMapperChain';

const exceptionMapper = new ExceptionMapperChain([new ElysiaExceptionMapper()]);

const errorHandler = new Elysia({ name: 'errorHandler' })
  .onError(function errorHandlerHook({ code, error, set }) {
    const exception = exceptionMapper.toException(code, error);

    if (exception.reportable) {
      const logger = container.resolve<LoggerProvider>(DEPENDENCIES.LoggerProvider);
      logger.error(exception.message, exception.metadata);
    }

    const httpMapping = ExceptionHttpMapper.toHttp(exception.code);
    set.status = httpMapping.status;

    if (exception instanceof ValidationException) {
      return {
        status: httpMapping.status,
        error: httpMapping.error,
        message: exception.message,
        details: exception.details,
      };
    }

    return {
      status: httpMapping.status,
      error: httpMapping.error,
      message: exception.message,
    };
  })
  .as('global');

export { errorHandler };
