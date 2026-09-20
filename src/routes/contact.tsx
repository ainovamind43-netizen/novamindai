import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, Clock, Zap, MessageCircle } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { services } from "@/lib/services-data";
import { contactDetails } from "@/lib/contact-details";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => {
    const { links, meta: urlMeta } = pageMeta("/contact");
    return {
      links,
      meta: [
        ...urlMeta,
        { title: "Contact NovaMind AI — Free Growth Audit" },
        {
          name: "description",
          content:
            "Tell NovaMind AI about your brand and where you want to grow. We reply within 24 hours with a free audit and recommended next steps.",
        },
        { property: "og:title", content: "Let's build something great — NovaMind AI" },
        {
          property: "og:description",
          content: "Free audit and roadmap for your website, AI, SEO and paid media plans.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
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
  {
    icon: Phone,
    k: "Phone",
    v: contactDetails.phone,
    href: contactDetails.phoneHref,
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
      "New enquiry from novamindai.com",
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
          <h1 className="mt-6 text-4xl font-bold sm:text-5xl">Let's build something great.</h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Tell us about your brand and where you want to grow — we'll come back with a roadmap and
            pricing.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={contactDetails.phoneHref} className="btn-primary shine">
              <Phone className="h-4 w-4" /> Call {contactDetails.phone}
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
            recommended next steps — or call us directly if you'd rather talk it through.
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
                placeholder={contactDetails.phone}
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
            Opens WhatsApp on {contactDetails.phone} — or call us on{" "}
            <a href={contactDetails.phoneHref} className="font-semibold text-primary">
              {contactDetails.phone}
            </a>
          </p>
          {sent && (
            <p className="text-center text-sm text-primary">
              WhatsApp is opening — send the message and we'll reply within 24 hours.
            </p>
          )}
        </form>
      </section>

      <Footer />
    </div>
  );
}
