import { HEALTH_DEPENDENCIES } from '../modules/health/dependencies.ts';
import { PRODUCT_DEPENDENCIES } from '../modules/products/dependencies.ts';
import { SHARED_DEPENDENCIES } from '../shared/dependencies.ts';

const DEPENDENCIES = {
  ...SHARED_DEPENDENCIES,
  ...HEALTH_DEPENDENCIES,
  ...PRODUCT_DEPENDENCIES,
} as const;

export { DEPENDENCIES };
