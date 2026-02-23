import { parseContentLength } from '@shared/infra/functions/parse.ts';
import { elapsedSeconds } from '@shared/infra/functions/time.ts';
import { StatusCodeMapper } from '@shared/infra/http/mappers/StatusCodeMapper.ts';
import {
  httpServerActiveRequests,
  httpServerRequestBodySize,
  httpServerRequestDuration,
} from '@shared/infra/metrics/opentelemetry/httpMetrics.ts';
import { Elysia } from 'elysia';

type DurationAttributes = {
  method: string;
  route: string;
  status: number;
};

type RouteAttributes = {
  method: string;
  route: string;
};

const httpMetrics = new Elysia({ name: 'httpMetrics' })
  .state('startTime', 0)
  .onRequest(function httpMetricsOnRequest({ store }) {
    store.startTime = performance.now();
  })
  .onTransform(function httpMetricsOnTransform({ request, route }) {
    const routeAttributes = getRouteAttributes({
      method: request.method,
      route,
    });

    httpServerActiveRequests.add(1, routeAttributes);

    const contentLength = parseContentLength(request.headers.get('content-length'));
    if (contentLength) httpServerRequestBodySize.record(contentLength, routeAttributes);
  })
  .onAfterResponse(function httpMetricsAfterResponse({ store, request, set, route }) {
    const method = request.method;
    const elapsed = elapsedSeconds(store.startTime);
    const status = StatusCodeMapper.toNumber(set.status);

    const durationAttributes = getDurationAttributes({ method, route, status });

    httpServerRequestDuration.record(elapsed, durationAttributes);
    httpServerActiveRequests.add(-1, getRouteAttributes({ method, route }));
  })
  .as('global');

function getDurationAttributes({ method, route, status }: DurationAttributes) {
  return {
    'http.request.method': method,
    'http.route': route,
    'http.response.status_code': status,
  };
}

function getRouteAttributes({ method, route }: RouteAttributes) {
  return {
    'http.request.method': method,
    'http.route': route,
  };
}

export { httpMetrics };
