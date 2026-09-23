/**
 * Every database question this feature asks, in one place.
 *
 * Callers are server functions, which is the only place DATABASE_URL is ever in
 * scope. Nothing in this file is importable from a component.
 *
 * The queries below are written as Neon's tagged template, so every `${...}` is
 * a bound parameter and never string-interpolated SQL. That is not a style
 * preference: the values include a visitor's name, job title and review text.
 */

import { createHash } from "node:crypto";
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

import { db, isConfigured } from "./db.server";
import { RATE_LIMIT_WINDOW_MS } from "./spam";
import type { AdminReview, PublicReview } from "./reviews-types";

/**
 * A row as the queries below return it.
 *
 * `created_at` is a string, not a Date, because the SQL formats it — see the
 * note on the select lists.
 */
interface ReviewRow {
  id: string;
  created_at: string;
  name: string;
  role: string;
  rating: number;
  body: string;
  service: string;
  email: string;
  status: "approved" | "hidden";
}

export interface NewReview {
  name: string;
  role: string;
  rating: number;
  body: string;
  service: string;
  email: string;
}

export { isConfigured };

/**
 * Pick the public fields off a row, by name.
 *
 * A second line of defence behind the select lists, which already omit `email`:
 * this copies fields across explicitly, so no component downstream can render
 * an address even if a future query starts returning one. A spread
 * (`{...row}`) would defeat that entirely, which is why the fields are listed.
 */
function toPublicReview(row: ReviewRow): PublicReview {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    rating: row.rating,
    body: row.body,
    service: row.service,
    createdAt: row.created_at,
  };
}

function toAdminReview(row: ReviewRow): AdminReview {
  return {
    ...toPublicReview(row),
    email: row.email,
    status: row.status,
  };
}

/*
 * Why every select writes its columns out and formats the timestamp in SQL.
 *
 * The columns: `email` is absent from every public select rather than fetched
 * and dropped in code, so the address never leaves Postgres on a public read.
 *
 * The timestamp: `to_char(... at time zone 'UTC', ...)` pins the value to a
 * canonical ISO-8601 string in the database. Left alone, a timestamptz arrives
 * as whatever the driver's current transport decided to parse it into — a Date
 * over HTTP, a string over WebSocket, and a different one again across driver
 * versions — and the client type says `string`. Formatting it here means the
 * client receives one shape, always, and ordering is unaffected: fixed-width
 * UTC ISO strings sort chronologically as text.
 *
 * The table alias: `order by r.created_at` names the real column rather than
 * the output alias, so ordering can never silently switch to sorting the
 * formatted text.
 */

/**
 * The reviews shown on `/` and `/reviews`.
 *
 * Deliberately uncached. The plan called for a 60-second cache, but that fights
 * the headline requirement — a review appears the moment it is submitted — and
 * on Vercel a cache is worse than useless for that: the insert and the page load
 * that follows it can land on different serverless instances, so the submitter
 * would sometimes see their own review missing for up to a minute with no way to
 * know why. This is one indexed query per page load against a table holding
 * tens of rows; there is nothing here worth caching.
 *
 * Every failure returns an empty list rather than throwing. A missing environment
 * variable or an unreachable database must degrade to the empty state, never to
 * a 500 on the homepage.
 */
export async function getPublicReviews(): Promise<PublicReview[]> {
  // Checked before the request rather than after: an unconfigured deployment is
  // a known state, not a failure, and logging an error on every homepage render
  // for it would bury the errors that do matter.
  if (!isConfigured()) return [];

  try {
    const rows = (await db()`
      select
        r.id, r.name, r.role, r.rating, r.body, r.service,
        to_char(r.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
      from reviews r
      where r.status = 'approved'
      order by r.created_at desc
    `) as ReviewRow[];

    return rows.map(toPublicReview);
  } catch (error) {
    console.error("[reviews] could not load public reviews:", error);
    return [];
  }
}

/** Everything, including hidden rows — the admin list. */
export async function listAllReviews(): Promise<AdminReview[]> {
  const rows = (await db()`
    select
      r.id, r.name, r.role, r.rating, r.body, r.service, r.email, r.status,
      to_char(r.created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
    from reviews r
    order by r.created_at desc
  `) as ReviewRow[];

  return rows.map(toAdminReview);
}

export async function createReview(
  input: NewReview,
  meta: {
    ipHash: string | null;
    userAgent: string | null;
    /**
     * 'hidden' stores the review without publishing it — used for submissions
     * the honeypot flagged, so that a false positive is recoverable from the
     * admin page rather than lost.
     */
    status?: "approved" | "hidden";
  },
): Promise<PublicReview> {
  const rows = (await db()`
    insert into reviews (name, role, rating, body, service, email, status, ip_hash, user_agent)
    values (
      ${input.name}, ${input.role}, ${input.rating}, ${input.body}, ${input.service},
      ${input.email}, ${meta.status ?? "approved"}, ${meta.ipHash}, ${meta.userAgent}
    )
    returning
      id, name, role, rating, body, service,
      to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as created_at
  `) as ReviewRow[];

  const inserted = rows[0];
  if (!inserted) {
    throw new Error("the insert returned no row");
  }
  return toPublicReview(inserted);
}

export async function setReviewStatus(
  id: string,
  status: "approved" | "hidden",
): Promise<void> {
  await db()`update reviews set status = ${status} where id = ${id}`;
}

export async function deleteReview(id: string): Promise<void> {
  await db()`delete from reviews where id = ${id}`;
}

/**
 * How many rows this sender has created inside the window.
 *
 * Counted from the table rather than from memory, so the limit survives a
 * serverless restart and applies across instances — which is the whole reason
 * there is no Redis or similar here.
 */
export async function recentSubmissionCount(ipHash: string): Promise<number> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

  const rows = (await db()`
    select count(*)::int as count
    from reviews
    where ip_hash = ${ipHash} and created_at >= ${since}
  `) as { count: number | string }[];

  // Wrapped in Number() because a driver in text-output mode can return an int
  // as a string, and a string compared against RATE_LIMIT_MAX would compare
  // wrongly rather than throw — the kind of bug that silently disables a limit.
  return Number(rows[0]?.count ?? 0);
}

/**
 * The caller's IP.
 *
 * `xForwardedFor: true` is opt-in in this API for a good reason — it trusts a
 * header any proxy could have set. It is correct here specifically because
 * Vercel's edge overwrites `x-forwarded-for` on every request before the
 * function ever sees it. On a host that passes a client-supplied value through,
 * this is spoofable and the rate limit becomes advisory.
 */
export function clientIp(): string {
  return getRequestIP({ xForwardedFor: true }) ?? "unknown";
}

/**
 * A saltless hash of an IPv4 address is not anonymity — the whole space is about
 * four billion values, which is seconds of work. So when IP_HASH_SALT is unset
 * this returns null and no identifier is stored at all: the rate limiter stops
 * working, and nobody's address is written down in a form that can be reversed.
 * That is the right way round. Privacy fails closed, spam control fails open.
 */
export function hashIp(ip: string): string | null {
  const salt = process.env["IP_HASH_SALT"];
  if (!salt) {
    console.warn(
      "[reviews] IP_HASH_SALT is not set — submissions will not be rate-limited.",
    );
    return null;
  }
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

export function userAgent(): string | null {
  return getRequestHeader("user-agent")?.slice(0, 300) ?? null;
}
