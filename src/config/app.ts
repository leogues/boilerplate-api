import pkg from '../../package.json';
import { env } from './env';

const appConfig = {
  version: pkg.version,
  port: env.PORT,
};

export { appConfig };
