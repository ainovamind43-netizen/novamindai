/**
 * Types and pure helpers shared by the review form (client) and the review
 * queries (server).
 *
 * This file must stay free of secrets and of Node built-ins, because both
 * bundles import it. Anything that touches the database lives in
 * `reviews.server.ts`, which TanStack Start's import protection refuses to load
 * on the client — the build fails rather than shipping it.
 */

/**
 * The services a review can be about. The form renders this list and the server
 * validates against it, so the two cannot drift apart.
 */
export const REVIEW_SERVICES = [
  "Web Design & Development",
  "AI Automation",
  "SEO",
  "Google & Meta Ads",
  "ERP Software",
  "POS Software",
  "Custom Software",
  "Mobile App Development",
] as const;

export type ReviewService = (typeof REVIEW_SERVICES)[number];

/**
 * A review as it appears on a public page.
 *
 * Note what is missing: `email`. It is collected and stored, but it is not part
 * of this type, so a public component cannot render it even by accident — the
 * only way to reach an address is through the admin fetch, which is a deliberate
 * act. A published email address is a scraper magnet, and the owner needs it for
 * their own records rather than for the page.
 */
export interface PublicReview {
  id: string;
  name: string;
  role: string;
  /** Whole stars, 1-5. */
  rating: number;
  body: string;
  service: string;
  /** ISO 8601, straight from the database's timestamptz. */
  createdAt: string;
}

/**
 * A review as the moderation page sees it.
 *
 * This lives here rather than beside the queries so that components can name the
 * type without importing a `.server.` module — a type is erased at compile time
 * and carries no secret, but keeping the import graph clean is cheaper than
 * reasoning about which imports the bundler erases and which it does not.
 */
export interface AdminReview extends PublicReview {
  email: string;
  status: "approved" | "hidden";
}

/**
 * The headline figure, derived from the list actually rendered beneath it.
 *
 * `average` is null when there is nothing to average, and callers must handle
 * that rather than render a zero — "0 / 5" reads as a terrible score, where the
 * truth is that there is no score yet.
 */
export function summarise(reviews: readonly PublicReview[]) {
  return {
    count: reviews.length,
    average: reviews.length
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : null,
  };
}
