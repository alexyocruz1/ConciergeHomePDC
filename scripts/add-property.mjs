/**
 * Upsert one property from JSON (service role). Does not trigger Next.js cache;
 * new listings appear within ~60s or after the next deploy / admin save.
 *
 * Usage:
 *   npm run add-property
 *   npm run add-property -- ./my-property.json
 *
 * Requires in .env (or env passed another way):
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pathArg = process.argv[2];
const jsonPath = pathArg?.startsWith("-") ? null : pathArg;
const file = jsonPath ?? join(__dirname, "property.example.json");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

let raw;
try {
  raw = readFileSync(file, "utf8");
} catch (e) {
  console.error(`Cannot read ${file}:`, e.message);
  process.exit(1);
}

let row;
try {
  row = JSON.parse(raw);
} catch (e) {
  console.error("Invalid JSON:", e.message);
  process.exit(1);
}

if (!row.slug || typeof row.slug !== "string") {
  console.error('JSON must include a string "slug".');
  process.exit(1);
}

row.slug = row.slug.trim().toLowerCase();
row.updated_at = new Date().toISOString();

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase.from("properties").upsert(row, { onConflict: "slug" }).select("slug");

if (error) {
  console.error("Supabase error:", error.message);
  process.exit(1);
}

console.log("OK — upserted:", data?.[0]?.slug ?? row.slug);
console.log("Tip: set status to \"active\" to show on the site; cache may take up to ~60s.");
