import type { ElysiaOpenAPIConfig } from '@elysiajs/openapi';
import { appConfig } from './app.ts';

const openapiConfig: ElysiaOpenAPIConfig<true, '/openapi'> = {
  scalar: {
    spec: {
      url: '/openapi/json',
    },
  },
  documentation: {
    info: {
      title: 'Boilerplate API',
      version: appConfig.version,
      description: 'API boilerplate using Elysia with Bun',
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
  },
};

export { openapiConfig };
