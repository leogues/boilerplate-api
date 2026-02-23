import { resolve } from 'node:path';
import { loggerConfig } from '@config/logger.ts';
import pino, { type Logger } from 'pino';
import { injectable } from 'tsyringe';
import type { LoggerProvider } from '@/shared/domain/providers/LoggerProvider/LoggerProvider';

@injectable()
class PinoLoggerProvider implements LoggerProvider {
  private logger!: Logger;

  constructor() {
    const prettyTransport = pino.transport({
      target: resolve(process.cwd(), 'node_modules/pino-pretty'),
      level: loggerConfig.level,
      options: {
        ignore: 'requestId,traceId',
      },
    });

    const otelTransport = pino.transport({
      target: resolve(process.cwd(), 'node_modules/pino-opentelemetry-transport'),
      level: loggerConfig.level,
      options: {
        loggerName: loggerConfig.serviceName,
        serviceVersion: loggerConfig.serviceVersion,
        resourceAttributes: {
          'service.name': loggerConfig.serviceName,
          'service.version': loggerConfig.serviceVersion,
          'deployment.environment.name': loggerConfig.environment,
        },
      },
    });

    const multistream = pino.multistream([
      { stream: prettyTransport, level: loggerConfig.level },
      { stream: otelTransport, level: loggerConfig.level },
    ]);

    this.logger = pino({ level: loggerConfig.level }, multistream);
  }

  info(message: string, meta?: Record<string, unknown>): void {
    this.logger.info(meta, message);
  }

  warn(message: string, meta?: Record<string, unknown>): void {
    this.logger.warn(meta, message);
  }

  error(message: string | Error, meta?: Record<string, unknown>): void {
    if (message instanceof Error) {
      this.logger.error({ err: message, ...meta }, message.message);
      return;
    }

    this.logger.error(meta, message);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.logger.debug(meta, message);
  }

  child(bindings: Record<string, unknown>): LoggerProvider {
    const child = Object.create(PinoLoggerProvider.prototype) as PinoLoggerProvider;
    child.logger = this.logger.child(bindings);
    return child;
  }

  async flush(): Promise<void> {
    await new Promise<void>(resolve => {
      this.logger.flush(() => resolve());
    });
  }
}

export { PinoLoggerProvider };
