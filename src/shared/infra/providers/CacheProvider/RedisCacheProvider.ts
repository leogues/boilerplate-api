import { cacheConfig } from '@config/cache.ts';
import { trace } from '@shared/infra/decorators/trace.ts';
import { RedisClient } from 'bun';
import type { CacheProvider } from '@/shared/domain/providers/CacheProvider/CacheProvider';

class RedisCacheProvider implements CacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new RedisClient(cacheConfig.url, {
      maxRetries: cacheConfig.maxRetries,
    });
  }

  @trace()
  async save<T>(key: string, value: T, ttl?: number): Promise<void> {
    const serialized = JSON.stringify(value);

    if (ttl) {
      await this.client.send('SET', [key, serialized, 'EX', String(ttl)]);
      return;
    }

    await this.client.set(key, serialized);
  }

  @trace()
  async recover<T>(key: string): Promise<T | null> {
    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    return JSON.parse(value) as T;
  }

  @trace()
  async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }

  @trace()
  async ping(): Promise<boolean> {
    try {
      await this.client.send('PING', []);
      return true;
    } catch {
      return false;
    }
  }
}

export { RedisCacheProvider };
