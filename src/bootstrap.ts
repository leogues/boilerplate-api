import '@di/container.ts';
import { Elysia } from 'elysia';
import { instrumentation } from './instrumentation.ts';

import { cors } from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import serverTiming from '@elysiajs/server-timing';
import { openapiConfig } from './config/openapi.ts';
import { errorHandler } from './shared/infra/http/hooks/errorHandler.ts';
import { httpMetrics } from './shared/infra/http/hooks/httpMetrics.ts';
import { requestContext } from './shared/infra/http/hooks/requestContext.ts';
import { api, ops } from './routes.ts';

const app = new Elysia()
  .use(instrumentation)
  .use(cors())
  .use(httpMetrics)
  .use(serverTiming())
  .use(openapi(openapiConfig))
  .use(requestContext)
  .use(errorHandler)
  .use(ops)
  .use(api);

export { app };
