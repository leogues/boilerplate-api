import { record } from '@elysiajs/opentelemetry';

function getClassName(context: object): string {
  if (typeof context === 'function') return context.name;

  return context.constructor.name;
}

function trace(spanName?: string): MethodDecorator {
  return (_, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const methodName = String(propertyKey);

    descriptor.value = function (this: object, ...args: unknown[]) {
      const name = spanName ?? `${getClassName(this)}.${methodName}`;

      return record(name, () => originalMethod.apply(this, args));
    };

    return descriptor;
  };
}

export { trace };
