import { opentelemetry } from '@elysiajs/opentelemetry';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { PgInstrumentation } from '@opentelemetry/instrumentation-pg';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';
import { contextSpanProcessor } from '@shared/infra/processors/opentelemetry/contextSpanProcessor';
import { opentelemetryConfig } from './config/opentelemetry';

const instrumentation = opentelemetry({
  serviceName: opentelemetryConfig.serviceName,
  resource: resourceFromAttributes({
    'service.version': opentelemetryConfig.serviceVersion,
    'deployment.environment.name': opentelemetryConfig.deploymentEnvironment,
  }),
  spanProcessors: [contextSpanProcessor, new BatchSpanProcessor(new OTLPTraceExporter())],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  instrumentations: [
    new PgInstrumentation({
      requestHook: span => {
        span.setAttribute('db.statement', '');
      },
    }),
  ],
});

export { instrumentation };
