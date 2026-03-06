import { errorModels } from '@shared/infra/http/models/errorModels.ts';
import { Elysia, t } from 'elysia';
import { healthRoutes } from './modules/health/infra/http/healthRoutes.ts';

const ops = new Elysia().use(healthRoutes);

const api = new Elysia({ prefix: '/api' }).use(errorModels).post(
  '/foo',
  ({ body }) => {
    return body.name;
  },
  {
    body: t.Object({
      name: t.String({ minLength: 3, maxLength: 50, pattern: '^[a-zA-Z ]+$' }),
      age: t.Number({ minimum: 1, maximum: 120 }),
    }),
    response: {
      200: t.String(),
      422: 'ValidationResponse',
      500: 'InternalErrorResponse',
    },
  },
);

export { api, ops };
