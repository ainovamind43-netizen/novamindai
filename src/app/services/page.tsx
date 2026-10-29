import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { services } from "@/lib/services-data";
import { AREAS_SERVED, SERVICES_KEYWORDS, SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { ServicesSection } from "@/components/site/ServicesSection";

export const metadata: Metadata = {
  title: "Web Design, AI, SEO & Software Services | NovaMind AI",
  description: "Web design, AI agents, SEO, Google & Meta Ads, mobile apps, ERP, POS and custom software — every service NovaMind AI delivers to production for clients worldwide.",
  keywords: SERVICES_KEYWORDS.join(", "),
  openGraph: {
    title: "All services. One partner. — NovaMind AI",
    description: "Websites, AI agents, SEO, ads, apps, and delivered software engineering — ERP, POS and custom business systems.",
    type: "website",
    url: "https://www.novamindai.info/services",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const serviceCatalog = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "NovaMind AI services",
  url: `${SITE_URL}/services`,
  itemListElement: services.map((s) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: s.title,
      description: s.body,
      serviceType: s.cat,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: AREAS_SERVED.map((name) => ({ "@type": "Country", name })),
    },
  })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceCatalog),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Services", path: "/services" }])),
        }}
      />

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
              Web design, AI, SEO and software. <span className="text-shimmer">One partner.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-muted-foreground">
              From a website that converts to production AI agents, ERP and POS platforms, and SEO
              that ranks — every engine NovaMind AI runs for your brand, built and delivered to
              production.
            </p>
            <Link href="/contact" className="btn-primary shine mt-8">
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

      <h2 className="sr-only">All NovaMind AI services</h2>
      <ServicesSection />

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <div className="panel p-8 sm:p-10">
          <h2 className="text-2xl font-bold">A full-service web, AI and software company</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            NovaMind AI is a digital agency that covers the whole stack a modern business needs:
            website design and web development, ecommerce and Shopify stores, AI automation and
            chatbot development, search engine optimization, Google Ads and Meta Ads management,
            mobile app development, and custom software engineering. On the software side we build
            and deliver ERP systems for finance, inventory, HR and procurement; POS software for
            single and multi-branch retail and
            hospitality; SaaS platforms, dashboards, dealer portals and internal business systems.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            We work with clients worldwide from a remote-first base — businesses in the United
            States, United Kingdom, Canada and Australia, across the Gulf in Dubai, Abu Dhabi,
            Riyadh and Doha, and in Pakistan across Lahore, Karachi and Islamabad. Whether you are
            looking for an SEO agency, a web design company, an AI automation partner or a software
            house to build a system end to end, the engagement starts the same way: a free audit and
            a written plan.
          </p>
        </div>
      </section>

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
            <Link href="/contact" className="btn-primary shine relative mt-8">
              Get a free audit
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
