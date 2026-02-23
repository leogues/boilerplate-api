import { appConfig } from './app.ts';
import { env } from './env.ts';

const opentelemetryConfig = {
  serviceName: env.SERVICE_NAME,
  serviceVersion: appConfig.version,
  deploymentEnvironment: env.NODE_ENV,
};

export { opentelemetryConfig };
