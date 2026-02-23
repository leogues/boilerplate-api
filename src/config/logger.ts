import { appConfig } from './app.ts';
import { env } from './env.ts';

const loggerConfig = {
  level: env.LOG_LEVEL,
  serviceName: env.SERVICE_NAME,
  serviceVersion: appConfig.version,
  environment: env.NODE_ENV,
} as const;

export { loggerConfig };
