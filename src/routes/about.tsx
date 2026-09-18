import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { CardConnectors } from "@/components/site/CardConnectors";
import teamImg from "@/assets/team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About NovaMind AI — Success After Struggle" },
      {
        name: "description",
        content:
          "Since 2021 NovaMind AI has built websites, AI agents, search visibility, and custom software — including ERP and POS platforms — delivered to production for brands worldwide.",
      },
      { property: "og:title", content: "About NovaMind AI" },
      {
        property: "og:description",
        content:
          "A remote-first global team building sustainable, data-driven growth systems for modern brands.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const roadmap = [
  {
    n: "01",
    t: "Discovery",
    b: "We analyze your current site, search presence, systems, or new idea.",
  },
  {
    n: "02",
    t: "Strategy",
    b: "We build a custom roadmap across website, AI, SEO, paid media, and custom software.",
  },
  {
    n: "03",
    t: "Build & Deliver",
    b: "Our team designs, engineers, and ships the system — tested, documented, and live.",
  },
  {
    n: "04",
    t: "Scale & Support",
    b: "Compounding SEO, ads, AI expansion, and ongoing support for the software we delivered.",
  },
];

function About() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="eyebrow">About NovaMind AI</span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Success after struggle.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Since 2021 we've built websites, AI agents, search visibility, and custom software —
            including ERP and POS platforms — delivered to production for brands worldwide, with one
            dedicated team behind every account.
          </p>
          <Link to="/contact" className="btn-primary mt-8">
            Talk to our team
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 lg:grid-cols-2">
        <div>
          <span className="eyebrow">CEO Message</span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
            We help entrepreneurs and brands confidently build and scale profitable businesses.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Building a brand online is full of opportunity, but it can also be complex and
            overwhelming. A website, AI, search, and paid media each demand strategy, precision, and
            consistent execution. NovaMind AI was created to remove that complexity.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We believe long-term success is built on strong foundations, data-driven decisions, and
            transparent communication. Our team focuses on creating sustainable systems — not
            shortcuts — so our clients can grow with stability and clarity.
          </p>
          <p className="mt-5 text-sm font-semibold text-primary">— Usman Zafar, Founder</p>
          <Link to="/contact" className="btn-ghost mt-7">
            Let's Talk
          </Link>
        </div>
        <div className="space-y-5">
          <img
            src={teamImg}
            alt="NovaMind AI operators collaborating on client growth systems"
            width={1200}
            height={900}
            loading="lazy"
            className="rounded-2xl border border-border object-cover"
          />
          <CardConnectors className="grid gap-12 sm:grid-cols-2">
            <div className="panel p-6">
              <div className="text-xs text-muted-foreground">Since 2021 · Global</div>
              <div className="mt-2 font-display text-3xl font-bold text-primary">360°</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Websites, AI, SEO, paid media — plus ERP, POS and custom business software delivered
                to production for brands worldwide.
              </p>
            </div>
            <div className="panel p-6">
              <div className="text-xs text-muted-foreground">Full-stack management</div>
              <div className="mt-2 font-display text-3xl font-bold text-primary">A–Z</div>
              <p className="mt-2 text-sm text-muted-foreground">
                Strategy, design, engineering, delivery and support under one accountable team —
                from website to ERP.
              </p>
            </div>
          </CardConnectors>
        </div>
      </section>

      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="eyebrow">Our Roadmap</span>
          <h2 className="mt-5 text-3xl font-bold sm:text-4xl">The A to Z Process</h2>
          <CardConnectors className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {roadmap.map((r, i) => (
              <Reveal key={r.n} delay={i * 90} className="h-full">
                <article className="panel h-full p-6">
                  <span className="font-display text-2xl font-bold text-primary">{r.n}</span>
                  <h3 className="mt-3 text-lg font-bold">{r.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.b}</p>
                </article>
              </Reveal>
            ))}
          </CardConnectors>
        </div>
      </section>

      <Footer />
    </div>
  );
}
