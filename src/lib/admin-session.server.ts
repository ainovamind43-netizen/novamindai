/**
 * Admin authentication for /admin.
 *
 * There is no user table and no auth provider: one password in an environment
 * variable, and a cookie that proves someone typed it. That is proportionate for
 * a moderation page on a brochure site — but only if the cookie is unforgeable
 * and the password is not brute-forceable, which is what the two halves of this
 * file are for.
 */

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import {
  deleteCookie,
  getCookie,
  getRequestIP,
  setCookie,
} from "@tanstack/react-start/server";

const COOKIE_NAME = "novamind_admin";

/** Twelve hours: long enough for one working session, short enough to expire. */
const SESSION_MS = 12 * 60 * 60 * 1000;

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

/**
 * Without both variables the login can never succeed, so the admin page says so
 * outright rather than showing a form that rejects every password with no
 * explanation.
 */
export function isAdminConfigured(): boolean {
  return Boolean(process.env["ADMIN_PASSWORD"] && process.env["SESSION_SECRET"]);
}

function secret(): string {
  return process.env["SESSION_SECRET"] ?? "";
}

/**
 * Compare hashes rather than the strings themselves.
 *
 * Both sides are hashed to 32 bytes first, which does two things `timingSafeEqual`
 * alone would not: the buffers are always equal length (so it cannot throw), and
 * the comparison time no longer reveals the length of the real password.
 */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) return false;

  const given = createHash("sha256").update(candidate, "utf8").digest();
  const actual = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(given, actual);
}

/**
 * The cookie value is `<expiry>.<hmac>` — nothing else. No user id, no role, no
 * "authenticated: true" flag that could be edited to something else: the only
 * way to produce a valid pair is to know SESSION_SECRET.
 *
 * The signature covers a slice of the password's hash as well as the expiry, so
 * changing ADMIN_PASSWORD invalidates every existing session immediately instead
 * of leaving old cookies usable for up to twelve more hours.
 */
function signature(expiresAt: number): string {
  const binding = createHash("sha256").update(process.env["ADMIN_PASSWORD"] ?? "").digest("hex").slice(0, 16);
  return createHmac("sha256", secret()).update(`${expiresAt}.${binding}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  // Length is the one thing this leaks, and it is fixed for a valid signature.
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Vercel sets NODE_ENV=production. Locally it is not, so the cookie is not
 * marked Secure and /admin remains testable over plain http. */
function isProduction(): boolean {
  return process.env["NODE_ENV"] === "production";
}

export function startSession(): void {
  const expiresAt = Date.now() + SESSION_MS;
  setCookie(COOKIE_NAME, `${expiresAt}.${signature(expiresAt)}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MS / 1000),
    secure: isProduction(),
  });
}

export function endSession(): void {
  deleteCookie(COOKIE_NAME, { path: "/" });
}

/**
 * A valid signature *and* an unexpired timestamp, both required. The expiry is
 * inside the signed payload, so it cannot be pushed forward without the secret.
 */
export function isAdmin(): boolean {
  if (!isAdminConfigured()) return false;

  const raw = getCookie(COOKIE_NAME);
  if (!raw) return false;

  const dot = raw.indexOf(".");
  if (dot <= 0) return false;

  const expiresAt = Number(raw.slice(0, dot));
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  return safeEqual(raw.slice(dot + 1), signature(expiresAt));
}

/**
 * Failed-login throttling.
 *
 * Honest about what this is: the map lives in one serverless instance's memory,
 * so on Vercel it slows a patient attacker and does nothing at all against one
 * who spreads attempts across instances. The real defence is a long
 * ADMIN_PASSWORD — a passphrase, not a word. This is a speed bump on top.
 */
const attempts = new Map<string, { count: number; resetAt: number }>();

function pruneAttempts(now: number): void {
  if (attempts.size < 1000) return;
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }
}

function attemptKey(): string {
  return getRequestIP({ xForwardedFor: true }) ?? "unknown";
}

export function isLoginBlocked(): boolean {
  const now = Date.now();
  const entry = attempts.get(attemptKey());
  if (!entry) return false;
  if (entry.resetAt <= now) {
    attempts.delete(attemptKey());
    return false;
  }
  return entry.count >= LOGIN_MAX_ATTEMPTS;
}

export function recordFailedLogin(): void {
  const now = Date.now();
  pruneAttempts(now);

  const key = attemptKey();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearFailedLogins(): void {
  attempts.delete(attemptKey());
}
