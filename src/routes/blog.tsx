import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { BLOG_KEYWORDS, breadcrumbSchema, pageMeta, SITE_URL } from "@/lib/seo";
import { fetchPublicBlogs, checkAdminSession, createNewBlog } from "@/server/blogs";
import { blogInputSchema, type BlogInput } from "@/lib/blog-schema";
import { Calendar, Clock, ArrowRight, Sparkles, Code2, Search, Cpu, PlusCircle } from "lucide-react";

export const Route = createFileRoute("/blog")({
  loader: async () => ({
    blogs: await fetchPublicBlogs(),
    isAdminUser: await checkAdminSession(),
  }),
  head: ({ loaderData }) => {
    const { links, meta: urlMeta } = pageMeta("/blog", BLOG_KEYWORDS);
    const total = loaderData?.blogs.length ?? 0;
    return {
      links,
      meta: [
        ...urlMeta,
        { title: "Blog & Insights: Web Design, AI & SEO | NovaMind AI" },
        {
          name: "description",
          content:
            total > 0
              ? `Read ${total} expert article${total === 1 ? "" : "s"} on web design, AI automation, SEO strategies, ERP/POS systems, and custom software development by NovaMind AI.`
              : "Expert articles, guides, and technical insights on web design, AI automation, SEO strategies, ERP/POS systems, and custom software development by NovaMind AI.",
        },
        { property: "og:title", content: "Blog & Insights — NovaMind AI" },
        {
          property: "og:description",
          content:
            "Practical playbooks for founders and digital leaders scaling websites, AI agents, search visibility, and custom business systems.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([{ name: "Blog", path: "/blog" }]),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "NovaMind AI Blog",
            url: `${SITE_URL}/blog`,
            description:
              "Insights on web design, AI automation, SEO, and custom software engineering.",
            publisher: { "@id": `${SITE_URL}/#organization` },
          }),
        },
      ],
    };
  },
  component: Blog,
});

const fallbackPosts = [
  {
    id: "ai-agents-business-automation-2026",
    title: "How Autonomous AI Agents Are Transforming Business Automation in 2026",
    excerpt:
      "Discover how custom AI agents and intelligent chatbots handle complex multi-step workflows, customer support, and lead qualification 24/7 without human bottlenecks.",
    category: "AI Automation",
    readTime: "6 min read",
    createdAt: "2026-09-24T00:00:00.000Z",
  },
  {
    id: "modern-seo-strategies-that-rank",
    title: "Modern SEO Strategies That Actually Rank in Competitive Global Markets",
    excerpt:
      "A complete guide to technical SEO, entity optimization, structured data, and content authority that drives high-intent organic traffic across US, UK, UAE, and Pakistan markets.",
    category: "SEO & Growth",
    readTime: "8 min read",
    createdAt: "2026-09-18T00:00:00.000Z",
  },
  {
    id: "choosing-custom-erp-vs-off-the-shelf-software",
    title: "Custom ERP vs. Off-the-Shelf Software: When Your Growing Business Needs Custom Engineering",
    excerpt:
      "When SaaS subscriptions and generic ERP platforms start holding your operations back, custom software development unlocks true operational scale and competitive edge.",
    category: "Custom Software",
    readTime: "7 min read",
    createdAt: "2026-09-12T00:00:00.000Z",
  },
  {
    id: "high-converting-web-design-principles",
    title: "High-Converting Web Design: Architectural Principles for SaaS and Agencies",
    excerpt:
      "Why speed, typography, semantic HTML, and frictionless UX design matter more than flashy animations when converting enterprise visitors into qualified pipeline.",
    category: "Web Design",
    readTime: "5 min read",
    createdAt: "2026-09-05T00:00:00.000Z",
  },
];

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

function Blog() {
  const { blogs, isAdminUser } = Route.useLoaderData();
  const router = useRouter();
  const displayPosts = blogs.length > 0 ? blogs : fallbackPosts;

  const [showAddForm, setShowAddForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<BlogInput>({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "AI Automation",
    readTime: "5 min read",
  });

  async function handleAddBlog(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const parsed = blogInputSchema.safeParse(draft);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check the fields.");
      return;
    }

    setError(null);
    setBusy(true);
    try {
      const res = await createNewBlog({ data: parsed.data });
      if (!res.ok) {
        setError(res.error);
        return;
      }
      setDraft({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        category: "AI Automation",
        readTime: "5 min read",
      });
      setShowAddForm(false);
      await router.invalidate();
    } catch (err) {
      console.error("[blog] create failed:", err);
      setError("Failed to create blog post.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">NovaMind AI Journal</span>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
                Insights on web design, AI, <span className="text-shimmer">SEO & custom software.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-muted-foreground">
                Practical playbooks, technical deep-dives, and strategic guides written by our engineers
                and growth strategists for founders and digital leaders worldwide.
              </p>
            </div>

            {isAdminUser && (
              <button
                type="button"
                className="btn-primary inline-flex items-center gap-2"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <PlusCircle className="h-4 w-4" />
                {showAddForm ? "Close Add Form" : "Add New Blog Post"}
              </button>
            )}
          </div>
        </div>
      </section>

      {isAdminUser && showAddForm && (
        <section className="mx-auto max-w-4xl px-5 py-12">
          <form className="panel space-y-4 p-8 border border-primary/40 shadow-xl" onSubmit={handleAddBlog} noValidate>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Create New Blog Post (Admin Direct)</h2>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Live on submission
              </span>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Title</label>
              <input
                className={`${field} mt-1.5`}
                placeholder="e.g. Scaling Web Architecture with Next-Gen AI"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs text-muted-foreground">Slug (e.g. scaling-web-architecture)</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="scaling-web-architecture"
                  value={draft.slug}
                  onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Category</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="AI Automation"
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Read Time</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="5 min read"
                  value={draft.readTime}
                  onChange={(e) => setDraft({ ...draft, readTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Excerpt (Card summary)</label>
              <textarea
                rows={2}
                className={`${field} mt-1.5`}
                placeholder="Short summary for the blog card..."
                value={draft.excerpt}
                onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Body Content</label>
              <textarea
                rows={6}
                className={`${field} mt-1.5`}
                placeholder="Full article content..."
                value={draft.body}
                onChange={(e) => setDraft({ ...draft, body: e.target.value })}
              />
            </div>

            {error && <p className="text-xs text-destructive">{error}</p>}

            <div className="flex gap-3">
              <button type="submit" className="btn-primary" disabled={busy}>
                {busy ? "Publishing…" : "Publish Blog Post"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setShowAddForm(false)}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {displayPosts.map((post, idx) => {
            const dateStr = new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            });
            const CategoryIcon =
              post.category === "AI Automation"
                ? Cpu
                : post.category === "SEO & Growth"
                  ? Search
                  : post.category === "Custom Software"
                    ? Code2
                    : Sparkles;

            return (
              <Reveal key={post.id} delay={idx * 100}>
                <article className="card-surface group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/70 p-8 transition-all hover:border-primary/50 hover:shadow-lg">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <CategoryIcon className="h-3.5 w-3.5" />
                        {post.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {dateStr}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>

                    <h2 className="mt-5 text-xl font-bold tracking-tight transition-colors group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-border/40">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:translate-x-1"
                    >
                      Read full article & discuss your project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-card/20 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <span className="eyebrow">Work with NovaMind AI</span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Ready to turn insights into production reality?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Whether you need a high-converting website, custom AI agents, SEO growth, or custom ERP
            software, our team delivers end-to-end execution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Talk to our team
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Explore all services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
