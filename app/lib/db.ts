import postgres from 'postgres';

const globalForSql = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export const sql =
   globalForSql.sql ?? (globalForSql.sql = postgres(process.env.POSTGRES_URL!, {
      ssl: 'require',
      idle_timeout: 60,   // seconds before an idle conn. is dropped
      max_lifetime: 60 * 60 // optional: force recycle after 1 h
   }));
