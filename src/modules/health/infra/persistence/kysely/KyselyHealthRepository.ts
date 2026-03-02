import { safe } from '@shared/infra/decorators/safe.ts';
import { trace } from '@shared/infra/decorators/trace.ts';
import { sql } from 'kysely';
import type { HealthRepository } from '@/modules/health/domain/repositories/HealthRepository';
import { kyselyDb } from '@/shared/infra/persistence/kysely/kyselyDB.ts';

class KyselyHealthRepository implements HealthRepository {
  @trace()
  @safe(false)
  async ping(): Promise<boolean> {
    await sql`SELECT 1`.execute(kyselyDb);
    return true;
  }
}

export { KyselyHealthRepository };
