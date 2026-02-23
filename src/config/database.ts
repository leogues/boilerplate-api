import { env } from './env';

const databaseConfig = {
  url: env.DATABASE_URL,
  poolSize: env.DATABASE_POOL_SIZE,
};

export { databaseConfig };
