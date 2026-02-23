function once<T extends (...args: never[]) => unknown>(fn: T): T {
  let called = false;

  return ((...args: Parameters<T>) => {
    if (called) return;
    called = true;

    return fn(...args);
  }) as T;
}

export { once };
