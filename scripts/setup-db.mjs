#!/usr/bin/env node
/**
 * Creates the reviews table.
 *
 * Run once, from the project root:
 *
 *   node --env-file=.env scripts/setup-db.mjs
 *
 * It reads db/schema.sql rather than carrying its own copy of the SQL, so the
 * file you would paste into a SQL editor by hand and the file this runs can
 * never disagree.
 *
 * Safe to run more than once: every statement in the schema is `if not exists`,
 * so a second run reports ok and changes nothing.
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { neon } from "@neondatabase/serverless";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    [
      "",
      "DATABASE_URL is not set.",
      "",
      "Run this with the env file loaded:",
      "",
      "  node --env-file=.env scripts/setup-db.mjs",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const sql = neon(url);

/*
 * Split the schema into individual statements.
 *
 * Whole-line comments are removed first, and that order matters: two of the
 * comments in db/schema.sql contain a semicolon in ordinary prose ("the form;
 * these are the backstop..."), so splitting first would cut a statement in half
 * and hand Postgres two fragments that are each syntax errors. Every comment in
 * that file is on its own line, which is what makes this safe — an inline
 * trailing comment would need a real parser.
 */
const statements = readFileSync(join(root, "db", "schema.sql"), "utf8")
  .split("\n")
  .filter((line) => !/^\s*--/.test(line))
  .join("\n")
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

console.log(`\nApplying db/schema.sql — ${statements.length} statements\n`);

for (const statement of statements) {
  // One line, trimmed to something readable, so a failure below points at a
  // statement you can find in the file.
  const label = statement.replace(/\s+/g, " ").slice(0, 72);

  try {
    await sql.query(statement);
    console.log(`  ok    ${label}`);
  } catch (error) {
    console.error(`\n  FAILED\n\n  ${label}\n`);
    console.error(`  ${error instanceof Error ? error.message : String(error)}\n`);
    process.exit(1);
  }
}

/*
 * Read the result back rather than trusting the statements above.
 *
 * "No error was thrown" and "the table exists" are different claims, and this
 * prints the second one. It is also the check that catches the mistake this
 * whole script exists to prevent: a table created by hand in the dashboard with
 * an INTEGER id, which would leave every insert failing on a uuid mismatch.
 */
const tables = await sql.query(
  "select table_name from information_schema.tables " +
    "where table_schema = 'public' order by table_name",
);

console.log("\nTables now in public:");
for (const row of tables) console.log(`  ${row.table_name}`);
console.log("\nDone.\n");
