import { errorModels } from '@shared/infra/http/models/errorModels.ts';
import { Elysia, t } from 'elysia';
import { healthRoutes } from './modules/health/infra/http/healthRoutes.ts';

const ops = new Elysia().use(healthRoutes);

const api = new Elysia({ prefix: '/api' }).use(errorModels).get(
  '/foo',
  () => {
    return 'bar';
  },
  {
    response: {
      200: t.String(),
      500: 'InternalErrorResponse',
    },
  },
);

export { api, ops };
