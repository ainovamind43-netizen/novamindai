import type { PublicReview } from "@/lib/reviews-types";

/**
 * Whole stars only. Ratings are whole numbers in the database — the column is a
 * smallint with a CHECK between 1 and 5 — so painting a half-star would imply a
 * precision the reviews do not have.
 *
 * The glyphs are hidden from assistive tech and the rating is announced in
 * words beside them: a screen reader walking through "black star black star
 * black star" is noise, where "4 out of 5 stars" is the actual fact.
 */
function Stars({ rating }: { rating: number }) {
  // Clamped because the database only guarantees the range and a component
  // should not be the thing that finds out otherwise: a 6 would make the
  // unfilled repeat() a negative count and throw a RangeError, taking the whole
  // page down with it. The announced number below stays the real rating, so an
  // out-of-range value is still visible rather than quietly corrected.
  const filled = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <>
      <span aria-hidden="true" className="text-primary">
        {"★".repeat(filled)}
        <span className="text-muted-foreground/40">{"★".repeat(5 - filled)}</span>
      </span>
      <span className="sr-only">{rating} out of 5 stars</span>
    </>
  );
}

/**
 * Formatting is pinned to UTC deliberately.
 *
 * A review's timestamp is stored as an instant, so rendering it in the viewer's
 * local zone would show one date on the server (UTC) and another in a browser
 * east or west of it — a hydration mismatch that React reports as an error, and
 * a date that changes depending on where the page is read. The stored instant is
 * the truth; UTC is how it is displayed to everyone.
 */
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string) {
  const date = new Date(iso);
  // An unparseable timestamp should cost the date, not the page.
  if (Number.isNaN(date.getTime())) return null;
  return dateFormatter.format(date);
}

export function ReviewCard({ review }: { review: PublicReview }) {
  const posted = formatDate(review.createdAt);

  return (
    <figure className="panel card-beam flex h-full flex-col p-7">
      <Stars rating={review.rating} />
      <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{review.body}&rdquo;
      </blockquote>
      <figcaption className="mt-5">
        <div className="font-semibold">{review.name}</div>
        <div className="text-xs text-muted-foreground">{review.role}</div>
      </figcaption>
      {/* mt-auto pins the provenance row to the bottom, so a row of cards with
          different quote lengths still lines up. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-5 text-[11px] text-muted-foreground">
        <span className="chip-hover rounded-full border border-border px-2.5 py-1">
          {review.service}
        </span>
        {posted && <time dateTime={review.createdAt}>{posted}</time>}
      </div>
    </figure>
  );
}

/**
 * The headline figure — average and count, both computed from the list actually
 * rendered beneath it. `average` is null when there is nothing to average, and
 * this returns null rather than rendering a zero, since "0 / 5" reads as a
 * terrible score instead of as no score at all.
 */
export function ReviewSummary({ count, average }: { count: number; average: number | null }) {
  if (average === null) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <Stars rating={Math.round(average)} />
      <span className="font-semibold text-primary">{average.toFixed(1)} / 5</span>
      <span>
        from {count} client {count === 1 ? "review" : "reviews"}
      </span>
    </div>
  );
}
