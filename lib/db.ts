import { Pool } from "pg";

/**
 * Shared Postgres pool for lead storage.
 *
 * - Reads DATABASE_URL from the environment (Supabase/Neon/RDS/any Postgres).
 * - SSL is enabled by default (managed providers require it); set
 *   DATABASE_SSL=false for a local Postgres without SSL.
 * - The leads table is created lazily on first insert.
 */

let pool: Pool | null = null;
let poolFailed = false;
let schemaReady: Promise<void> | null = null;

export function getPool(): Pool | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (poolFailed) return null;
  if (!pool) {
    const sslDisabled = process.env.DATABASE_SSL === "false";
    try {
      pool = new Pool({
        connectionString: url,
        ssl: sslDisabled ? false : { rejectUnauthorized: false },
        max: 5,
        idleTimeoutMillis: 30_000,
        connectionTimeoutMillis: 10_000,
      });
      pool.on("error", (err) => {
        console.error("[db] idle client error", err);
      });
    } catch (err) {
      poolFailed = true;
      console.error("[db] failed to create pool", err);
      return null;
    }
  }
  return pool;
}

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS leads (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  source      TEXT NOT NULL,
  label       TEXT,
  target      TEXT,
  page        TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS leads_email_source_key ON leads (email, source);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
`;

function ensureSchema(p: Pool): Promise<void> {
  if (!schemaReady) {
    schemaReady = p.query(SCHEMA_SQL).then(() => undefined);
    schemaReady.catch(() => {
      // Allow a retry on the next request if the schema setup failed.
      schemaReady = null;
    });
  }
  return schemaReady;
}

export type LeadInput = {
  email: string;
  source: string;
  label: string | null;
  target: string | null;
  page: string | null;
  userAgent: string | null;
};

export async function insertLead(lead: LeadInput): Promise<"inserted" | "duplicate"> {
  const p = getPool();
  if (!p) throw new Error("DATABASE_URL is not configured");
  await ensureSchema(p);
  const res = await p.query(
    `INSERT INTO leads (email, source, label, target, page, user_agent)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (email, source) DO NOTHING`,
    [lead.email, lead.source, lead.label, lead.target, lead.page, lead.userAgent]
  );
  return res.rowCount && res.rowCount > 0 ? "inserted" : "duplicate";
}
