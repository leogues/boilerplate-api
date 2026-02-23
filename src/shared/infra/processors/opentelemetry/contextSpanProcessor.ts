import type { Span } from '@opentelemetry/api';
import type { ReadableSpan, SpanProcessor } from '@opentelemetry/sdk-trace-node';
import { type RequestStore, requestContextStorage } from '@shared/infra/context/requestContext';

const attributeMapping = {
  requestId: 'http.request.header.x_request_id',
} satisfies Record<keyof RequestStore, string>;

const contextSpanProcessor: SpanProcessor = {
  onStart(span: Span) {
    const store = requestContextStorage.getStore();
    if (!store) return;

    for (const key in attributeMapping) {
      const storeKey = key as keyof typeof attributeMapping;
      const value = store[storeKey];
      if (value) {
        span.setAttribute(attributeMapping[storeKey], String(value));
      }
    }
  },
  onEnd(_span: ReadableSpan) {},
  shutdown() {
    return Promise.resolve();
  },
  forceFlush() {
    return Promise.resolve();
  },
};

export { contextSpanProcessor };
