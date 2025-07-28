#!/usr/bin / env node

/**
 * Interactive DB seeder with per-table “drop first?” toggle
 * ---------------------------------------------------------
 * 1. Ask which seeders to run               (multiselect)
 * 2. Ask which of those to DROP … IF EXISTS (multiselect)
 * 3. Execute selected seeders inside one transaction,
 *    passing a   shouldDrop   boolean to each.
 */

import postgres from 'postgres';
import bcrypt from 'bcrypt';
import prompts from 'prompts';
import 'dotenv/config';

import {
   neighborhoods,
   users,
} from '@/scripts/seed-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ---------- helpers ------------------------------------------------------ */

type SqlClient = ReturnType<typeof postgres>;

async function seedUsers(client: SqlClient, shouldDrop = false) {
   await client`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   if (shouldDrop) await client`DROP TABLE IF EXISTS users`;

   await client`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      neighborhood_id UUID REFERENCES neighborhoods(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

   return Promise.all(
      users.map(async (user) => {
         const hashed = await bcrypt.hash(user.password, 10);
         return client`
        INSERT INTO users (full_name, email, password)
        VALUES (${user.full_name}, ${user.email}, ${hashed})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
   );
}

async function seedNeighborhoods(client: SqlClient, shouldDrop = false) {
   await client`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   if (shouldDrop) await client`DROP TABLE IF EXISTS neighborhoods`;

   await client`
    CREATE TABLE IF NOT EXISTS neighborhoods (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      full_name TEXT NOT NULL,
      address TEXT,
      description TEXT,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      country VARCHAR(100) NOT NULL,
      postal_code VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `;

   return Promise.all(
      neighborhoods.map(async (neighborhood) => {
         return client`
            INSERT INTO neighborhoods (full_name, address, description, city, state, country, postal_code)
            VALUES (${neighborhood.full_name}, ${neighborhood.address}, ${neighborhood.description}, ${neighborhood.city}, ${neighborhood.state}, ${neighborhood.country}, ${neighborhood.postal_code})
            ON CONFLICT (id) DO NOTHING;
         `;
      }),
   );
}

async function seedIssues(client: SqlClient, shouldDrop = false) {
   await client`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
   if (shouldDrop) await client`DROP TABLE IF EXISTS issues`;
   if (shouldDrop) await client`DROP TABLE IF EXISTS issue_upvotes`;

   await client`
      CREATE TABLE IF NOT EXISTS issues (
         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
         title TEXT NOT NULL,
         description TEXT NOT NULL,
         status VARCHAR(20) NOT NULL DEFAULT 'open',
         created_at TIMESTAMP DEFAULT NOW(),
         updated_at TIMESTAMP DEFAULT NOW(),
         user_id UUID REFERENCES users(id) ON DELETE SET NULL,
         neighborhood_id UUID NOT NULL REFERENCES neighborhoods(id) ON DELETE CASCADE
      );
   `;

   await client`
      CREATE TABLE IF NOT EXISTS issue_upvotes (
         issue_id UUID NOT NULL,
         user_id UUID NOT NULL,
         upvoted_at TIMESTAMP NOT NULL DEFAULT NOW(),
         PRIMARY KEY (issue_id, user_id),
         FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE,
         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
   `;
}


type SeedKey =
   | 'users'
   | 'neighborhoods'
   | 'issues';

const SEEDERS: Record<
   SeedKey,
   (client: SqlClient, drop: boolean) => Promise<unknown>
> = {
   'users': seedUsers,
   'neighborhoods': seedNeighborhoods,
   'issues': seedIssues,
};

const SEED_CHOICES = (Object.keys(SEEDERS) as SeedKey[]).map((k) => ({
   title: k[0].toUpperCase() + k.slice(1),
   value: k,
}));

/* ---------- main --------------------------------------------------------- */

(async function main() {
   try {
      /* 1️⃣  Which seeders? */
      const { picked = [] } = await prompts({
         type: 'multiselect',
         name: 'picked',
         message:
            'Select the seeders you want to run (space = select, enter = confirm):',
         choices: SEED_CHOICES,
         min: 1,
         hint: '- Space to toggle; Enter to confirm',
      });

      if (!picked.length) {
         console.log('Nothing selected — aborting.\n');
         process.exit(0);
      }

      /* 2️⃣  For the chosen seeders, which tables should be dropped first? */
      const { toDrop = [] } = await prompts({
         type: 'multiselect',
         name: 'toDrop',
         message:
            'Drop the table first for which selections? (optional — leave blank to keep existing data)',
         choices: SEED_CHOICES.filter((c) => picked.includes(c.value)),
         hint: '- Space to toggle; Enter to confirm',
      });

      /* 3️⃣  Execute the seeders in one transaction */
      const results = await sql.begin(async (tx) => {
         const out: unknown[] = [];
         for (const key of picked as SeedKey[]) {
            const shouldDrop = toDrop.includes(key);
            out.push(await SEEDERS[key](tx, shouldDrop));
         }
         return out;
      });

      console.log('\n✅  Database seeded successfully.');
      console.dir(results, { depth: null });
      process.exit(0);
   } catch (err) {
      console.error('\n❌  Seed failed:', err);
      process.exit(1);
   }
})();
