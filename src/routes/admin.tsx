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
import { blogInputSchema } from "@/lib/blog-schema";
import type { BlogInput } from "@/lib/blog-schema";
import type { AdminBlog } from "@/lib/blogs-types";
import {
  createNewBlog,
  updateExistingBlog,
  changeBlogStatus,
  removeBlog,
} from "@/server/blogs";

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return `${date.toISOString().slice(0, 16).replace("T", " ")} UTC`;
}

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

interface ReviewDraft {
  name: string;
  role: string;
  rating: number;
  body: string;
  service: string;
  email: string;
}

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

    const parsed = adminReviewSchema.safeParse(draft);
    if (!parsed.success) {
      setProblem(parsed.error.issues[0]?.message ?? "Please check the fields below.");
      return;
    }

    setProblem(null);
    onSave(parsed.data);
  }

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

function BlogEditor({
  blog,
  busy,
  onCancel,
  onSave,
}: {
  blog: AdminBlog;
  busy: boolean;
  onCancel: () => void;
  onSave: (values: BlogInput) => void;
}) {
  const [draft, setDraft] = useState<BlogInput>({
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    body: blog.body,
    category: blog.category,
    readTime: blog.readTime,
  });
  const [problem, setProblem] = useState<string | null>(null);

  function set<K extends keyof BlogInput>(key: K, value: BlogInput[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const parsed = blogInputSchema.safeParse(draft);
    if (!parsed.success) {
      setProblem(parsed.error.issues[0]?.message ?? "Please check the fields below.");
      return;
    }

    setProblem(null);
    onSave(parsed.data);
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <p className="text-xs text-muted-foreground">Editing blog post: {blog.title}</p>

      <div>
        <label className="text-xs text-muted-foreground">Title</label>
        <input
          className={`${field} mt-1.5`}
          value={draft.title}
          onChange={(e) => set("title", e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-xs text-muted-foreground">Slug</label>
          <input
            className={`${field} mt-1.5`}
            value={draft.slug}
            onChange={(e) => set("slug", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Category</label>
          <input
            className={`${field} mt-1.5`}
            value={draft.category}
            onChange={(e) => set("category", e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs text-muted-foreground">Read Time</label>
          <input
            className={`${field} mt-1.5`}
            value={draft.readTime}
            onChange={(e) => set("readTime", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-muted-foreground">Excerpt</label>
        <textarea
          rows={2}
          className={`${field} mt-1.5`}
          value={draft.excerpt}
          onChange={(e) => set("excerpt", e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs text-muted-foreground">Body / Content</label>
        <textarea
          rows={6}
          className={`${field} mt-1.5`}
          value={draft.body}
          onChange={(e) => set("body", e.target.value)}
        />
      </div>

      <p aria-live="polite" className="text-xs text-destructive">
        {problem}
      </p>

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save blog"}
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
      { title: "Admin Dashboard | NovaMind AI" },
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
      <main className="mx-auto max-w-5xl px-5 py-20">
        {!state.configured ? (
          <NotConfigured />
        ) : state.authenticated ? (
          <Dashboard
            reviews={state.reviews}
            blogs={state.blogs}
            databaseError={state.databaseError ?? false}
          />
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
        <code className="text-primary">SESSION_SECRET</code> set.
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
      await router.invalidate();
    } catch (caught) {
      console.error("[admin] login failed:", caught);
      setError("That did not work. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="panel mx-auto max-w-md space-y-4 p-8" onSubmit={handleSubmit}>
      <div>
        <h1 className="font-display text-2xl font-bold">Admin Sign In</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage reviews and blog posts.
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
          className={`${field} mt-1.5`}
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

function Dashboard({
  reviews,
  blogs,
  databaseError,
}: {
  reviews: AdminReview[];
  blogs: AdminBlog[];
  databaseError: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"reviews" | "blogs">("blogs");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [showNewBlogForm, setShowNewBlogForm] = useState(false);

  const [newBlogDraft, setNewBlogDraft] = useState<BlogInput>({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "AI Automation",
    readTime: "5 min read",
  });
  const [newBlogError, setNewBlogError] = useState<string | null>(null);

  const hiddenReviews = reviews.filter((r) => r.status === "hidden").length;
  const publishedBlogs = blogs.filter((b) => b.status === "published").length;

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
      console.error("[admin] action failed:", caught);
      setError("That did not work. Please try again.");
      return false;
    } finally {
      setBusyId(null);
    }
  }

  async function saveReviewEdit(id: string, values: AdminReviewInput) {
    const saved = await act(id, () => adminUpdateReview({ data: { id, ...values } }));
    if (saved) setEditingId(null);
  }

  async function saveBlogEdit(id: string, values: BlogInput) {
    const saved = await act(id, () => updateExistingBlog({ data: { id, data: values } }));
    if (saved) setEditingBlogId(null);
  }

  async function handleCreateBlog(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busyId) return;

    const parsed = blogInputSchema.safeParse(newBlogDraft);
    if (!parsed.success) {
      setNewBlogError(parsed.error.issues[0]?.message ?? "Please check the fields.");
      return;
    }

    setNewBlogError(null);
    setBusyId("create-blog");
    try {
      const res = await createNewBlog({ data: parsed.data });
      if (!res.ok) {
        setNewBlogError(res.error);
        return;
      }
      setNewBlogDraft({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        category: "AI Automation",
        readTime: "5 min read",
      });
      setShowNewBlogForm(false);
      await router.invalidate();
    } catch (caught) {
      console.error("[admin] create blog failed:", caught);
      setNewBlogError("Failed to create blog post.");
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
          <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage reviews and publish/edit/delete blog posts directly.
          </p>
        </div>
        <button type="button" className="btn-ghost" onClick={signOut} disabled={busyId !== null}>
          Sign out
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border gap-6">
        <button
          type="button"
          onClick={() => setTab("blogs")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            tab === "blogs"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Blog Management ({blogs.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("reviews")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            tab === "reviews"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Review Moderation ({reviews.length})
        </button>
      </div>

      <p aria-live="polite" className="text-sm text-destructive">
        {error}
      </p>

      {databaseError && (
        <div className="panel border-destructive/40 p-6">
          <h2 className="font-semibold text-destructive">Database could not be reached.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Check that <code className="text-primary">DATABASE_URL</code> is set and{" "}
            <code className="text-primary">db/schema.sql</code> has been executed.
          </p>
        </div>
      )}

      {/* BLOGS TAB */}
      {tab === "blogs" && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Blog Posts</h2>
              <p className="text-xs text-muted-foreground">
                {publishedBlogs} published · {blogs.length - publishedBlogs} drafts/hidden
              </p>
            </div>
            <button
              type="button"
              className="btn-primary text-sm"
              onClick={() => setShowNewBlogForm(!showNewBlogForm)}
            >
              {showNewBlogForm ? "Cancel" : "+ Add New Blog Post"}
            </button>
          </div>

          {showNewBlogForm && (
            <form className="panel space-y-4 p-6" onSubmit={handleCreateBlog} noValidate>
              <h3 className="font-bold text-lg">Create New Blog Post</h3>

              <div>
                <label className="text-xs text-muted-foreground">Title</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="e.g. The Future of AI Agents in Enterprise"
                  value={newBlogDraft.title}
                  onChange={(e) =>
                    setNewBlogDraft({ ...newBlogDraft, title: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="text-xs text-muted-foreground">Slug (URL-friendly)</label>
                  <input
                    className={`${field} mt-1.5`}
                    placeholder="future-of-ai-agents"
                    value={newBlogDraft.slug}
                    onChange={(e) =>
                      setNewBlogDraft({ ...newBlogDraft, slug: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Category</label>
                  <input
                    className={`${field} mt-1.5`}
                    placeholder="AI Automation"
                    value={newBlogDraft.category}
                    onChange={(e) =>
                      setNewBlogDraft({ ...newBlogDraft, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Read Time</label>
                  <input
                    className={`${field} mt-1.5`}
                    placeholder="5 min read"
                    value={newBlogDraft.readTime}
                    onChange={(e) =>
                      setNewBlogDraft({ ...newBlogDraft, readTime: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  className={`${field} mt-1.5`}
                  placeholder="Short description for cards..."
                  value={newBlogDraft.excerpt}
                  onChange={(e) =>
                    setNewBlogDraft({ ...newBlogDraft, excerpt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-xs text-muted-foreground">Body Content</label>
                <textarea
                  rows={6}
                  className={`${field} mt-1.5`}
                  placeholder="Full article content..."
                  value={newBlogDraft.body}
                  onChange={(e) =>
                    setNewBlogDraft({ ...newBlogDraft, body: e.target.value })
                  }
                />
              </div>

              {newBlogError && <p className="text-xs text-destructive">{newBlogError}</p>}

              <button type="submit" className="btn-primary" disabled={busyId !== null}>
                {busyId === "create-blog" ? "Publishing…" : "Publish Blog Post"}
              </button>
            </form>
          )}

          {blogs.length === 0 && !databaseError && (
            <div className="panel p-8">
              <p className="text-sm text-muted-foreground">
                No blog posts in the database yet. Click "+ Add New Blog Post" above to write one.
              </p>
            </div>
          )}

          {blogs.length > 0 && (
            <ul className="space-y-4">
              {blogs.map((blog) => (
                <li
                  key={blog.id}
                  className={`panel space-y-4 p-6 ${
                    blog.status !== "published" && editingBlogId !== blog.id ? "opacity-60" : ""
                  }`}
                >
                  {editingBlogId === blog.id ? (
                    <BlogEditor
                      blog={blog}
                      busy={busyId !== null}
                      onCancel={() => setEditingBlogId(null)}
                      onSave={(values) => void saveBlogEdit(blog.id, values)}
                    />
                  ) : (
                    <>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {blog.category}
                          </span>
                          <h3 className="mt-2 text-lg font-bold">{blog.title}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Slug: /{blog.slug} · {blog.readTime} ·{" "}
                            <time dateTime={blog.createdAt}>{formatTimestamp(blog.createdAt)}</time>
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] ${
                            blog.status === "published"
                              ? "border-primary/40 text-primary"
                              : "border-destructive/50 text-destructive"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground">{blog.excerpt}</p>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                        <button
                          type="button"
                          className="btn-ghost"
                          disabled={busyId !== null}
                          onClick={() => setEditingBlogId(blog.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn-ghost"
                          disabled={busyId !== null}
                          onClick={() =>
                            act(blog.id, () =>
                              changeBlogStatus({
                                data: {
                                  id: blog.id,
                                  status: blog.status === "published" ? "hidden" : "published",
                                },
                              }),
                            )
                          }
                        >
                          {blog.status === "published" ? "Hide" : "Publish"}
                        </button>
                        <button
                          type="button"
                          className="btn-ghost text-destructive"
                          disabled={busyId !== null}
                          onClick={() => {
                            const sure = window.confirm(
                              `Delete blog post "${blog.title}"? This cannot be undone.`,
                            );
                            if (!sure) return;
                            void act(blog.id, () => removeBlog({ data: { id: blog.id } }));
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* REVIEWS TAB */}
      {tab === "reviews" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold">Client Reviews</h2>
            <p className="text-xs text-muted-foreground">
              {reviews.length} total · {reviews.length - hiddenReviews} live · {hiddenReviews} hidden
            </p>
          </div>

          {reviews.length === 0 && !databaseError && (
            <div className="panel p-8">
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            </div>
          )}

          {reviews.length > 0 && (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li
                  key={review.id}
                  className={`panel space-y-4 p-6 ${
                    review.status === "hidden" && editingId !== review.id ? "opacity-60" : ""
                  }`}
                >
                  {editingId === review.id ? (
                    <ReviewEditor
                      review={review}
                      busy={busyId !== null}
                      onCancel={() => setEditingId(null)}
                      onSave={(values) => void saveReviewEdit(review.id, values)}
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
                            <a href={`mailto:${review.email}`} className="hover:text-primary">
                              {review.email}
                            </a>
                          </div>
                        </div>
                        <div className="text-right text-xs text-muted-foreground">
                          <div aria-hidden="true" className="text-base text-primary">
                            {"★".repeat(Math.max(0, Math.min(5, review.rating)))}
                          </div>
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
                              const sure = window.confirm(
                                `Delete review from ${review.name}? This cannot be undone.`,
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
      )}
    </div>
  );
}
