import { env } from './env';

const cacheConfig = {
  url: env.REDIS_URL,
  maxRetries: env.REDIS_MAX_RETRIES,
};

export { cacheConfig };
