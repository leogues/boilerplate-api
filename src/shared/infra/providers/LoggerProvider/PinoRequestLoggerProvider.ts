import { getCurrentSpan } from '@elysiajs/opentelemetry';
import { trace } from '@shared/infra/decorators/trace.ts';
import type { LoggerProvider } from '@/shared/domain/providers/LoggerProvider/LoggerProvider';
import { requestContextStorage } from '../../context/requestContext';

class PinoRequestLoggerProvider {
  @trace()
  static create(rootLogger: LoggerProvider): LoggerProvider {
    const store = requestContextStorage.getStore();
    const spanContext = getCurrentSpan()?.spanContext();

    return rootLogger.child({
      requestId: store?.requestId,
      traceId: spanContext?.traceId,
    });
  }
}

export { PinoRequestLoggerProvider };
