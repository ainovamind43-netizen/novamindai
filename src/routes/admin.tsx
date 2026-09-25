import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { adminReviewSchema } from "@/lib/review-schema";
import type { AdminReviewInput } from "@/lib/review-schema";
import { REVIEW_SERVICES } from "@/lib/reviews-types";
import type { AdminReview } from "@/lib/reviews-types";
import {
  adminDeleteReview,
  adminLogin,
  adminLogout,
  adminSetReviewStatus,
  adminState,
  adminUpdateReview,
} from "@/server/reviews";

/**
 * Timestamps are shown in UTC, and labelled as such.
 *
 * Locale formatting would be friendlier, but this page is server-rendered and
 * then hydrated in the browser: the server's locale and the visitor's are not
 * the same thing, and a date formatted differently on each side is a hydration
 * mismatch React reports as an error. UTC is one answer everywhere, and saying
 * so removes the guesswork.
 */
function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

/** Matches the public form's inputs, so the two pages look like one site. */
const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

/**
 * What the edit form holds while it is being filled in.
 *
 * Written out with `service` and `rating` as the loose types the inputs actually
 * produce — a select gives back a string, and `AdminReview.service` is a string
 * too — and `.safeParse`d against `adminReviewSchema` on submit. Typing this as
 * the schema's output instead would mean casting at every `onChange` to satisfy
 * a narrowing that has not happened yet.
 */
interface ReviewDraft {
  name: string;
  role: string;
  rating: number;
  body: string;
  service: string;
  email: string;
}

/**
 * The inline edit form for one review.
 *
 * Replaces the row's display rather than sitting beside it, which keeps the page
 * a list of reviews instead of a list of reviews with a form wedged into each
 * one. It owns the draft and validates it; the save itself goes back up to
 * `Moderation`, so `busyId` and the error line stay in one place and a second
 * row cannot be edited while a save is in flight.
 */
