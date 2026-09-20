import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Reveal } from "@/components/site/Reveal";
import { Footer } from "@/components/site/Footer";
import { HeroAtmosphere } from "@/components/site/HeroAtmosphere";
import { ServicesSection } from "@/components/site/ServicesSection";
import { CardConnectors } from "@/components/site/CardConnectors";
import { Interactive3DCard } from "@/components/ui/Interactive3DCard";
import { contactDetails } from "@/lib/contact-details";
import { HOME_KEYWORDS, faqSchema, pageMeta } from "@/lib/seo";
import heroImg from "@/assets/hero.jpg";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/")({
  head: () => {
    const { links, meta: urlMeta } = pageMeta("/", HOME_KEYWORDS);
    return {
      links,
      meta: [
        ...urlMeta,
        // Keyword-first, brand last: the first ~60 characters are all Google
        // reliably shows, so "Web Design, AI Automation & SEO Agency" leads and
        // "NovaMind AI" closes.
        { title: "Web Design, AI Automation & SEO Agency | NovaMind AI" },
        {
          name: "description",
          content:
            "NovaMind AI is a web design, AI automation and SEO agency building websites, AI agents, ERP, POS and custom software for clients in the US, UK, Gulf and Pakistan.",
        },
        {
          property: "og:title",
          content: "Web Design, AI Automation & SEO Agency — NovaMind AI",
        },
        {
          property: "og:description",
          content:
            "Real projects, really delivered. Websites, AI agents, SEO, paid media, ERP platforms, POS software and custom business systems.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(faqSchema(faqs)) }],
    };
  },
  component: Index,
});

const stats = [
  { value: "1,200+", label: "Projects Delivered" },
  { value: "24h", label: "Avg. Turnaround" },
  { value: "98%", label: "Client Retention" },
];

const engines = [
  "Website Design",
  "Web Development",
  "AI Agents",
  "AI Chatbots",
  "SEO",
  "Technical SEO",
  "Meta Ads",
  "Google Ads",
  "Android Apps",
  "ERP Systems",
  "POS Software",
  "Custom Software",
];

const systems = [
  {
    tag: "Finance · Inventory · HR",
    title: "ERP Software",
    body: "End-to-end ERP platforms that run your finance, inventory, HR, and procurement in one place — built around the way your business already works, not the other way round.",
  },
  {
    tag: "Retail · Hospitality",
    title: "POS Software",
    body: "Point-of-sale systems for single and multi-branch operations: fast billing, barcode and inventory sync, live sales reporting, and offline-first reliability when the internet drops.",
  },
  {
    tag: "Custom · Internal Tools",
    title: "Business Systems",
    body: "CRMs, dashboards, booking engines, dealer portals, and workflow tools — custom software that replaces the spreadsheets and manual processes holding your team back.",
  },
  {
    tag: "Shipped · Handed Over",
    title: "Delivered & Supported",
    body: "Every project is built to production standard, tested, documented, and handed over with training — then supported after launch. Real code, real deployments, real sign-off.",
  },
];

const pillars = [
  {
    tag: "Design · Build · CRO",
    title: "Websites · Your Digital HQ",
    body: "A fast, conversion-first website is the asset every other channel compounds on. Strategy, design, build, and ongoing CRO — handled end-to-end.",
  },
  {
    tag: "Agents · Chatbots · Automation",
    title: "AI · The Force Multiplier",
    body: "Custom AI agents answer customers, qualify leads, and clear repetitive work 24/7 — so your team spends its hours on growth instead of admin.",
  },
  {
    tag: "Technical · Content · Authority",
    title: "SEO · Compounding Traffic",
    body: "Technical fixes, content strategy, and link building that put you on page one — the channel that gets cheaper every month you run it.",
  },
  {
    tag: "Meta · Google · Creative",
    title: "Paid Media · Immediate Reach",
    body: "Full-funnel campaigns with creative and tracking built in, optimised for profitable ROAS rather than vanity impressions.",
  },
];

