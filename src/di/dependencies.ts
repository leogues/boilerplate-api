import { HEALTH_DEPENDENCIES } from '../modules/health/dependencies.ts';
import { SHARED_DEPENDENCIES } from '../shared/dependencies.ts';

const DEPENDENCIES = {
  ...SHARED_DEPENDENCIES,
  ...HEALTH_DEPENDENCIES,
} as const;

export { DEPENDENCIES };
