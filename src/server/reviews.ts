/**
 * The server actions behind the review feature.
 */
'use server';

import { z } from "zod";
import { revalidatePath } from "next/cache";

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
import { listAllBlogs } from "../lib/blogs.server";
import { HONEYPOT_FIELD, RATE_LIMIT_MAX, screenSubmission } from "../lib/spam";
import type { AdminReview, PublicReview } from "../lib/reviews-types";
import type { AdminBlog } from "../lib/blogs-types";

/** Shown whenever something failed on our side rather than in the visitor's text. */
const GENERIC_FAILURE =
  "Something went wrong at our end. Please try again in a moment.";

/**
 * Shown when the failure is that this deployment has no database yet, rather
 * than anything to do with what the visitor wrote.
 */
const NOT_CONNECTED =
  "Reviews are not being saved yet — this site's database has not been connected. Please reach us through the contact page instead.";

/* -------------------------------------------------------------------------- */
/* Public                                                                      */
/* -------------------------------------------------------------------------- */

/** GET: no side effects, no session, safe to repeat. */
export async function fetchReviews(): Promise<PublicReview[]> {
  return getPublicReviews();
}

export type SubmitReviewResult = { ok: true } | { ok: false; error: string };

export async function submitReview(data: z.infer<typeof reviewInputSchema>): Promise<SubmitReviewResult> {
  // Validation
  const validated = reviewInputSchema.safeParse(data);
  if (!validated.success) {
    return { ok: false, error: "Invalid input." };
  }
  
  const ipHash = hashIp(await clientIp());

  const verdict = screenSubmission({
    fields: [data.name, data.role, data.body].join("\n"),
    honeypot: data[HONEYPOT_FIELD] ?? "",
    elapsedMs: data.elapsedMs ?? Number.NaN,
  });

  if (verdict.spam) {
    console.warn(`[reviews] flagged a submission: ${verdict.reason}`);
  }

  if (verdict.reason === "too-fast") {
    return {
      ok: false,
      error: "That was submitted a moment too quickly. Please try again.",
    };
  }

  if (verdict.spam) {
    return {
      ok: false,
      error: "Our spam filter flagged this message. Please try again.",
    };
  }

  if ((await recentSubmissionCount(ipHash)) >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      error: "You have submitted too many reviews today. Please try again tomorrow.",
    };
  }

  try {
    await createReview({ ...data, ipHash });
    revalidatePath("/");
    revalidatePath("/reviews");
    return { ok: true };
  } catch (e) {
    console.error(`[reviews] creation failed:`, e);
    return {
      ok: false,
      error: isMissingTable(e) ? NOT_CONNECTED : GENERIC_FAILURE,
    };
  }
}

/* -------------------------------------------------------------------------- */
/* Admin                                                                      */
/* -------------------------------------------------------------------------- */

export async function login(password: string): Promise<{ ok: true } | { ok: false; error: string }> {
  if (isLoginBlocked()) {
    return {
      ok: false,
      error: "Too many failed login attempts. Please try again in 15 minutes.",
    };
  }

  if (!(await verifyPassword(password))) {
    recordFailedLogin();
    return { ok: false, error: "Incorrect password." };
  }

  clearFailedLogins();
  await startSession();
  return { ok: true };
}

export async function logout() {
  await endSession();
}

export async function fetchAdminData(): Promise<{
  reviews: AdminReview[];
  blogs: AdminBlog[];
  isConfigured: boolean;
  isAdminConfigured: boolean;
}> {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }

  const [reviews, blogs, configured, adminSet] = await Promise.all([
    listAllReviews(),
    listAllBlogs(),
    isConfigured(),
    isAdminConfigured(),
  ]);

  return {
    reviews,
    blogs,
    isConfigured: configured,
    isAdminConfigured: adminSet,
  };
}

export async function adminState() {
  const configured = isAdminConfigured();
  if (!configured) {
    return { configured: false, authenticated: false, reviews: [], blogs: [] };
  }
  const authenticated = await isAdmin();
  if (!authenticated) {
    return { configured: true, authenticated: false, reviews: [], blogs: [] };
  }

  try {
    const data = await fetchAdminData();
    return {
      configured: true,
      authenticated: true,
      reviews: data.reviews,
      blogs: data.blogs,
      databaseError: false,
    };
  } catch (e) {
    console.error("[adminState] failed:", e);
    return {
      configured: true,
      authenticated: true,
      reviews: [],
      blogs: [],
      databaseError: true,
    };
  }
}

export async function updateReviewStatus(id: number, status: "approved" | "rejected" | "pending") {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await setReviewStatus(id, status);
  revalidatePath("/");
  revalidatePath("/reviews");
}

export async function editReview(id: number, data: z.infer<typeof adminReviewSchema>) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const validated = adminReviewSchema.safeParse(data);
  if (!validated.success) throw new Error("Invalid input");
  
  await updateReview(id, data);
  revalidatePath("/");
  revalidatePath("/reviews");
}

export async function removeReview(id: number) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  await deleteReview(id);
  revalidatePath("/");
  revalidatePath("/reviews");
}
