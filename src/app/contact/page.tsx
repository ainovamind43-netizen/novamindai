import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock, Zap, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { contactDetails } from "@/lib/contact-details";
import { CONTACT_KEYWORDS, SITE_URL, breadcrumbSchema } from "@/lib/seo";

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact NovaMind AI",
  url: `${SITE_URL}/contact`,
  description:
    "Contact NovaMind AI for a free website, SEO or software audit. We reply within 24 hours.",
  mainEntity: { "@id": `${SITE_URL}/#organization` },
};

export const metadata: Metadata = {
  title: "Contact NovaMind AI — Free Website & SEO Audit",
  description:
    "Get a free website audit or SEO audit from NovaMind AI. Tell us about your project — web design, AI automation, ERP or POS software — and we reply within 24 hours.",
  keywords: CONTACT_KEYWORDS.join(", "),
  openGraph: {
    title: "Let's build something great — NovaMind AI",
    description: "Free audit and roadmap for your website, AI, SEO and paid media plans.",
    type: "website",
    url: "https://www.novamindai.info/contact",
  },
  twitter: {
    card: "summary_large_image",
  },
};

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

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Contact", path: "/contact" }])),
        }}
      />

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
            <Link href="/services" className="btn-ghost">
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

        <ContactForm />
      </section>

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
    </div>
  );
}
