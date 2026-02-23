interface CacheProvider {
  save<T>(key: string, value: T, ttl?: number): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  ping(): Promise<boolean>;
}

export type { CacheProvider };
