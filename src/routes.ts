import { Elysia } from 'elysia';
import { healthRoutes } from './modules/health/infra/http/healthRoutes.ts';
import { productRoutes } from './modules/products/infra/http/productRoutes.ts';

const ops = new Elysia().use(healthRoutes);

const api = new Elysia({ prefix: '/api' }).use(productRoutes).get('/foo', () => {
  return 'bar';
});

export { api, ops };
