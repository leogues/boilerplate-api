import 'reflect-metadata';
import { container } from 'tsyringe';
import { app } from './bootstrap.ts';
import { appConfig } from './config/app.ts';
import { DEPENDENCIES } from './di/dependencies.ts';
import type { LoggerProvider } from './shared/domain/providers/LoggerProvider/LoggerProvider.ts';
import { once } from './shared/infra/functions/once.ts';
import { kyselyDb } from './shared/infra/persistence/kysely/kyselyDB.ts';

const logger = container.resolve<LoggerProvider>(DEPENDENCIES.LoggerProvider);

app.listen(appConfig.port, () => {
  const baseUrl = `http://${app.server?.hostname}:${app.server?.port}`;

  logger.info(`Server running at ${baseUrl}`);
  logger.info(`OpenAPI docs at ${baseUrl}/openapi`);
});

const shutdown = once(async () => {
  logger.info('Shutting down gracefully...');

  await app.server?.stop();
  await kyselyDb.destroy();

  logger.info('Shutdown complete');
  await logger.flush();
  process.exit(0);
});

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
