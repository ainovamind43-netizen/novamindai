import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { BLOG_KEYWORDS, breadcrumbSchema, faqSchema, pageMeta, SITE_URL } from "@/lib/seo";
import {
  fetchPublicBlogs,
  checkAdminSession,
  createNewBlog,
  updateExistingBlog,
  removeBlog,
} from "@/server/blogs";
import { adminLogin, adminLogout } from "@/server/reviews";
import { blogInputSchema, type BlogInput } from "@/lib/blog-schema";
import type { PublicBlog } from "@/lib/blogs-types";
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  Code2,
  Search,
  Cpu,
  PlusCircle,
  Pencil,
  Trash2,
  Lock,
  Unlock,
  Check,
  X,
  HelpCircle,
  Briefcase,
  Layers,
} from "lucide-react";

const blogFaqs = [
  {
    q: "How do I hire NovaMind AI for web design, AI automation, or custom software projects?",
    a: "You can submit an inquiry through our contact form or message our engineering lead directly on WhatsApp. We provide a free scope analysis, architecture blueprint, timeline breakdown, and competitive quote for your project within 24 hours.",
  },
  {
    q: "What types of AI automation and custom agents do you build for businesses?",
    a: "We develop autonomous AI agents, enterprise customer support chatbots, intelligent lead qualification workflows, automated CRM syncs, and custom LLM integrations that automate repetitive manual tasks 24/7.",
  },
  {
    q: "Can NovaMind AI develop bespoke ERP and multi-branch POS software?",
    a: "Yes. We engineer customized ERP and retail POS platforms with inventory management, payroll, accounting, real-time analytics, and role-based permissions without expensive per-seat recurring licensing costs.",
  },
  {
    q: "Do you work with international clients across the US, UK, UAE, and Pakistan?",
    a: "Yes. NovaMind AI works with founders, enterprise leaders, and growing businesses across the United States, United Kingdom, Canada, UAE, Saudi Arabia, Pakistan, and worldwide.",
  },
  {
    q: "What technologies and frameworks do your developers specialize in?",
    a: "Our core engineering stack includes React, Next.js, TypeScript, Node.js, Python, PostgreSQL, TailwindCSS, Nitro, serverless cloud architectures, and modern AI/LLM APIs.",
  },
];

const commercialTags = [
  "Hire Web Design Agency",
  "Custom ERP Development",
  "AI Automation Agency",
  "Retail POS Software",
  "B2B SaaS Engineering",
  "Full Stack Developers",
  "Enterprise SEO Growth",
  "Software House in Pakistan & Dubai",
];

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
        {
          title:
            "Web Design, AI Automation & Custom Software Blog | Hire NovaMind AI",
        },
        {
          name: "description",
          content:
            total > 0
              ? `Looking to hire top developers? Read ${total} expert playbooks on AI automation, high-converting web design, custom ERP/POS software, and SEO strategies for US, UK, UAE, and global clients.`
              : "Looking to hire top developers? Discover proven playbooks on AI automation, high-converting web design, custom ERP/POS software, and SEO for US, UK, UAE, and global clients.",
        },
        {
          property: "og:title",
          content: "Web Design, AI Automation & Software Development Blog | NovaMind AI",
        },
        {
          property: "og:description",
          content:
            "Practical playbooks for founders and digital leaders scaling custom software, AI agents, search visibility, and revenue-driving web applications.",
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
            name: "NovaMind AI Engineering & Growth Blog",
            url: `${SITE_URL}/blog`,
            description:
              "In-depth guides on custom web design, AI automation, enterprise ERP/POS development, and technical SEO.",
            publisher: { "@id": `${SITE_URL}/#organization` },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(faqSchema(blogFaqs)),
        },
      ],
    };
  },
  component: Blog,
});

