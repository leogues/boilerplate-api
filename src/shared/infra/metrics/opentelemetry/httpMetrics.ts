import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('http');

const httpServerRequestDuration = meter.createHistogram('http.server.request.duration', {
  description: 'Duration of HTTP server requests',
  unit: 's',
  advice: {
    explicitBucketBoundaries: [0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10],
  },
});

const httpServerActiveRequests = meter.createUpDownCounter('http.server.active_requests', {
  description: 'Number of active HTTP server requests',
  unit: '{request}',
});

const httpServerRequestBodySize = meter.createHistogram('http.server.request.body.size', {
  description: 'Size of HTTP server request bodies',
  unit: 'By',
  advice: {
    explicitBucketBoundaries: [100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000],
  },
});

export { httpServerActiveRequests, httpServerRequestBodySize, httpServerRequestDuration };
