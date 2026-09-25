/**
 * The review form's contract, written once.
 *
 * Both sides run this: the browser so a visitor gets an inline error without a
 * round trip, and the server function so nothing reaches the database on the
 * strength of the browser having been well behaved. A duplicated schema would
 * drift, and the drift would always be in the direction of the server being
 * more permissive than it looked.
 */

import { z } from "zod";

import { HONEYPOT_FIELD } from "./spam";
import { REVIEW_SERVICES } from "./reviews-types";

/**
 * The bounds mirror the CHECK constraints in db/schema.sql. They are
 * duplicated on purpose: this is the check that produces a readable message for
 * the person filling the form, and those are the backstop that holds even
 * against a writer that never goes through this file.
 */
export const reviewInputSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(60, "That name is too long."),

  role: z
    .string()
    .trim()
    .min(2, "Please add your role or company.")
    .max(80, "That is too long."),

  rating: z
    .number({ invalid_type_error: "Please choose a star rating." })
    .int()
    .min(1, "Please choose a star rating.")
    .max(5, "Please choose a star rating."),

  body: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(1200, "Please keep your review under 1200 characters."),

  service: z.enum(REVIEW_SERVICES, {
    errorMap: () => ({ message: "Please choose which service you are reviewing." }),
  }),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200, "That email address is too long."),

  // The honeypot travels with the payload so the server can check it, but it is
  // never validated for content — a filled value is itself the signal, and
  // rejecting it here would hand a bot a field-level error to learn from.
  [HONEYPOT_FIELD]: z.string().max(200).optional(),

  /**
   * Milliseconds between the form rendering and being submitted, measured by
   * the browser. Optional because a script that omits it should fall through to
   * the spam screen rather than trip a validation error that names the field.
   */
  elapsedMs: z.number().optional(),
});

export type ReviewInput = z.infer<typeof reviewInputSchema>;

/**
 * The part of a review a moderator may rewrite on /admin.
 *
 * Derived from the schema above with `.pick` rather than written out a second
 * time, so the length bounds and the service list cannot drift: an edit the
 * public form would have refused must not be savable from the moderation page
 * either, and the CHECK constraints in db/schema.sql are the same bounds again.
 *
 * The two fields left off are the ones that only mean something at submission
 * time — the honeypot and the elapsed-time measurement. `status` is left off as
 * well, but for a different reason: hiding and publishing is its own control on
 * that page, and folding it in here would let an edit silently republish a
 * review that had been hidden on purpose.
 */
export const adminReviewSchema = reviewInputSchema.pick({
  name: true,
  role: true,
  rating: true,
  body: true,
  service: true,
  email: true,
});

export type AdminReviewInput = z.infer<typeof adminReviewSchema>;
