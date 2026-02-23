const SHARED_DEPENDENCIES = {
  LoggerProvider: Symbol.for('LoggerProvider'),
  CacheProvider: Symbol.for('CacheProvider'),
} as const;

export { SHARED_DEPENDENCIES };