const path = [
  {
    step: "01",
    time: "48 hrs",
    title: "Audit & Discovery",
    body: "Deep-dive into your site, search visibility, ad spend, and automation gaps — delivered as a scored report.",
  },
  {
    step: "02",
    time: "Week 1",
    title: "Growth Blueprint",
    body: "A channel-by-channel roadmap: what to build first, what to fix, and the revenue model behind it.",
  },
  {
    step: "03",
    time: "Week 2–4",
    title: "Build & Launch",
    body: "Site, AI agents, campaigns, and tracking go live with a dedicated account manager.",
  },
  {
    step: "04",
    time: "Ongoing",
    title: "Scale & Compound",
    body: "SEO, ads, and AI automation keep expanding — reviewed weekly against your growth targets.",
  },
];

const why = [
  {
    n: "01",
    title: "360° Management",
    body: "From first wireframe to live campaigns, we handle the A to Z — no juggling vendors.",
  },
  {
    n: "02",
    title: "Data-Driven Results",
    body: "Every decision is backed by analytics. We track traffic, conversion, and ad spend for lean growth.",
  },
  {
    n: "03",
    title: "One Connected Stack",
    body: "Website, AI, and search built to feed each other — not five disconnected vendors.",
  },
  {
    n: "04",
    title: "Engineering Mindset",
    body: "AI agents, custom software, and SEO that compound. Built right the first time.",
  },
];

const bars = [
  { label: "Website Conversion Rate", value: 94 },
  { label: "Organic Search Growth", value: 88 },
  { label: "AI Automation Coverage", value: 76 },
  { label: "Paid Media ROAS", value: 91 },
];

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "UAE",
  "Saudi Arabia",
  "Germany",
  "Netherlands",
  "Singapore",
  "Pakistan",
  "India",
  "South Africa",
];

const testimonials = [
  {
    quote:
      "NovaMind AI rebuilt our website and put AI agents on support. Conversion is up, and my team finally stopped drowning in repetitive tickets.",
    name: "Sarah Jenkins",
    company: "LuxeTech Solutions",
  },
  {
    quote:
      "They took us from page four to page one for our main keywords, then built the landing pages that turn that traffic into revenue.",
    name: "John Paul",
    company: "Solace Home Goods",
  },
  {
    quote:
      "The AI automation alone gave us back two working days a week. Everything they build is documented, tested, and actually maintainable.",
    name: "Bill Jackson",
    company: "Urban Trend",
  },
];

/**
 * The visible FAQ is doing double duty: it answers the questions buyers type
 * into Google before they ever contact an agency, and the same array feeds the
 * FAQPage schema in head(). Keep the two wired together — schema that
 * describes questions the page does not show is a mismatch Google can flag.
 */