const fallbackPosts: PublicBlog[] = [
  {
    id: "hire-ai-automation-agency-2026-guide",
    title: "How to Hire the Best AI Automation Agency in 2026: Cost, Process & ROI",
    slug: "hire-ai-automation-agency-2026-guide",
    excerpt:
      "A complete guide for business owners looking to hire an AI automation agency. Learn how custom AI agents, automated workflows, and CRM integrations eliminate operational bottlenecks.",
    body: "Hiring the right AI automation agency can transform your business efficiency. In this comprehensive guide, we unpack the exact technical criteria, workflow audit processes, and expected ROI for custom AI agents and enterprise chatbots.",
    category: "AI Automation",
    readTime: "7 min read",
    createdAt: "2026-09-24T00:00:00.000Z",
  },
  {
    id: "custom-erp-software-development-guide",
    title: "Custom ERP Software Development: Why Off-the-Shelf SaaS Fails Growing Businesses",
    slug: "custom-erp-software-development-guide",
    excerpt:
      "When SaaS subscriptions and generic platforms limit your growth, custom ERP and POS development unlocks total control, zero per-seat fees, and tailored business workflows.",
    body: "Pre-packaged ERP software often forces companies into rigid operational templates with climbing monthly subscription bills. Custom software development provides a scalable, proprietary solution tailored precisely to your operational needs.",
    category: "Custom Software",
    readTime: "8 min read",
    createdAt: "2026-09-18T00:00:00.000Z",
  },
  {
    id: "high-converting-b2b-web-design-architecture",
    title: "High-Converting B2B Web Design Architecture: Turn Visitors into Paying Clients",
    slug: "high-converting-b2b-web-design-architecture",
    excerpt:
      "Why speed, typographic hierarchy, semantic HTML, and conversion-focused UX architecture matter more than gimmicks when acquiring enterprise clients and qualified projects.",
    body: "Your website is your premier sales engine. We examine modern architectural principles using React, Next.js, and server-side rendering to maximize page speed and conversion velocity.",
    category: "Web Design",
    readTime: "6 min read",
    createdAt: "2026-09-12T00:00:00.000Z",
  },
  {
    id: "global-seo-strategies-that-drive-qualified-leads",
    title: "Global SEO Strategies That Drive Qualified Project Leads Across the US, UK & UAE",
    slug: "global-seo-strategies-that-drive-qualified-leads",
    excerpt:
      "How to build high-intent topical authority, entity optimization, and technical performance that ranks commercial agency queries in top global business markets.",
    body: "Attracting high-value client projects through organic search requires targeting transactional and commercial queries rather than generic fluff. Discover how semantic SEO and structured data build sustainable pipeline.",
    category: "SEO & Growth",
    readTime: "8 min read",
    createdAt: "2026-09-05T00:00:00.000Z",
  },
];

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

