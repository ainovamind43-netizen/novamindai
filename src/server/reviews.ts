/**
 * The server functions behind the review feature.
 *
 * This file is imported by components, so it is part of the client graph — but
 * only as stubs. The TanStack Start compiler lifts each `.handler()` body out
 * into a server-only chunk and leaves a fetch wrapper behind, which is why the
 * imports below can reach `.server.` modules: every use of them is inside a
 * handler, and import protection recognises that boundary. A use of one of them
 * anywhere else in this file would fail the build rather than leak the database
 * password, and the client bundle is checked for DATABASE_URL as part of the
 * release steps.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  clearFailedLogins,
  endSession,
  isAdmin,
  isAdminConfigured,
  isLoginBlocked,
  recordFailedLogin,
  startSession,
  verifyPassword,
} from "../lib/admin-session.server";
import { isMissingTable } from "../lib/db.server";
import { adminReviewSchema, reviewInputSchema } from "../lib/review-schema";
import {
  clientIp,
  createReview,
  deleteReview,
  getPublicReviews,
  hashIp,
  isConfigured,
  listAllReviews,
  recentSubmissionCount,
  setReviewStatus,
  updateReview,
  userAgent,
} from "../lib/reviews.server";
import { HONEYPOT_FIELD, RATE_LIMIT_MAX, screenSubmission } from "../lib/spam";
import type { AdminReview, PublicReview } from "../lib/reviews-types";

/** Shown whenever something failed on our side rather than in the visitor's text. */
const GENERIC_FAILURE =
  "Something went wrong at our end. Please try again in a moment.";

/**
 * Shown when the failure is that this deployment has no database yet, rather
 * than anything to do with what the visitor wrote.
 *
 * This says the truth out loud instead of folding into GENERIC_FAILURE, and the
 * reason is the visitor's words, not the owner's embarrassment: someone who has
 * just typed a paragraph and is told "something went wrong" will assume they
 * caused it and type it again, and the second attempt fails identically. Told
 * plainly that reviews are not being saved, they can use the contact form
 * instead and their words are not lost.
 */
const NOT_CONNECTED =
  "Reviews are not being saved yet — this site's database has not been connected. Please reach us through the contact page instead.";

/* -------------------------------------------------------------------------- */
/* Public                                                                      */
/* -------------------------------------------------------------------------- */

/** GET: no side effects, no session, safe to repeat. */
export const fetchReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicReview[]> => getPublicReviews(),
);

export type SubmitReviewResult = { ok: true } | { ok: false; error: string };

export const submitReview = createServerFn({ method: "POST" })
  .validator(reviewInputSchema)
  .handler(async ({ data }): Promise<SubmitReviewResult> => {
    const ipHash = hashIp(clientIp());

    const verdict = screenSubmission({
      // Every field the visitor can type into, so a link buried in the job title
      // is caught the same as one in the review body.
      fields: [data.name, data.role, data.body].join("\n"),
      honeypot: data[HONEYPOT_FIELD] ?? "",
      elapsedMs: data.elapsedMs ?? Number.NaN,
    });

    if (verdict.spam) {
      console.warn(`[reviews] flagged a submission: ${verdict.reason}`);
    }

    // The elapsed-time check reads the clock from when the form was rendered,
    // so this message is self-correcting: a genuine visitor who somehow got
    // here is past the threshold by the time they press the button again.
    if (verdict.reason === "too-fast") {
      return {
        ok: false,
        error: "That was submitted a moment too quickly. Please try again.",
      };
    }

    if (verdict.reason === "links" || verdict.reason === "banned-term") {
      return { ok: false, error: "This review could not be accepted as written." };
    }

    /*
     * A honeypot hit is stored, not discarded — hidden, and answered exactly as
     * a success is: same shape, same status, nothing to learn from.
     *
     * Storing it is the part that matters. The check can be wrong — a browser
     * extension or password manager filling a field it was not meant to — and a
     * discarded submission would be gone, with the visitor thanked for writing
     * it. Hidden, it appears on /admin and the owner can publish it. The field's
     * name and label are chosen so autofill does not recognise them, which is
     * what keeps that case rare.
     */
    const honeypot = verdict.reason === "honeypot";

    /*
     * Checked before the first query, not inferred from a thrown error.
     *
     * Both paths below reach the database, so without this an unconfigured
     * deployment fails inside recentSubmissionCount with a "DATABASE_URL is not
     * set" that only ever reaches the server log.
     */
    if (!isConfigured()) {
      console.error("[reviews] submission not saved: DATABASE_URL is not set.");
      // Still a success for a honeypot hit: an error here would be the one
      // response that tells a bot its submissions are being counted.
      if (honeypot) return { ok: true };
      return { ok: false, error: NOT_CONNECTED };
    }

    try {
      if (ipHash) {
        const recent = await recentSubmissionCount(ipHash);
        if (recent >= RATE_LIMIT_MAX) {
          // Silently dropped for a honeypot hit: an error here would be the one
          // response that tells a bot its submissions are being counted.
          if (honeypot) return { ok: true };

          return {
            ok: false,
            error:
              "You have posted several reviews already. Please try again in an hour.",
          };
        }
      }

      await createReview(
        {
          name: data.name,
          role: data.role,
          rating: data.rating,
          body: data.body,
          service: data.service,
          email: data.email,
        },
        { ipHash, userAgent: userAgent(), status: honeypot ? "hidden" : "approved" },
      );
    } catch (error) {
      // Same reasoning: a storage failure must not become a signal either.
      if (honeypot) return { ok: true };

      if (isMissingTable(error)) {
        // A setup step the owner can finish, so the log names it rather than
        // leaving them to read a Postgres error with no context.
        console.error("[reviews] the reviews table does not exist — run db/schema.sql");
        return { ok: false, error: NOT_CONNECTED };
      }

      console.error("[reviews] could not save a submission:", error);
      return { ok: false, error: GENERIC_FAILURE };
    }

    return { ok: true };
  });