function ReviewEditor({
  review,
  busy,
  onCancel,
  onSave,
}: {
  review: AdminReview;
  busy: boolean;
  onCancel: () => void;
  onSave: (values: AdminReviewInput) => void;
}) {
  const [draft, setDraft] = useState<ReviewDraft>({
    name: review.name,
    role: review.role,
    rating: review.rating,
    body: review.body,
    service: review.service,
    email: review.email,
  });
  const [problem, setProblem] = useState<string | null>(null);

  function set<K extends keyof ReviewDraft>(key: K, value: ReviewDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    // The same schema the server function validates with, so a bound that would
    // be refused on save is answered here instead, next to the field.
    const parsed = adminReviewSchema.safeParse(draft);
    if (!parsed.success) {
      setProblem(parsed.error.issues[0]?.message ?? "Please check the fields below.");
      return;
    }

    setProblem(null);
    // The parsed value, not the draft: `service` comes back narrowed to the
    // reviewed services, which is what the server function's validator expects.
    onSave(parsed.data);
  }

  // A service that is no longer in REVIEW_SERVICES would otherwise be shown as
  // the select's first option and then saved as that, quietly rewriting the row
  // on an edit the owner made to something else entirely.
  const serviceIsKnown = REVIEW_SERVICES.some((service) => service === draft.service);

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <p className="text-xs text-muted-foreground">
        Editing {review.name}&rsquo;s review. Changes are live as soon as you save.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor={`edit-name-${review.id}`}>
            Name
          </label>
          <input
            id={`edit-name-${review.id}`}
            className={`${field} mt-1.5`}
            value={draft.name}
            onChange={(event) => set("name", event.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor={`edit-role-${review.id}`}>
            Role and company
          </label>
          <input
            id={`edit-role-${review.id}`}
            className={`${field} mt-1.5`}
            value={draft.role}
            onChange={(event) => set("role", event.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs text-muted-foreground" htmlFor={`edit-service-${review.id}`}>
            Service
          </label>
          <select
            id={`edit-service-${review.id}`}
            className={`${field} mt-1.5`}
            value={draft.service}
            onChange={(event) => set("service", event.target.value)}
          >
            {!serviceIsKnown && <option value={draft.service}>{draft.service}</option>}
            {REVIEW_SERVICES.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-muted-foreground" htmlFor={`edit-rating-${review.id}`}>
            Rating
          </label>
          <select
            id={`edit-rating-${review.id}`}
            className={`${field} mt-1.5`}
            value={draft.rating}
            onChange={(event) => set("rating", Number(event.target.value))}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value} star{value === 1 ? "" : "s"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor={`edit-email-${review.id}`}>
          Email
        </label>
        <input
          id={`edit-email-${review.id}`}
          type="email"
          className={`${field} mt-1.5`}
          value={draft.email}
          onChange={(event) => set("email", event.target.value)}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          For your records only — never shown on the site.
        </p>
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor={`edit-body-${review.id}`}>
          Review
        </label>
        <textarea
          id={`edit-body-${review.id}`}
          rows={5}
          className={`${field} mt-1.5`}
          value={draft.body}
          onChange={(event) => set("body", event.target.value)}
        />
      </div>

      <p aria-live="polite" className="text-xs text-destructive">
        {problem}
      </p>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save changes"}
        </button>
        <button type="button" className="btn-ghost" disabled={busy} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export const Route = createFileRoute("/admin")({
  loader: async () => ({ state: await adminState() }),
  head: () => ({
    meta: [
      { title: "Review moderation | NovaMind AI" },
      // Belt and braces alongside the robots.txt rule: this page is linked from
      // nowhere, so a crawler should only ever reach it by guessing the path.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Admin,
});

function Admin() {
  const { state } = Route.useLoaderData();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-4xl px-5 py-20">
        {!state.configured ? (
          <NotConfigured />
        ) : state.authenticated ? (
          <Moderation reviews={state.reviews} databaseError={state.databaseError ?? false} />
        ) : (
          <Login />
        )}
      </main>
      <Footer />
    </div>
  );
}

function NotConfigured() {
  return (
    <div className="panel p-8">
      <h1 className="font-display text-2xl font-bold">Admin access is not configured.</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        This deployment has no <code className="text-primary">ADMIN_PASSWORD</code> or{" "}
        <code className="text-primary">SESSION_SECRET</code> set, so no password can be accepted.
        Add both under Project &rarr; Settings &rarr; Environment Variables in Vercel and redeploy,
        or to <code className="text-primary">.env</code> locally. See{" "}
        <code className="text-primary">.env.example</code>.
      </p>
    </div>
  );
}

function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      const result = await adminLogin({ data: { password } });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setPassword("");
      // Re-runs the loader, which now finds a valid session and returns the list.
      await router.invalidate();
    } catch (caught) {
      console.error("[reviews] login failed:", caught);
      setError("That did not work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="panel mx-auto max-w-md space-y-4 p-8" onSubmit={handleSubmit}>
      <div>
        <h1 className="font-display text-2xl font-bold">Review moderation</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to edit, hide or delete reviews.
        </p>
      </div>

      <div>
        <label className="text-xs text-muted-foreground" htmlFor="admin-password">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button type="submit" className="btn-primary w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>

      <p aria-live="polite" className="text-center text-sm text-destructive">
        {error}
      </p>
    </form>
  );
}

type ActionResult = { ok: true } | { ok: false; error: string };

function Moderation({
  reviews,
  databaseError,
}: {
  reviews: AdminReview[];
  databaseError: boolean;
}) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Which row is open for editing, if any. One at a time: two open editors would
   * make "Save" ambiguous about which row it belongs to, and a `busyId` guard
   * already serialises the actions themselves.
   */
  const [editingId, setEditingId] = useState<string | null>(null);

  const hidden = reviews.filter((review) => review.status === "hidden").length;

  /**
   * Returns whether the action succeeded, so a caller that needs to know — the
   * edit form, which should only close on a save that landed — can ask. The
   * buttons that only report an error ignore the return value.
   */
  async function act(id: string, action: () => Promise<ActionResult>): Promise<boolean> {
    if (busyId) return false;

    setBusyId(id);
    setError(null);

    try {
      const result = await action();

      if (!result.ok) {
        setError(result.error);
        return false;
      }

      await router.invalidate();
      return true;
    } catch (caught) {
      console.error("[reviews] moderation action failed:", caught);
      setError("That did not work. Please try again.");
      return false;
    } finally {
      setBusyId(null);
    }
  }

  /**
   * The editor stays open when the save fails, so the text the owner just typed
   * is still on screen to correct and retry rather than gone with the row.
   */
  async function saveEdit(id: string, values: AdminReviewInput) {
    const saved = await act(id, () => adminUpdateReview({ data: { id, ...values } }));
    if (saved) setEditingId(null);
  }

  async function signOut() {
    setBusyId("signout");
    try {
      await adminLogout({ data: undefined });
      await router.invalidate();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">Review moderation</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {databaseError
              ? "Counts unavailable — see below."
              : `${reviews.length} total · ${reviews.length - hidden} live · ${hidden} hidden`}
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={signOut} disabled={busyId !== null}>
          Sign out
        </button>
      </div>

      <p aria-live="polite" className="text-sm text-destructive">
        {error}
      </p>

      {/* An unreachable database and an empty table both produce an empty list,
          and only one of them means there is nothing to moderate. Saying which
          is the difference between the owner waiting patiently and the owner
          going looking for a bug. */}
      {databaseError && (
        <div className="panel border-destructive/40 p-6">
          <h2 className="font-semibold text-destructive">
            The reviews table could not be read.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The list below is empty because the database did not answer — not because there are
            no reviews. Check that <code className="text-primary">DATABASE_URL</code> is set in
            Vercel, and that <code className="text-primary">db/schema.sql</code> has been run in
            the database's SQL editor. The server log has the underlying error.
          </p>
        </div>
      )}

      {reviews.length === 0 && !databaseError && (
        <div className="panel p-8">
          <p className="text-sm text-muted-foreground">
            No reviews yet. They appear here the moment a visitor posts one.
          </p>
        </div>
      )}

      {reviews.length > 0 && (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className={`panel space-y-4 p-6 ${
                // Dimmed to mark a hidden row — but not while it is being
                // edited, where the same opacity would make the form look
                // disabled when it is not.
                review.status === "hidden" && editingId !== review.id ? "opacity-60" : ""
              }`}
            >
              {editingId === review.id ? (
                <ReviewEditor
                  review={review}
                  busy={busyId !== null}
                  onCancel={() => setEditingId(null)}
                  onSave={(values) => void saveEdit(review.id, values)}
                />
              ) : (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold">
                        {review.name}{" "}
                        <span className="text-xs font-normal text-muted-foreground">
                          {review.role}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {/* The address is here and nowhere else on the site — it is
                            what makes following up with a reviewer possible. */}
                        <a href={`mailto:${review.email}`} className="hover:text-primary">
                          {review.email}
                        </a>
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div aria-hidden="true" className="text-base text-primary">
                        {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                      </div>
                      <div className="sr-only">{review.rating} out of 5 stars</div>
                      {/* dateTime needs a machine-readable value, not the label. */}
                      <time dateTime={review.createdAt}>{formatTimestamp(review.createdAt)}</time>
                    </div>
                  </div>

                  <blockquote className="border-l-2 border-border pl-4 text-sm leading-relaxed text-muted-foreground">
                    {review.body}
                  </blockquote>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground">
                      {review.service}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        review.status === "hidden"
                          ? "border-destructive/50 text-destructive"
                          : "border-primary/40 text-primary"
                      }`}
                    >
                      {review.status === "hidden" ? "Hidden" : "Live"}
                    </span>

                    <div className="ml-auto flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="btn-ghost"
                        disabled={busyId !== null}
                        onClick={() => {
                          setError(null);
                          setEditingId(review.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-ghost"
                        disabled={busyId !== null}
                        onClick={() =>
                          act(review.id, () =>
                            adminSetReviewStatus({
                              data: {
                                id: review.id,
                                status: review.status === "approved" ? "hidden" : "approved",
                              },
                            }),
                          )
                        }
                      >
                        {review.status === "approved" ? "Hide" : "Show"}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost text-destructive"
                        disabled={busyId !== null}
                        onClick={() => {
                          // Deleting a row is the one action here with no undo, so
                          // it asks first. Hiding is reversible and does not.
                          const sure = window.confirm(
                            `Delete the review from ${review.name}? This cannot be undone.`,
                          );
                          if (!sure) return;
                          void act(review.id, () =>
                            adminDeleteReview({ data: { id: review.id } }),
                          );
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