function Blog() {
  const { blogs, isAdminUser } = Route.useLoaderData();
  const router = useRouter();

  const [removedFallbackIds, setRemovedFallbackIds] = useState<string[]>([]);
  const basePosts = blogs.length > 0 ? blogs : fallbackPosts;
  const displayPosts = basePosts.filter((p) => !removedFallbackIds.includes(p.id));

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [newDraft, setNewDraft] = useState<BlogInput>({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "AI Automation",
    readTime: "5 min read",
  });

  const [editDraft, setEditDraft] = useState<BlogInput>({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    category: "AI Automation",
    readTime: "5 min read",
  });

  async function handleAdminLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setLoginError(null);

    try {
      const res = await adminLogin({ data: { password: loginPassword } });
      if (!res.ok) {
        setLoginError(res.error);
        return;
      }
      setLoginPassword("");
      setShowLoginModal(false);
      await router.invalidate();
    } catch {
      setLoginError("Login failed. Check your password.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function handleAdminLogout() {
    setBusy(true);
    try {
      await adminLogout({ data: undefined });
      await router.invalidate();
    } finally {
      setBusy(false);
    }
  }

  async function handleAddBlog(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const parsed = blogInputSchema.safeParse(newDraft);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please fill in all fields correctly.");
      return;
    }

    setFormError(null);
    setBusy(true);
    try {
      const res = await createNewBlog({ data: parsed.data });
      if (!res.ok) {
        setFormError(res.error);
        return;
      }
      setNewDraft({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        category: "AI Automation",
        readTime: "5 min read",
      });
      setShowAddForm(false);
      await router.invalidate();
    } catch {
      setFormError("Failed to publish blog post.");
    } finally {
      setBusy(false);
    }
  }

  function startEditing(post: PublicBlog) {
    setEditingPostId(post.id);
    setFormError(null);
    setEditDraft({
      title: post.title,
      slug: post.slug || post.id,
      excerpt: post.excerpt,
      body: post.body || post.excerpt,
      category: post.category,
      readTime: post.readTime,
    });
  }

  async function handleSaveEdit(postId: string, e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;

    const parsed = blogInputSchema.safeParse(editDraft);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Please check all fields.");
      return;
    }

    setFormError(null);
    setBusy(true);
    try {
      const isFallback = fallbackPosts.some((f) => f.id === postId);
      if (isFallback) {
        const res = await createNewBlog({ data: parsed.data });
        if (!res.ok) {
          setFormError(res.error);
          return;
        }
      } else {
        const res = await updateExistingBlog({ data: { id: postId, data: parsed.data } });
        if (!res.ok) {
          setFormError(res.error);
          return;
        }
      }

      setEditingPostId(null);
      await router.invalidate();
    } catch {
      setFormError("Failed to update blog post.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteBlog(post: PublicBlog) {
    const sure = window.confirm(`Are you sure you want to delete "${post.title}"?`);
    if (!sure) return;

    setBusy(true);
    try {
      const isFallback = fallbackPosts.some((f) => f.id === post.id);
      if (isFallback) {
        setRemovedFallbackIds((prev) => [...prev, post.id]);
      } else {
        const res = await removeBlog({ data: { id: post.id } });
        if (!res.ok) {
          alert(res.error);
          return;
        }
        await router.invalidate();
      }
    } catch {
      alert("Failed to delete blog post.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="eyebrow flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-primary" />
                NovaMind AI Commercial & Engineering Journal
              </span>
              <h1 className="mt-6 text-4xl font-bold sm:text-5xl leading-tight">
                Scale your business with <span className="text-shimmer">web design, AI & custom software.</span>
              </h1>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                Actionable engineering guides, client case studies, and proven growth blueprints.
                Looking to hire an agency? Discover how our team designs, builds, and ranks custom digital solutions.
              </p>
            </div>

            {/* Admin Bar on Hero */}
            <div className="flex flex-wrap items-center gap-3">
              {isAdminUser ? (
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Unlock className="h-3.5 w-3.5" />
                    Admin Mode Active
                  </span>
                  <button
                    type="button"
                    className="btn-primary inline-flex items-center gap-2 text-sm shadow-md"
                    onClick={() => {
                      setShowAddForm(!showAddForm);
                      setEditingPostId(null);
                    }}
                  >
                    <PlusCircle className="h-4 w-4" />
                    {showAddForm ? "Cancel Add" : "+ Add New Blog Post"}
                  </button>
                  <button
                    type="button"
                    className="btn-ghost text-xs"
                    onClick={handleAdminLogout}
                    disabled={busy}
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowLoginModal(true)}
                  className="btn-ghost inline-flex items-center gap-2 text-xs border border-border/80"
                >
                  <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  Admin Login
                </button>
              )}
            </div>
          </div>

          {/* SEO Commercial Keywords Badges Strip */}
          <div className="mt-10 border-t border-border/50 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Explore Our Core Capabilities & Hire Our Team:
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {commercialTags.map((tag) => (
                <Link
                  key={tag}
                  to="/contact"
                  className="rounded-lg border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all hover:border-primary/60 hover:text-primary hover:shadow-sm"
                >
                  {tag} →
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admin Login Modal / Dialog */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAdminLogin}
            className="panel w-full max-w-md space-y-4 p-8 border border-border shadow-2xl relative"
          >
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold">Admin Sign In</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Enter your admin password to unlock adding, editing, and deleting blogs directly on this page.
              </p>
            </div>

            <div>
              <label className="text-xs text-muted-foreground" htmlFor="blog-admin-pass">
                Password
              </label>
              <input
                id="blog-admin-pass"
                type="password"
                className={`${field} mt-1.5`}
                placeholder="Enter password..."
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                autoFocus
              />
            </div>

            {loginError && <p className="text-xs text-destructive">{loginError}</p>}

            <div className="flex gap-3 pt-2">
              <button type="submit" className="btn-primary w-full" disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in…" : "Sign In & Manage Blogs"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add New Blog Post Form (Directly on Blog Page) */}
      {isAdminUser && showAddForm && (
        <section className="mx-auto max-w-4xl px-5 py-10">
          <form
            className="panel space-y-4 p-8 border-2 border-primary/40 shadow-2xl rounded-2xl"
            onSubmit={handleAddBlog}
            noValidate
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" />
                  Add New Blog Post
                </h2>
                <p className="text-xs text-muted-foreground">
                  Publish client-attracting case studies and tech articles instantly.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn-ghost text-xs"
              >
                Close
              </button>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Blog Title *</label>
              <input
                className={`${field} mt-1.5`}
                placeholder="e.g. How Custom AI Agents Automate Client Support in 2026"
                value={newDraft.title}
                onChange={(e) => {
                  const val = e.target.value;
                  const autoSlug = val
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)+/g, "");
                  setNewDraft({
                    ...newDraft,
                    title: val,
                    slug: newDraft.slug ? newDraft.slug : autoSlug,
                  });
                }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-foreground">Slug (URL identifier) *</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="how-custom-ai-agents-automate-support"
                  value={newDraft.slug}
                  onChange={(e) => setNewDraft({ ...newDraft, slug: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Category *</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="AI Automation / Custom Software / SEO"
                  value={newDraft.category}
                  onChange={(e) => setNewDraft({ ...newDraft, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Read Time *</label>
                <input
                  className={`${field} mt-1.5`}
                  placeholder="e.g. 6 min read"
                  value={newDraft.readTime}
                  onChange={(e) => setNewDraft({ ...newDraft, readTime: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Excerpt (Summary) *</label>
              <textarea
                rows={2}
                className={`${field} mt-1.5`}
                placeholder="Brief summary showing on preview cards and Google snippets..."
                value={newDraft.excerpt}
                onChange={(e) => setNewDraft({ ...newDraft, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Full Article Body *</label>
              <textarea
                rows={7}
                className={`${field} mt-1.5`}
                placeholder="Write your complete article content here..."
                value={newDraft.body}
                onChange={(e) => setNewDraft({ ...newDraft, body: e.target.value })}
              />
            </div>

            {formError && <p className="text-xs text-destructive font-medium">{formError}</p>}

            <div className="flex flex-wrap gap-3 pt-2">
              <button type="submit" className="btn-primary" disabled={busy}>
                {busy ? "Publishing…" : "Publish Blog Post Directly"}
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

      {/* Blog Cards Grid */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Featured Articles & Playbooks</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Engineering and commercial strategies designed to grow revenue and operational scale.
            </p>
          </div>
          <Link
            to="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
          >
            Start your project today <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {displayPosts.map((post, idx) => {
            const isEditing = editingPostId === post.id;
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
              <Reveal key={post.id} delay={idx * 80}>
                {isEditing ? (
                  /* INLINE EDIT FORM FOR THIS BLOG POST */
                  <form
                    className="card-surface rounded-2xl border-2 border-primary/60 p-6 shadow-xl space-y-4"
                    onSubmit={(e) => handleSaveEdit(post.id, e)}
                    noValidate
                  >
                    <div className="flex items-center justify-between border-b border-border/40 pb-2">
                      <span className="text-sm font-bold text-primary flex items-center gap-1.5">
                        <Pencil className="h-4 w-4" /> Editing Post
                      </span>
                      <button
                        type="button"
                        className="text-xs text-muted-foreground hover:text-foreground"
                        onClick={() => setEditingPostId(null)}
                      >
                        Cancel
                      </button>
                    </div>

                    <div>
                      <label className="text-xs font-semibold">Title</label>
                      <input
                        className={`${field} mt-1`}
                        value={editDraft.title}
                        onChange={(e) => setEditDraft({ ...editDraft, title: e.target.value })}
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs font-semibold">Slug</label>
                        <input
                          className={`${field} mt-1`}
                          value={editDraft.slug}
                          onChange={(e) => setEditDraft({ ...editDraft, slug: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold">Category</label>
                        <input
                          className={`${field} mt-1`}
                          value={editDraft.category}
                          onChange={(e) => setEditDraft({ ...editDraft, category: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold">Read Time</label>
                        <input
                          className={`${field} mt-1`}
                          value={editDraft.readTime}
                          onChange={(e) => setEditDraft({ ...editDraft, readTime: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold">Excerpt</label>
                      <textarea
                        rows={2}
                        className={`${field} mt-1`}
                        value={editDraft.excerpt}
                        onChange={(e) => setEditDraft({ ...editDraft, excerpt: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold">Body Content</label>
                      <textarea
                        rows={5}
                        className={`${field} mt-1`}
                        value={editDraft.body}
                        onChange={(e) => setEditDraft({ ...editDraft, body: e.target.value })}
                      />
                    </div>

                    {formError && <p className="text-xs text-destructive">{formError}</p>}

                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="btn-primary text-xs" disabled={busy}>
                        <Check className="mr-1 inline h-3.5 w-3.5" />
                        {busy ? "Saving…" : "Save Changes"}
                      </button>
                      <button
                        type="button"
                        className="btn-ghost text-xs"
                        onClick={() => setEditingPostId(null)}
                        disabled={busy}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  /* NORMAL BLOG CARD WITH DIRECT EDIT & DELETE BUTTONS */
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
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all group-hover:translate-x-1"
                        >
                          Hire team for this project
                          <ArrowRight className="h-4 w-4" />
                        </Link>

                        {/* DIRECT EDIT & DELETE BUTTONS */}
                        {isAdminUser && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => startEditing(post)}
                              className="btn-ghost inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold hover:border-primary/50"
                              title="Edit Blog Post"
                            >
                              <Pencil className="h-3.5 w-3.5 text-primary" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteBlog(post)}
                              className="btn-ghost inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
                              title="Delete Blog Post"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Commercial FAQ Section for SEO Ranking and Lead Generation */}
      <section className="mx-auto max-w-6xl px-5 py-16 border-t border-border/60">
        <div className="max-w-2xl mb-10">
          <span className="eyebrow flex items-center gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            Frequently Asked Project Questions
          </span>
          <h2 className="mt-4 text-3xl font-bold">
            Hiring NovaMind AI for your next project.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Clear answers about timelines, scope estimations, custom engineering capabilities, and international delivery.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogFaqs.map((faq, i) => (
            <div
              key={i}
              className="card-surface rounded-2xl border border-border/70 p-6 space-y-3"
            >
              <h3 className="font-bold text-base text-foreground flex items-start gap-2">
                <span className="text-primary font-mono text-sm">Q.</span>
                {faq.q}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* High-Converting CTA Section */}
      <section className="border-t border-border bg-card/30 py-20">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <span className="eyebrow flex items-center justify-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-primary" />
            Start Your Software or AI Project
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Have a project in mind? Let&rsquo;s engineer your solution.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Whether you need a high-converting web application, an autonomous AI agent, a custom ERP,
            or aggressive international SEO rankings, our engineers deliver with speed and precision.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Get a Free Project Scope & Quote
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-6 py-3 text-sm font-semibold transition-colors hover:bg-muted"
            >
              View Full Services Portfolio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
