import { trace } from '@shared/infra/decorators/trace.ts';
import type { GenericRepository } from '@/shared/domain/repositories/GenericRepository.ts';
import { type Database, kyselyDb } from '../kyselyDB.ts';

class KyselyGenericRepository<T extends keyof Database & string, I = number>
  implements GenericRepository<Database[T], I>
{
  constructor(private readonly tableName: T) {}

  @trace()
  async add(entity: Partial<Database[T]>): Promise<Database[T]> {
    const result = await kyselyDb
      .insertInto(this.tableName)
      .values(entity as never)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as Database[T];
  }

  @trace()
  async getById(id: I): Promise<Database[T] | null> {
    const result = await kyselyDb
      .selectFrom(this.tableName as never)
      .where('id' as never, '=', id as never)
      .selectAll()
      .executeTakeFirst();

    return (result as Database[T]) ?? null;
  }

  @trace()
  async updateById(id: I, entity: Partial<Database[T]>): Promise<Database[T]> {
    const result = await kyselyDb
      .updateTable(this.tableName as never)
      .set(entity as never)
      .where('id' as never, '=', id as never)
      .returningAll()
      .executeTakeFirstOrThrow();

    return result as Database[T];
  }

  @trace()
  async deleteById(id: I): Promise<void> {
    await kyselyDb
      .deleteFrom(this.tableName as never)
      .where('id' as never, '=', id as never)
      .execute();
  }

  @trace()
  async deleteAll(): Promise<void> {
    await kyselyDb.deleteFrom(this.tableName).execute();
  }
}

export { KyselyGenericRepository };
