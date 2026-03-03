import { errorModels } from '@shared/infra/http/models/errorModels.ts';
import { Elysia } from 'elysia';
import { HealthController } from './controllers/HealthController.ts';
import { HealthResponse, ReadinessResponse } from './schemas/healthSchemas.ts';

const controller = new HealthController();

const healthRoutes = new Elysia()
  .use(errorModels)
  .model({
    HealthResponse,
    ReadinessResponse,
  })
  .get('/healthz', () => controller.checkHealth(), {
    detail: {
      description: 'Liveness probe — checks if the application is running',
    },
    response: {
      200: 'HealthResponse',
    },
  })
  .get('/readyz', () => controller.checkReadiness(), {
    detail: {
      description: 'Readiness probe — checks if the application and its dependencies are ready',
    },
    response: {
      200: 'ReadinessResponse',
      503: 'ServiceUnavailableResponse',
    },
  });

export { healthRoutes };
