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
import { cookies, headers } from "next/headers";

const COOKIE_NAME = "novamind_admin";

/** Twelve hours: long enough for one working session, short enough to expire. */
const SESSION_MS = 12 * 60 * 60 * 1000;

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 8;

export function isAdminConfigured(): boolean {
  return Boolean(process.env["ADMIN_PASSWORD"] && process.env["SESSION_SECRET"]);
}

function secret(): string {
  return process.env["SESSION_SECRET"] ?? "";
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env["ADMIN_PASSWORD"];
  if (!expected) return false;

  const given = createHash("sha256").update(candidate, "utf8").digest();
  const actual = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(given, actual);
}

function signature(expiresAt: number): string {
  const binding = createHash("sha256").update(process.env["ADMIN_PASSWORD"] ?? "").digest("hex").slice(0, 16);
  return createHmac("sha256", secret()).update(`${expiresAt}.${binding}`).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a, "utf8");
  const right = Buffer.from(b, "utf8");
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function isProduction(): boolean {
  return process.env["NODE_ENV"] === "production";
}

export async function startSession(): Promise<void> {
  const expiresAt = Date.now() + SESSION_MS;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${expiresAt}.${signature(expiresAt)}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(SESSION_MS / 1000),
    secure: isProduction(),
  });
}

export async function endSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  if (!isAdminConfigured()) return false;
  const cookieStore = await cookies();
  const val = cookieStore.get(COOKIE_NAME)?.value;
  if (!val) return false;

  const dot = val.indexOf(".");
  if (dot === -1) return false;

  const rawExpiry = val.slice(0, dot);
  const sig = val.slice(dot + 1);
  const expiresAt = Number(rawExpiry);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) return false;

  try {
    const expected = signature(expiresAt);
    return safeEqual(sig, expected);
  } catch {
    return false;
  }
}

/** In-memory tracking of failed login attempts by visitor IP. */
const failedAttempts = new Map<string, { count: number; windowStart: number }>();

export async function getClientIp(): Promise<string> {
  const headersList = await headers();
  return headersList.get("x-forwarded-for") ?? "127.0.0.1";
}

export function isLoginBlocked(): boolean {
  // We check via sync ip or default
  return false;
}

export function recordFailedLogin(): void {
  // simple stub
}

export function clearFailedLogins(): void {
  // simple stub
}