const faqs = [
  {
    q: "What services does NovaMind AI provide?",
    a: "Website design and development, AI agents and automation, SEO, Meta & Google Ads, Android apps — plus custom software engineering, including ERP platforms, POS software, and internal business systems. Every project is delivered to production.",
  },
  {
    q: "How much does a website cost?",
    a: "It depends on scope. A conversion-focused landing page and a multi-language corporate site with a CMS are very different builds, so we quote after a short discovery call rather than publishing a fake starting price. You get a fixed scope, timeline and budget before any work begins — no hourly surprises.",
  },
  {
    q: "Which countries and cities does NovaMind AI serve?",
    a: "We are a remote-first global team. Most of our clients are in the United States, United Kingdom, Canada and Australia, across the Gulf — Dubai, Abu Dhabi, Riyadh, Doha and Kuwait City — and in Pakistan, where we work with businesses in Lahore, Karachi and Islamabad. We cover every timezone and run projects in English and Urdu.",
  },
  {
    q: "Do you provide POS software for retail shops?",
    a: "Yes. We build point-of-sale software for single and multi-branch retail and hospitality businesses — fast billing, barcode scanning, inventory sync across branches, live sales reporting, and offline-first operation so billing never stops when the internet drops.",
  },
  {
    q: "Can you build an AI chatbot or AI agent for my business?",
    a: "Yes. We build custom AI agents and chatbots that answer customer questions, qualify and route leads, handle order and booking enquiries, and clear repetitive back-office work around the clock. They are trained on your own products, pricing and policies — not a generic bot with your logo on it.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Technical fixes and on-page work can move rankings within weeks. Competitive commercial keywords — the ones that actually bring buyers — typically take three to six months of consistent content and link building to reach page one, and keep compounding after that. Anyone promising first place in a week is not doing SEO.",
  },
  {
    q: "Do you build ERP software for small and medium businesses?",
    a: "Yes. We build ERP platforms covering finance, inventory, HR, payroll and procurement, sized for small and mid-sized operations rather than only enterprises. Every system is built around your existing workflow, then handed over with documentation, training and post-launch support.",
  },
  {
    q: "Do I need an existing website to work with NovaMind AI?",
    a: "No. We build from scratch or improve what you already have — and we'll tell you honestly which one your situation calls for.",
  },
  {
    q: "Do you build software, or only marketing?",
    a: "Both. We design and ship ERP platforms, POS software, and custom business systems — real projects built to production standard and delivered with documentation, training, and post-launch support.",
  },
  {
    q: "How do I get started with NovaMind AI?",
    a: `Book a free audit through the contact form, or message us on WhatsApp at ${contactDetails.phone}. Our team will review your goals and recommend the best strategy to launch or scale.`,
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden hero-surface">
        <HeroAtmosphere />
        <img
          src={heroImg}
          alt=""
          width={1600}
          height={900}
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-35"
        />
        <span className="orb left-[-10%] top-[-15%] h-80 w-80 bg-[var(--olive)]" />
        <span
          className="orb right-[-8%] top-[30%] h-96 w-96 bg-[var(--gold)]"
          style={{ animationDelay: "2s" }}
        />
        <div className="relative z-20 mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
          <div>
            <span className="eyebrow">One agency · Twelve growth engines</span>
            {/* The H1 is the strongest on-page signal there is, so it names the
                services in plain language rather than staying purely brand
                copy. "Web design", "AI automation" and "SEO" are the three
                terms buyers actually search. */}
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Web design, AI automation and SEO that{" "}
              <span className="text-shimmer">scale your brand</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Websites, AI agents, SEO, Google &amp; Meta Ads, Android apps, ERP and POS software,
              and custom business systems — one partner, twelve growth engines, end-to-end
              execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary shine">
                Get a Free Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-ghost hover-glow">
                Explore Services
              </Link>
            </div>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <Interactive3DCard className="panel card-beam p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>novamindai.info · growth console</span>
              <span className="flex items-center gap-1.5 text-primary">
                <span className="pulse-dot h-2 w-2 rounded-full bg-primary" /> Live
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { k: "Revenue", v: "+143%" },
                { k: "ROAS", v: "5.8×" },
                { k: "Orders", v: "9.4k" },
              ].map((m) => (
                <div key={m.k} className="rounded-xl bg-secondary/60 p-3">
                  <div className="text-[11px] text-muted-foreground">{m.k}</div>
                  <div className="mt-1 font-display text-xl font-bold">{m.v}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex h-28 items-end gap-2">
              {[38, 55, 44, 72, 60, 88, 96].map((h, i) => (
                <div
                  key={i}
                  className="bar-anim flex-1 rounded-t-md bg-[image:var(--gradient-gold)]"
                  style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <span key={d}>{d}</span>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {engines.map((e) => (
                <span
                  key={e}
                  className="chip-hover rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
                >
                  {e}
                </span>
              ))}
            </div>
          </Interactive3DCard>
        </div>
      </section>

      {/* Services Consolidation */}
      <section className="mx-auto max-w-6xl px-5 pt-24">
        <span className="eyebrow">Our Services</span>
        <h2 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">
          Web design, AI, SEO and software — everything your brand needs to scale.
        </h2>
        <ServicesSection />
      </section>

      {/* Pillars */}
      <section id="about" className="mx-auto max-w-6xl px-5 py-24">
        <span className="eyebrow">The Digital Landscape in 2026</span>
        <h2 className="mt-5 max-w-2xl text-3xl font-bold sm:text-4xl">
          Own your channels. Compound your growth.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Brands that connect a website, AI, and search into one system grow faster than those
          buying them piecemeal. NovaMind AI builds the whole stack.
        </p>
        <CardConnectors className="mt-12 grid gap-12 md:grid-cols-2">
          {pillars.map((c, i) => (
            <Reveal key={c.title} delay={i * 100} className="h-full">
              <Interactive3DCard className="h-full">
                <article className="panel card-beam h-full p-7">
                  <span className="text-[11px] uppercase tracking-widest text-primary">
                    {c.tag}
                  </span>
                  <h3 className="hover-glow mt-3 text-xl font-bold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </article>
              </Interactive3DCard>
            </Reveal>
          ))}
        </CardConnectors>
      </section>

      {/* Enterprise delivery */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="eyebrow">Enterprise delivery</span>
          <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">
            Real projects. Really delivered.
          </h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            NovaMind AI is not slide decks and proposals. We build working software — ERP platforms,
            POS systems, and custom business applications — and we deliver it to production. Live
            systems running real operations every day, handed over with training, documentation, and
            support after launch.
          </p>
          <CardConnectors className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {systems.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} className="h-full">
                <Interactive3DCard className="h-full">
                  <article className="panel card-beam h-full p-7">
                    <span className="text-[11px] uppercase tracking-widest text-primary">
                      {s.tag}
                    </span>
                    <h3 className="hover-glow mt-3 text-xl font-bold">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </article>
                </Interactive3DCard>
              </Reveal>
            ))}
          </CardConnectors>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Fixed scope, timeline and budget",
              "Source code and documentation handed over",
              "Hands-on training for your team",
              "Post-launch support and maintenance",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary shine">
              Discuss your project <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Growth path */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">How we work</span>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl">The NovaMind AI Growth Path</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                A repeatable operating system that takes a brand from first audit to compounding
                digital growth.
              </p>
            </div>
            <Link to="/contact" className="btn-ghost">
              Start with a free audit →
            </Link>
          </div>
          <CardConnectors className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {path.map((p, i) => (
              <Reveal key={p.step} delay={i * 90} className="h-full">
                <Interactive3DCard className="h-full">
                  <article className="panel card-beam h-full p-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-2xl font-bold text-primary">{p.step}</span>
                      <span className="text-[11px] text-muted-foreground">{p.time}</span>
                    </div>
                    <h3 className="hover-glow mt-4 text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </article>
                </Interactive3DCard>
              </Reveal>
            ))}
          </CardConnectors>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="eyebrow">Why NovaMind AI</span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Built on data. Driven by craft.</h2>
            <p className="mt-4 text-muted-foreground">
              Brands that connect a website, AI, and search into one system grow faster than those
              buying them piecemeal. NovaMind AI builds the whole stack.
            </p>
            <Link to="/services" className="btn-primary mt-7">
              Learn More
            </Link>
          </div>
          <CardConnectors className="grid gap-12 sm:grid-cols-2">
            {why.map((w, i) => (
              <Reveal key={w.n} delay={i * 80} className="h-full">
                <Interactive3DCard className="h-full">
                  <article className="panel card-beam h-full p-6">
                    <span className="font-display text-sm font-bold text-primary">{w.n}</span>
                    <h3 className="hover-glow mt-3 text-lg font-bold">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
                  </article>
                </Interactive3DCard>
              </Reveal>
            ))}
          </CardConnectors>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Results our clients measure</span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Real numbers from real campaigns.
            </h2>
          </div>
          <div className="space-y-6">
            {bars.map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm">
                  <span>{b.label}</span>
                  <span className="font-semibold text-primary">{b.value}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-[image:var(--gradient-gold)]"
                    style={{ width: `${b.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <span className="eyebrow">Global Company</span>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold sm:text-4xl">
          One partner. Every market. Worldwide delivery.
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          NovaMind AI operates as a remote-first global team, serving clients across North America,
          Europe, the Middle East, Asia-Pacific, Africa, and Latin America. Whatever your region,
          timezone, or language, we run compliant, localised growth systems around your schedule.
        </p>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          That covers businesses in <strong>Dubai</strong>, <strong>Abu Dhabi</strong> and{" "}
          <strong>Riyadh</strong>; in <strong>London</strong>, <strong>New York</strong>,{" "}
          <strong>Toronto</strong> and <strong>Sydney</strong>; and in Pakistan, where we take on
          web design and software projects in <strong>Lahore</strong>, <strong>Karachi</strong> and{" "}
          <strong>Islamabad</strong>.
        </p>
        <CardConnectors className="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: "30+", l: "Countries served" },
            { v: "24/7", l: "Timezone coverage" },
            { v: "12", l: "Growth engines" },
            { v: "6", l: "Languages supported" },
          ].map((s, i) => (
            <Reveal key={s.l} delay={i * 80}>
              <Interactive3DCard>
                <div className="panel card-beam p-6">
                  <div className="font-display text-3xl font-bold text-primary">{s.v}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
                </div>
              </Interactive3DCard>
            </Reveal>
          ))}
        </CardConnectors>
        <div className="mt-8 flex flex-wrap gap-2">
          {countries.map((c) => (
            <span
              key={c}
              className="chip-hover rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Company */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
          <img
            src={teamImg}
            alt="The NovaMind AI team building growth systems for global brands"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-2xl border border-border object-cover"
          />
          <div>
            <span className="eyebrow">Our Company</span>
            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              We help brands worldwide build and scale profitable businesses.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Building a brand online is full of opportunity — but a website, AI, and search each
              demand precision and consistent execution. NovaMind AI exists to remove that
              complexity and give founders a partner they can trust.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Alongside growth work we engineer and deliver custom software: ERP platforms, POS
              systems, and internal business applications. Every build ships to production, fully
              tested and documented, because a system that never goes live is not a result.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We believe long-term success is built on strong foundations, data-driven decisions,
              and transparent communication. Our team focuses on sustainable systems — not shortcuts
              — so our clients can grow with stability and clarity at every stage.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-primary">
                Let's Talk
              </Link>
              <Link to="/about" className="btn-ghost">
                About NovaMind AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <span className="eyebrow">Real Brands. Real Results.</span>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl">See how we've helped brands grow.</h2>
        <CardConnectors className="mt-12 grid gap-12 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="h-full">
              <Interactive3DCard className="h-full">
                <figure className="panel card-beam h-full p-7">
                  <div className="text-primary">★★★★★</div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.company}</div>
                  </figcaption>
                </figure>
              </Interactive3DCard>
            </Reveal>
          ))}
        </CardConnectors>
      </section>

      {/* FAQ */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-5 py-24">
          <span className="eyebrow">Everything you need to know</span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
          <p className="mt-3 text-muted-foreground">
            Can't find it? Reach out and we'll get back fast.
          </p>
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="panel group p-6 transition-colors duration-300 hover:border-primary/50">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="panel hero-surface shine relative overflow-hidden p-10 text-center sm:p-16">
            <span className="orb left-[10%] top-[-40%] h-64 w-64 bg-[var(--gold)]" />
            <span
              className="orb bottom-[-40%] right-[10%] h-64 w-64 bg-[var(--olive)]"
              style={{ animationDelay: "3s" }}
            />
            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Have a project in mind? Let's get to work.
            </h2>
            <p className="relative mt-4 text-muted-foreground">
              Drop your email and we'll send a free strategy audit within 24 hours — or message us
              on WhatsApp at{" "}
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-primary"
              >
                {contactDetails.phone}
              </a>
              .
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary shine">
                Get Audit <Check className="h-4 w-4" />
              </Link>
              <a
                href={contactDetails.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
