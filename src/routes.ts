import { Elysia } from 'elysia';
import { healthRoutes } from './modules/health/infra/http/healthRoutes.ts';

const ops = new Elysia().use(healthRoutes);

const api = new Elysia({ prefix: '/api' }).get('/foo', () => {
  return 'bar';
});

export { api, ops };
