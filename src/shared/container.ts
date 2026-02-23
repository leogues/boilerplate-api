import 'reflect-metadata';
import { container } from 'tsyringe';
import { SHARED_DEPENDENCIES } from './dependencies.ts';
import type { CacheProvider } from './domain/providers/CacheProvider/CacheProvider.ts';
import type { LoggerProvider } from './domain/providers/LoggerProvider/LoggerProvider.ts';
import { RedisCacheProvider } from './infra/providers/CacheProvider/RedisCacheProvider.ts';
import { PinoLoggerProvider } from './infra/providers/LoggerProvider/PinoLoggerProvider.ts';
import { PinoRequestLoggerProvider } from './infra/providers/LoggerProvider/PinoRequestLoggerProvider.ts';

const pinoLogger = new PinoLoggerProvider();

container.register<LoggerProvider>(SHARED_DEPENDENCIES.LoggerProvider, {
  useFactory: () => PinoRequestLoggerProvider.create(pinoLogger),
});

container.register<CacheProvider>(SHARED_DEPENDENCIES.CacheProvider, RedisCacheProvider);
