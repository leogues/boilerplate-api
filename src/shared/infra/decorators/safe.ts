function safe<T = null>(fallback: T = null as T): MethodDecorator {
  return (_, __, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = async function (this: object, ...args: unknown[]) {
      try {
        return await original.apply(this, args);
      } catch {
        return fallback;
      }
    };

    return descriptor;
  };
}

export { safe };
