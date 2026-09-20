import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services-data";
import { pageMeta } from "@/lib/seo";
import { ServicesSection } from "@/components/site/ServicesSection";

export const Route = createFileRoute("/services")({
  head: () => {
    const { links, meta: urlMeta } = pageMeta("/services");
    return {
      links,
      meta: [
        ...urlMeta,
        { title: "Services — NovaMind AI Growth Engines" },
        {
          name: "description",
          content:
            "Website design and build, AI agents, SEO, Meta & Google Ads, Android apps, ERP and POS software, and custom business systems — delivered to production by NovaMind AI.",
        },
        { property: "og:title", content: "All services. One partner. — NovaMind AI" },
        {
          property: "og:description",
          content:
            "Websites, AI agents, SEO, ads, apps, and delivered software engineering — ERP, POS and custom business systems.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(serviceCatalog) }],
    };
  },
  component: Services,
});

/**
 * The service list as schema.org offers. Built here rather than in lib/seo so
 * the copy only ships on the page that actually shows it.
 */
const serviceCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "NovaMind AI services",
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.title, description: s.body },
  })),
};

function Services() {
  return (
    <div className="min-h-screen">
      <Header />

      <section className="hero-surface relative overflow-hidden border-b border-border">
        <span className="orb left-[-8%] top-[-20%] h-72 w-72 bg-[var(--olive)]" />
        <span
          className="orb right-[-6%] top-[10%] h-80 w-80 bg-[var(--gold)]"
          style={{ animationDelay: "3s" }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-24">
          <Reveal>
            <span className="eyebrow pulse-dot">What we do</span>
            <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
              All services. <span className="text-shimmer">One partner.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              From a website that converts to production AI agents, ERP and POS platforms, and SEO
              that ranks — every engine NovaMind AI runs for your brand, built and delivered to
              production.
            </p>
            <Link to="/contact" className="btn-primary shine mt-8">
              Get a free audit
            </Link>
          </Reveal>
        </div>

        <div className="relative overflow-hidden border-t border-border/60 py-4">
          <div className="marquee-track gap-10 pr-10 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {[...services, ...services].map((s, i) => (
              <span key={`${s.title}-${i}`} className="hover-glow whitespace-nowrap">
                {s.title}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <Reveal>
          <div className="panel shine relative overflow-hidden p-10 text-center">
            <span className="orb left-1/2 top-0 h-56 w-56 -translate-x-1/2 bg-[var(--gold)]" />
            <h2 className="relative text-3xl font-bold">
              Ready to plug in <span className="text-shimmer">every engine?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-muted-foreground">
              One team, twelve growth engines, zero hand-offs. Book a free audit and we will map the
              fastest path to growth.
            </p>
            <Link to="/contact" className="btn-primary shine relative mt-8">
              Get a free audit
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
