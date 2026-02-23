import { t } from 'elysia';

const HealthStatusSchema = t.Union([t.Literal('healthy'), t.Literal('unhealthy')]);

const HealthResponse = t.Object({
  status: HealthStatusSchema,
});

const ReadinessResponse = t.Object({
  status: HealthStatusSchema,
  components: t.Record(
    t.String(),
    t.Object({
      status: HealthStatusSchema,
    }),
  ),
});

export { HealthResponse, ReadinessResponse };
