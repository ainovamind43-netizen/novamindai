import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import type { AdminReview } from "@/lib/reviews-types";
import {
  adminDeleteReview,
  adminLogin,
  adminLogout,
  adminSetReviewStatus,
  adminState,
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
          Sign in to hide or delete reviews.
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

  const hidden = reviews.filter((review) => review.status === "hidden").length;

  async function act(id: string, action: () => Promise<ActionResult>) {
    if (busyId) return;

    setBusyId(id);
    setError(null);

    try {
      const result = await action();

      if (!result.ok) {
        setError(result.error);
        return;
      }

      await router.invalidate();
    } catch (caught) {
      console.error("[reviews] moderation action failed:", caught);
      setError("That did not work. Please try again.");
    } finally {
      setBusyId(null);
    }
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
              className={`panel space-y-4 p-6 ${review.status === "hidden" ? "opacity-60" : ""}`}
            >
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

                <div className="ml-auto flex gap-2">
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
                      void act(review.id, () => adminDeleteReview({ data: { id: review.id } }));
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
