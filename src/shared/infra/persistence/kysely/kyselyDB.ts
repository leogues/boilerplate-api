import { databaseConfig } from '@config/database.ts';
import { Kysely, PostgresDialect } from 'kysely';
import pg from 'pg';

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    connectionString: databaseConfig.url,
    max: databaseConfig.poolSize,
  }),
});

const kyselyDb = new Kysely<Database>({
  dialect,
});

// biome-ignore lint/suspicious/noEmptyInterface: populated as tables are added
interface Database {}

export { kyselyDb, type Database };
