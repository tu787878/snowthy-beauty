import { defaultSiteContent, normalizeSiteContent, type SiteContent } from "./site-content";

const createSql = `CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  content TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

async function database() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) throw new Error("D1 binding DB is unavailable");
  await env.DB.prepare(createSql).run();
  return env.DB;
}

export async function readSiteContent(): Promise<SiteContent> {
  const db = await database();
  const row = await db.prepare("SELECT content FROM site_settings WHERE id = 1").first<{ content: string }>();
  if (!row) return defaultSiteContent;
  try {
    return normalizeSiteContent(JSON.parse(row.content));
  } catch {
    return defaultSiteContent;
  }
}

export async function writeSiteContent(input: unknown): Promise<SiteContent> {
  const content = normalizeSiteContent(input);
  const db = await database();
  await db.prepare(`INSERT INTO site_settings (id, content, updated_at)
    VALUES (1, ?, CURRENT_TIMESTAMP)
    ON CONFLICT(id) DO UPDATE SET content = excluded.content, updated_at = CURRENT_TIMESTAMP`)
    .bind(JSON.stringify(content))
    .run();
  return content;
}
