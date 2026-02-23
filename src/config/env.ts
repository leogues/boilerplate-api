import { type Static, Type } from '@sinclair/typebox';
import { parseSchema } from '../shared/infra/schema/parseSchema.ts';

const EnvSchema = Type.Object({
  SERVICE_NAME: Type.String({ default: 'boilerplate-api' }),
  PORT: Type.Number({ default: 3000 }),
  NODE_ENV: Type.Union([Type.Literal('development'), Type.Literal('production'), Type.Literal('test')], {
    default: 'production',
  }),
  LOG_LEVEL: Type.Union([Type.Literal('error'), Type.Literal('warn'), Type.Literal('info'), Type.Literal('debug')], {
    default: 'error',
  }),

  DATABASE_URL: Type.String(),
  DATABASE_POOL_SIZE: Type.Number({ default: 10 }),
  REDIS_URL: Type.String(),
  REDIS_MAX_RETRIES: Type.Number({ default: 5 }),

  OTEL_EXPORTER_OTLP_ENDPOINT: Type.String(),
  OTEL_EXPORTER_OTLP_PROTOCOL: Type.Union([Type.Literal('http/protobuf'), Type.Literal('grpc'), Type.Literal('http')], {
    default: 'http/protobuf',
  }),
});

type Env = Static<typeof EnvSchema>;

const env: Env = parseSchema(EnvSchema, { ...process.env });

export { env, type Env };
