/**
 * The database, connected once.
 *
 * Neon speaks the ordinary Postgres wire protocol, so unlike the hosted REST
 * API this replaced, every query here is SQL and every value in it is a bound
 * parameter. That distinction is the whole reason this file imports a driver
 * instead of using fetch: the visitor's name, job title and review text are
 * interpolated, and the tagged template below is what makes them parameters
 * rather than syntax. String-concatenating them would be an injection.
 *
 * SECURITY: DATABASE_URL carries the database password, and the `.server.` in
 * this filename is load-bearing — TanStack Start's import protection fails the
 * build if a client module reaches this file, so the password cannot drift into
 * a browser bundle without the build breaking loudly first.
 *
 * Keep the bracket reads below: they are what stops a bundler deciding
 * `process.env.SOMETHING` is statically inlinable.
 */

import { neon } from "@neondatabase/serverless";

/**
 * True when DATABASE_URL is present, so callers can skip a doomed query.
 *
 * Checked explicitly by callers rather than inferred from a thrown error: an
 * unconfigured deployment is a known state with a known fix, and naming it is
 * the difference between the owner reading "something went wrong" and knowing
 * in five seconds which variable to set.
 */
export function isConfigured(): boolean {
  return Boolean(process.env["DATABASE_URL"]);
}

/**
 * The query tag.
 *
 * Built per call rather than cached in a module-level variable, which looks
 * wasteful and is not: over Neon's HTTP transport there is no connection to
 * hold open, so the client is a closure around a URL and creating one costs
 * less than the branch that would guard a cache. It also means a changed
 * DATABASE_URL takes effect on the next call instead of the next deploy.
 *
 * Usage — note that every interpolated value becomes a bound parameter:
 *
 *   const rows = await db()`select id from reviews where status = ${status}`
 */
export function db() {
  const url = process.env["DATABASE_URL"];
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(url);
}

/**
 * Did this fail because the table was never created?
 *
 * The likeliest setup mistake after setting DATABASE_URL and stopping: the
 * schema file was never run. Postgres reports that as SQLSTATE 42P01, and the
 * driver exposes it as `code` — but not on every transport, so the message is
 * checked as well. Both checks are here on purpose; this is a nicety that
 * produces a better error, so a miss falls back to the generic message rather
 * than breaking anything.
 */
export function isMissingTable(error: unknown): boolean {
  if (typeof error !== "object" || error === null) return false;

  if ((error as { code?: unknown }).code === "42P01") return true;

  const message = (error as { message?: unknown }).message;
  return typeof message === "string" && /relation .* does not exist/i.test(message);
}