/* -------------------------------------------------------------------------- */
/* Admin                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * One call, three outcomes, so the page renders correctly on first paint
 * instead of flashing a login form at someone who is already signed in.
 *
 * POST rather than GET for everything under here: an authenticated response is
 * not something to hand to a CDN to cache.
 */
export type AdminState =
  | { configured: false }
  | { configured: true; authenticated: false }
  | {
      configured: true;
      authenticated: true;
      reviews: AdminReview[];
      /**
       * The list could not be read, so `reviews` being empty means "we could not
       * ask", not "there are none". The page says so rather than rendering the
       * same "No reviews yet" it shows for a genuinely empty table — the owner
       * looking for a review they just got should not be told it does not exist.
       */
      databaseError?: true;
    };

export const adminState = createServerFn({ method: "POST" }).handler(
  async (): Promise<AdminState> => {
    if (!isAdminConfigured()) return { configured: false };
    if (!isAdmin()) return { configured: true, authenticated: false };

    try {
      return { configured: true, authenticated: true, reviews: await listAllReviews() };
    } catch (error) {
      console.error("[reviews] could not load the admin list:", error);
      return { configured: true, authenticated: true, reviews: [], databaseError: true };
    }
  },
);

export type AdminActionResult = { ok: true } | { ok: false; error: string };

const SIGNED_OUT = "Your session has ended. Please sign in again.";

export const adminLogin = createServerFn({ method: "POST" })
  .validator(z.object({ password: z.string().min(1).max(200) }))
  .handler(async ({ data }): Promise<AdminActionResult> => {
    if (!isAdminConfigured()) {
      return {
        ok: false,
        error:
          "Admin access is not configured on this deployment. Set ADMIN_PASSWORD and SESSION_SECRET.",
      };
    }

    if (isLoginBlocked()) {
      return { ok: false, error: "Too many attempts. Please wait 15 minutes." };
    }

    if (!verifyPassword(data.password)) {
      recordFailedLogin();
      return { ok: false, error: "Incorrect password." };
    }

    clearFailedLogins();
    startSession();
    return { ok: true };
  });

export const adminLogout = createServerFn({ method: "POST" }).handler(
  async (): Promise<AdminActionResult> => {
    endSession();
    return { ok: true };
  },
);

export const adminSetReviewStatus = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid(), status: z.enum(["approved", "hidden"]) }))
  .handler(async ({ data }): Promise<AdminActionResult> => {
    if (!isAdmin()) return { ok: false, error: SIGNED_OUT };

    try {
      await setReviewStatus(data.id, data.status);
      return { ok: true };
    } catch (error) {
      console.error("[reviews] could not change a review's status:", error);
      return { ok: false, error: GENERIC_FAILURE };
    }
  });

export const adminDeleteReview = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data }): Promise<AdminActionResult> => {
    if (!isAdmin()) return { ok: false, error: SIGNED_OUT };

    try {
      await deleteReview(data.id);
      return { ok: true };
    } catch (error) {
      console.error("[reviews] could not delete a review:", error);
      return { ok: false, error: GENERIC_FAILURE };
    }
  });

/**
 * The validator is the admin schema extended with the row's id, so an edit is
 * held to exactly the bounds the public form is — the same schema, compiled from
 * one source. `status` is absent from it on purpose: publishing is a separate
 * control, and an edit that could change it would be a way to republish a hidden
 * review by accident.
 */
export const adminUpdateReview = createServerFn({ method: "POST" })
  .validator(adminReviewSchema.extend({ id: z.string().uuid() }))
  .handler(async ({ data }): Promise<AdminActionResult> => {
    if (!isAdmin()) return { ok: false, error: SIGNED_OUT };

    try {
      await updateReview(data.id, {
        name: data.name,
        role: data.role,
        rating: data.rating,
        body: data.body,
        service: data.service,
        email: data.email,
      });
      return { ok: true };
    } catch (error) {
      console.error("[reviews] could not update a review:", error);
      return { ok: false, error: GENERIC_FAILURE };
    }
  });
