import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Clock, Zap, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { services } from "@/lib/services-data";
import { contactDetails } from "@/lib/contact-details";
import { CONTACT_KEYWORDS, SITE_URL, breadcrumbSchema, pageMeta } from "@/lib/seo";

/**
 * ContactPage markup, linked back to the Organization by @id. It tells Google
 * this is the page to surface for "how do I contact" style queries rather than
 * a service page, which matters once the site ranks for the brand name.
 */
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact NovaMind AI",
  url: `${SITE_URL}/contact`,
  description:
    "Contact NovaMind AI for a free website, SEO or software audit. We reply within 24 hours.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export const Route = createFileRoute("/contact")({
  head: () => {
    const { links, meta: urlMeta } = pageMeta("/contact", CONTACT_KEYWORDS);
    return {
      links,
      meta: [
        ...urlMeta,
        { title: "Contact NovaMind AI — Free Website & SEO Audit" },
        {
          name: "description",
          content:
            "Get a free website audit or SEO audit from NovaMind AI. Tell us about your project — web design, AI automation, ERP or POS software — and we reply within 24 hours.",
        },
        { property: "og:title", content: "Let's build something great — NovaMind AI" },
        {
          property: "og:description",
          content: "Free audit and roadmap for your website, AI, SEO and paid media plans.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(contactSchema) },
        {
          type: "application/ld+json",
          children: JSON.stringify(breadcrumbSchema([{ name: "Contact", path: "/contact" }])),
        },
      ],
    };
  },
  component: Contact,
});

const details = [
  {
    icon: Mail,
    k: "Email",
    v: contactDetails.email,
    href: `mailto:${contactDetails.email}`,
  },
  { icon: Clock, k: "Hours", v: contactDetails.hours },
  {
    icon: MessageCircle,
    k: "WhatsApp",
    v: contactDetails.phone,
    href: contactDetails.whatsappHref,
  },
  { icon: Zap, k: "Response", v: contactDetails.response },
];

const field =
  "w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm outline-none focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = [
      "New enquiry from novamindai.info",
      `Name: ${String(data.get("name") ?? "")}`,
      `Email: ${String(data.get("email") ?? "")}`,
      `Company: ${String(data.get("company") ?? "")}`,
      `Phone: ${String(data.get("phone") ?? "")}`,
      `Interested in: ${String(data.get("interest") ?? "")}`,
      `Message: ${String(data.get("message") ?? "")}`,
    ].join("\n");

    window.open(
      `${contactDetails.whatsappHref}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <div className="min-h-screen">
      <Header />

      <section className="hero-surface border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">
            Let's build something great.{" "}
            <span className="text-shimmer">Start with a free audit.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Tell us about your brand and where you want to grow — we'll come back with a roadmap and
            pricing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={contactDetails.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary shine"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
            <Link to="/services" className="btn-ghost">
              Browse services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <h2 className="text-3xl font-bold">Send us a message.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tell us about your brand. We'll respond within 24 hours with a free audit and
            recommended next steps — or message us on WhatsApp if you'd rather talk it through.
          </p>
          <div className="mt-8 space-y-4">
            {details.map((i) => (
              <div key={i.k} className="panel flex items-center gap-4 p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-gold)] text-primary-foreground">
                  <i.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">{i.k}</div>
                  {i.href ? (
                    <a href={i.href} className="text-sm font-medium hover:text-primary">
                      {i.v}
                    </a>
                  ) : (
                    <div className="text-sm font-medium">{i.v}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="panel space-y-4 p-7" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" required className={`${field} mt-1.5`} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" required className={`${field} mt-1.5`} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="company">
                Company
              </label>
              <input id="company" name="company" className={`${field} mt-1.5`} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground" htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone or WhatsApp"
                className={`${field} mt-1.5`}
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="interest">
              Interested in
            </label>
            <select id="interest" name="interest" className={`${field} mt-1.5`}>
              {services.map((s) => (
                <option key={s.title}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground" htmlFor="message">
              Message
            </label>
            <textarea id="message" name="message" rows={5} className={`${field} mt-1.5`} />
          </div>
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Opens WhatsApp on{" "}
            <span className="font-semibold text-primary">{contactDetails.phone}</span>
          </p>
          {sent && (
            <p className="text-center text-sm text-primary">
              WhatsApp is opening — send the message and we'll reply within 24 hours.
            </p>
          )}
        </form>
      </section>

      {/* Service-area block. Location terms only carry weight when they sit in
          real copy on a real page, so this is written as something a visitor
          would want to know — where we work and what we can be hired for —
          rather than as a list of place names. */}
      <section className="border-t border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-2xl font-bold">Where we work, and what you can hire us for</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            NovaMind AI is a remote-first web design, AI automation and software company. We take on
            projects worldwide and work in overlapping hours so there is always someone on your
            account during your working day.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                h: "Pakistan",
                b: "Web design, software and SEO projects in Lahore, Karachi, Islamabad and Rawalpindi — plus ERP and POS software for retail and distribution businesses nationwide.",
              },
              {
                h: "UAE & Saudi Arabia",
                b: "Web development, digital marketing and custom software for companies in Dubai, Abu Dhabi, Sharjah, Riyadh, Jeddah and Doha.",
              },
              {
                h: "United States & Canada",
                b: "Website design, SEO and AI automation for businesses in New York, Toronto, Vancouver and across North America.",
              },
              {
                h: "United Kingdom & Europe",
                b: "Web design, Google Ads management and SEO services for clients in London, Manchester, Birmingham and across the UK and EU.",
              },
              {
                h: "Australia & Asia-Pacific",
                b: "Websites, ad campaigns and software systems for businesses in Sydney, Melbourne, Brisbane and Singapore.",
              },
              {
                h: "Hire a specialist",
                b: "Looking to hire a web developer, an SEO expert, an AI automation engineer or an ERP consultant? Send the brief and we will scope it.",
              },
            ].map((a) => (
              <div key={a.h} className="panel card-beam p-6">
                <h3 className="text-base font-bold">{a.h}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
