import { trace } from '@shared/infra/decorators/trace.ts';
import { sql } from 'kysely';
import type { HealthRepository } from '@/modules/health/domain/repositories/HealthRepository';
import { kyselyDb } from '@/shared/infra/persistence/kysely/kyselyDB.ts';

class KyselyHealthRepository implements HealthRepository {
  @trace()
  async ping(): Promise<boolean> {
    try {
      await sql`SELECT 1`.execute(kyselyDb);

      return true;
    } catch {
      return false;
    }
  }
}

export { KyselyHealthRepository };
